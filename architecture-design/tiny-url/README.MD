# URL Shortener System Design

This document summarizes the system design of a URL shortener tool, similar to TinyURL or Bitly, based on the provided video.

## Table of Contents
1.  [Design Requirements](#design-requirements)
2.  [Clarifying Questions and Data Estimation](#clarifying-questions-and-data-estimation)
3.  [High-Level Architecture](#high-level-architecture)
4.  [API Design](#api-design)
5.  [Database Considerations](#database-considerations)
6.  https://www.servicelogic.com/hvac-learning-tool(#url-shortener-service-logic)
7.  [Scalability and High Availability](#scalability-and-high-availability)
8.  [Security Considerations](#security-considerations)

---

## 1. Design Requirements

The system needs to fulfill both functional and non-functional requirements.

* **Functional Requirements** [00:00:59]:
    * Generate a short URL from a given long URL.
    * Redirect users from the short URL to the original long URL.

* **Non-Functional Requirements** [00:01:11]:
    * **Low Latency**: Fast redirection and URL creation.
    * **High Availability**: The system should be continuously accessible.

## 2. Clarifying Questions and Data Estimation

Key estimations and decisions for system sizing:

* **URL Creation Rate**: Estimated at 1,000 URL creations per second, leading to approximately 31.5 billion URLs annually [00:01:25].
* **Read Rate**: Estimated at 315 billion reads per year.
* **Short URL Characters**: Alphanumeric characters (62 total) should be used for short URLs [00:01:49].
* **Uniqueness**: Each unique long URL should result in a new short URL, even if the long URLs are identical [00:02:16].
* **Short URL Length**: To accommodate 315 billion unique URLs over 10 years, the short URL identifier needs to be at least seven characters long [00:03:07].
* **Data Storage**: Estimated at 1,000 bytes per URL, totaling 315 terabytes for 315 billion URLs [00:04:17].

## 3. High-Level Architecture

The system's high-level architecture includes:

* **Load Balancer**: Distributes incoming traffic among web servers [00:04:49].
* **Web Servers**: Handle HTTP requests, interacting with the database for data storage and retrieval [00:04:59].
* **URL Shortener Service**: A dedicated service responsible for generating, mapping, and retrieving short URLs [00:05:06].

## 4. API Design

The primary APIs for the URL shortener are:

* **`POST /api/urls`** [00:05:29]:
    * **Purpose**: Creates a short URL from a JSON payload containing the long URL.
    * **Success Response**: `201 Created` with the new short URL.
    * **Error Responses**: `400 Bad Request` for invalid requests, `409 Conflict` if duplicates are not allowed.

* **`GET /api/urls/{short_url_id}`** [00:06:12]:
    * **Purpose**: Redirects the user to the original long URL.
    * **Success Response**: `301 Moved Permanently` (or `302 Found` for analytics tracking).
    * **Error Responses**: `404 Not Found` if the short URL ID does not exist, `410 Gone` if the URL is deleted or expired [00:07:05].

## 5. Database Considerations

* **Database Type**: A NoSQL database (e.g., MongoDB, Cassandra, DynamoDB) is preferred due to high read volume (10-100k reads/sec vs. 1k writes/sec) [00:07:35].
* **Schema**: Includes a primary key for the short URL ID, the long URL, and optional metadata [00:07:25].

## 6. URL Shortener Service Logic

The core challenge is generating unique short URLs without collisions [00:08:23].

* **Approaches Considered**: Hashing (prone to collisions), auto-incrementing IDs (predictable), or custom algorithms [00:08:35].
* **Proposed Method**: Pre-generate all possible 7-character keys and store their usage status in a separate SQL database (e.g., PostgreSQL or MySQL) to ensure uniqueness and leverage ACID properties for safe key assignment (eliminate race conditions between 2 users by using transaction) [00:09:06].

## 7. Scalability and High Availability

To handle high traffic and ensure continuous operation:

* **Caching Layer** [00:10:18]:
    * Implement Redis with LRU (Least Recently Used) or TTL (Time To Live) eviction policies to cache popular URLs and reduce database access times.
* **Database Replication and Sharding** [00:11:26]:
    * Use key-based sharding to distribute URL records across multiple shards (e.g., 3 shards for 3.5 trillion URLs).
    * Implement master-slave replication within each shard for high availability and fault tolerance, allowing read replicas to handle the majority of read traffic [00:11:50].

## 8. Security Considerations

Essential security measures include:

* **Input Validation**: Sanitize URLs to prevent malicious links and attacks like SQL injection [00:12:28].
* **Rate Limiting**: Implement to prevent Denial of Service (DoS) attacks and abuse (e.g., using token bucket algorithms) [00:12:42].
* **HTTPS**: Encrypt all communications to protect user data [00:12:58].
* **Monitoring and Logging**: Set up systems (e.g., Elasticsearch, Logstash, Kibana) to detect performance bottlenecks and ensure system health [00:13:06].


# this is a summary of the system design for a URL shortener tool, based on the provided video.
https://www.youtube.com/watch?v=16d35un5a9Q