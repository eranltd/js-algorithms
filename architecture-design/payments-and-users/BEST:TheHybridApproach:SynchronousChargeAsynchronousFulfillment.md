# Hybrid Payment Flow: Synchronous Charge & Asynchronous Fulfillment

This document outlines a robust, hybrid payment processing architecture that balances the need for immediate user feedback with the resilience and scalability of an asynchronous, event-driven system.

## The Challenge: Balancing User Experience and System Resilience

A purely asynchronous payment flow provides system resilience but fails to give users immediate feedback on common failures, such as a declined credit card. A purely synchronous flow provides instant feedback but is brittle, prone to timeouts, and does not scale well, especially when post-payment actions like order creation and SSO token generation are involved.

This hybrid model solves the problem by separating the process into two distinct phases:

1.  **Phase 1: Synchronous Payment Attempt:** Provides immediate feedback to the user.
2.  **Phase 2: Asynchronous Order Fulfillment:** Reliably processes the order and provisions access in the background.

---

## Phase 1: The Hybrid Payment Attempt

This phase focuses on getting a quick and definitive payment status.

### 1. Client-Side Validation (Instant Feedback)

Before any server communication, the frontend should perform basic validation on the payment form (e.g., card number format, expiration date, CVC format) to catch simple input errors instantly.

### 2. Synchronous Charge Attempt with a Timeout

When the user clicks "Confirm Purchase," the BFF (Backend for Frontend) **immediately and synchronously** calls the payment gateway with a **short, aggressive timeout (e.g., 5-10 seconds)**.

### 3. Handling the Three Possible Outcomes

The synchronous call has three distinct outcomes:

#### Scenario A: Immediate Success (The Happy Path)

- **Condition:** The payment gateway responds within the timeout window with a success code (`200 OK`).
- **Action:**
    1. The BFF knows the payment is successful.
    2. It immediately publishes a `PaymentSuccessful` event to a message queue (e.g., Kafka).
    3. It returns a "Success" response to the frontend.
    4. The frontend redirects the user to the "Thank You / Your order is processing..." page.
- **Result:** The user gets fast confirmation, and the system transitions to the asynchronous fulfillment phase.

#### Scenario B: Immediate Failure (The User Popup Scenario)

- **Condition:** The payment gateway responds with a client error code (`4xx`), indicating a definitive failure like "Card Declined."
- **Action:**
    1. The BFF receives the specific failure reason.
    2. **No event is published.** The transaction stops.
    3. The BFF returns a "Failure" response to the frontend.
    4. The frontend displays a **popup or inline error message** (e.g., "Your payment failed. Please check your details or try another card.") and keeps the user on the checkout page to try again.
- **Result:** The user gets the immediate, actionable feedback that was desired.

#### Scenario C: Timeout or Network Error (The Asynchronous Safety Net)

- **Condition:** The payment gateway fails to respond in time or returns a server error (`5xx`). The payment status is **unknown**.
- **Action:**
    1. The BFF publishes a `PaymentStatusUnknown` event to the message queue.
    2. It returns a "Processing" status to the frontend, which redirects to a pending page.
- **Result:** The user is not left waiting. The asynchronous system takes over to verify the final payment status via webhooks or polling.

---

## Phase 2: Asynchronous Order Fulfillment

This phase begins once a `PaymentSuccessful` event is published to the message queue. A dedicated microservice, the `OrderFulfillmentService`, handles all subsequent steps without making the user wait.

### 1. Create the Order

- The `OrderFulfillmentService` consumes the `PaymentSuccessful` event from Kafka.
- It makes a request to the **Udi Service** to create a new `ud.order` with a `confirmed = true` status, linking it to the user's account and the successful transaction.

### 2. Generate the SSO Token

- After the order is successfully created, the `OrderFulfillmentService` makes a second request to the **Udi Service** to generate a short-lived SSO Token for the user.

### 3. Deliver the SSO Token to the Frontend

Since the user is on a "Thank You" page and the initial HTTP request is over, we need a mechanism to deliver the SSO token back to the browser for the final redirect. Common solutions include:

- **WebSockets (Recommended):** The "Thank You" page establishes a WebSocket connection. Once the SSO token is ready, the server pushes it directly to the client, which then triggers the redirect to the SaaS app.
- **Short Polling:** The frontend polls a status endpoint (e.g., `/api/order/{orderId}/status`) every few seconds. Once the token is ready, the endpoint returns it, and the polling stops.

The WebSocket approach provides the best real-time experience.

## Full End-to-End Sequence Diagram

This diagram illustrates both the synchronous payment phase and the asynchronous fulfillment phase.

```mermaid
sequenceDiagram
    participant Frontend
    participant BFF
    participant Billing Gates Service
    participant Kafka
    participant OrderFulfillmentService
    participant Udi Service
    participant SaaS App

    %% --- Phase 1: Synchronous Payment Attempt --- %%
    Frontend->>+BFF: Commit Payment
    BFF->>+Billing Gates Service: Charge User (Synchronous call)
    alt Immediate Success
        Billing Gates Service-->>-BFF: Success (2xx)
        BFF->>+Kafka: Publish 'PaymentSuccessful' event
        BFF-->>-Frontend: Success! Redirect to "Processing" page.
    else Immediate Failure
        Billing Gates Service-->>-BFF: Failure (4xx)
        BFF-->>-Frontend: Failure! Show "Payment Failed" popup.
    end

    %% --- Phase 2: Asynchronous Fulfillment --- %%
    Frontend->>BFF: Establish WebSocket connection
    OrderFulfillmentService->>+Kafka: Consume 'PaymentSuccessful' event
    OrderFulfillmentService->>+Udi Service: 1. Create ud.order (confirmed=true)
    Udi Service-->>-OrderFulfillmentService: Order Created
    OrderFulfillmentService->>+Udi Service: 2. Generate SSO Token
    Udi Service-->>-OrderFulfillmentService: SSO Token
    OrderFulfillmentService->>BFF: 3. Send SSO Token via internal channel/cache
    BFF->>Frontend: 4. Push SSO Token via WebSocket
    Frontend->>SaaS App: 5. Redirect with SSO Token for auto-login