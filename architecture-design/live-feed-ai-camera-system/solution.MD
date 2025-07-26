# Live Feed Alert System - Object-Oriented Design

This document outlines the Object-Oriented Programming (OOP) design and a conceptual UML Class Diagram for the Live Feed Alert System, based on the provided requirements.

## 1. System Overview

The Live Feed Alert System allows users to connect real-time camera feeds and define alert rules to detect specific conditions. When a live stream matches a defined prompt and satisfies the alert rule, an event is created, triggering associated actions (e.g., sending a notification).

## 2. Object-Oriented Programming (OOP) Design

### Core Concepts

* **Prompt:** Represents what the system should detect (e.g., "person loitering").
* **CameraStream:** Represents a real-time video feed source.
* **Action:** Represents what happens when an alert condition is met (e.g., sending a notification).
* **AlertRule:** Combines prompts, camera streams, and actions to define a specific alert.
* **Event:** Represents an instance where a live stream matches a prompt and satisfies alert rule conditions.
* **Notification (Specific type of Action):** A concrete action that sends an alert.

### Class Definitions

#### `Prompt`

Represents a specific detection criterion.

* **Attributes:**
    * `id`: `String` - Unique identifier.
    * `description`: `String` - Textual description of what to detect (e.g., "person loitering", "man with a black shirt").
* **Methods:**
    * (Potential methods for validation or matching logic, not detailed in high-level requirements.)

#### `CameraStream`

Represents a source of live video feed.

* **Attributes:**
    * `id`: `String` - Unique identifier.
    * `name`: `String` - User-friendly name for the stream.
    * `url`: `String` - URL or path to the camera feed.
    * `location`: `String` (Optional) - Physical location of the camera.
* **Methods:**
    * `startStream()`: Initiates the live feed.
    * `stopStream()`: Stops the live feed.
    * `getFeedData()`: Retrieves frames/data from the stream.

#### `Action` (Abstract Class)

Defines the common interface for actions to be performed when an alert occurs.

* **Attributes:**
    * `id`: `String` - Unique identifier.
    * `name`: `String` - Name of the action.
* **Methods (Abstract):**
    * `execute(Event event)`: Defines the common interface for executing an action when an event occurs.

#### `Notification` (Concrete Class inheriting from `Action`)

A specific type of action that sends various forms of notifications.

* **Attributes:**
    * `type`: `String` - Type of notification (e.g., "email", "webhook", "dashboard update").
    * `recipient/endpoint`: `String` - Destination for the notification (e.g., email address, webhook URL).
    * `messageTemplate`: `String` - Template for the notification message.
* **Methods:**
    * `execute(Event event)`: Implements the action to send the specific notification.

#### `AlertRule`

Defines a set of conditions that trigger an alert.

* **Attributes:**
    * `id`: `String` - Unique identifier.
    * `name`: `String` - Name of the alert rule.
    * `enabled`: `Boolean` - Indicates if the rule is active.
* **Associations:**
    * `prompts`: `List<Prompt>` - One or more `Prompt` objects.
    * `cameraStreams`: `List<CameraStream>` - One or more `CameraStream` objects.
    * `actions`: `List<Action>` - One or more `Action` objects.
* **Methods:**
    * `evaluate(CameraStream stream, Object detectedObject)`: Logic to check if the stream matches prompts and conditions.
    * `triggerActions(Event event)`: Initiates the associated actions.

#### `Event`

Represents an instance where an alert rule's conditions are met.

* **Attributes:**
    * `id`: `String` - Unique identifier.
    * `timestamp`: `DateTime` - Time when the event occurred.
    * `alertRule`: `AlertRule` - Reference to the `AlertRule` that triggered the event.
    * `cameraStream`: `CameraStream` - Reference to the `CameraStream` where the event was detected.
    * `detectedPrompt`: `Prompt` - Reference to the specific `Prompt` that was matched.
    * `details`: `String` - Additional information about the event (e.g., "man with black shirt detected").
* **Methods:**
    * (Potential methods for logging or reporting.)

#### `LiveFeedAlertSystem`

The main orchestrator and facade for the entire system.

* **Attributes:**
    * `alertRules`: `Map<String, AlertRule>` or `List<AlertRule>` - Collection of alert rules.
    * `cameraStreams`: `Map<String, CameraStream>` or `List<CameraStream>` - Collection of camera streams.
* **Methods:**
    * `addAlertRule(AlertRule rule)`: Adds a new alert rule.
    * `removeAlertRule(String ruleId)`: Removes an alert rule.
    * `addCameraStream(CameraStream stream)`: Adds a new camera stream.
    * `removeCameraStream(String streamId)`: Removes a camera stream.
    * `startMonitoring()`: Initiates the monitoring process for all active rules and streams.
    * `processLiveFeed(CameraStream stream, Object detectionResult)`: Internal method called when new data from a live feed is available, triggering evaluation against alert rules.

## 3. UML Class Diagram Description (Conceptual)

This section describes the relationships between the classes. For a visual representation, you would typically use a UML tool.

**Classes Involved:**

* `Prompt`
* `CameraStream`
* `Action` (Abstract)
* `Notification`
* `AlertRule`
* `Event`
* `LiveFeedAlertSystem`

**Relationships:**

1.  **`AlertRule` to `Prompt` (Aggregation)**
    * An `AlertRule` *has* one or more `Prompt` objects.
    * Cardinality: `AlertRule` `1` -- `*` `Prompt`
    * (Represents a "has-a" relationship where `Prompt` can exist independently.)

2.  **`AlertRule` to `CameraStream` (Aggregation)**
    * An `AlertRule` monitors one or more `CameraStream` objects.
    * Cardinality: `AlertRule` `1` -- `*` `CameraStream`
    * (Represents a "has-a" relationship where `CameraStream` can exist independently.)

3.  **`AlertRule` to `Action` (Aggregation)**
    * An `AlertRule` triggers one or more `Action` objects.
    * Cardinality: `AlertRule` `1` -- `*` `Action`

4.  **`Action` to `Notification` (Generalization/Inheritance)**
    * `Notification` is a specialized type of `Action`.
    * Indicated by an open, unfilled arrow pointing from `Notification` to `Action`.

5.  **`Event` to `AlertRule` (Association)**
    * An `Event` is created when an `AlertRule` is matched.
    * Cardinality: `Event` `*` -- `1` `AlertRule`

6.  **`Event` to `CameraStream` (Association)**
    * An `Event` occurs on a specific `CameraStream`.
    * Cardinality: `Event` `*` -- `1` `CameraStream`

7.  **`Event` to `Prompt` (Association)**
    * An `Event` is associated with the `Prompt` that was detected.
    * Cardinality: `Event` `*` -- `1` `Prompt`

8.  **`LiveFeedAlertSystem` to `AlertRule` (Aggregation)**
    * The `LiveFeedAlertSystem` manages `AlertRule` objects.
    * Cardinality: `LiveFeedAlertSystem` `1` -- `*` `AlertRule`

9.  **`LiveFeedAlertSystem` to `CameraStream` (Aggregation)**
    * The `LiveFeedAlertSystem` manages `CameraStream` objects.
    * Cardinality: `LiveFeedAlertSystem` `1` -- `*` `CameraStream`

## 4. Key Design Patterns (Implicit)

* **Strategy Pattern:** The `Action` class (and its concrete implementations like `Notification`) suggests the Strategy pattern, allowing different actions to be performed interchangeably.
* **Observer Pattern:** The system's behavior of `AlertRule` triggering `Actions` upon an `Event` hints at an observer-like mechanism. The `LiveFeedAlertSystem` could act as a subject, notifying relevant `AlertRule`s which, in turn, trigger `Actions`.

---
**Note:** This document provides a high-level OOP design. Further details, such as specific data types for attributes, error handling, and detailed method implementations, would be defined during the detailed design and development phases.