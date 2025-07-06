## Component Breakdown

### Vehicle
The edge device responsible for capturing video. It has two modes:

-   **Live Mode**: Streams raw video directly to the Janus Gateway using WebRTC.
-   **Recording Mode**: Segments video into small chunks (HLS/DASH) and uploads them for storage.

### AWS Cloud

-   **Ingestion & DVR**: A serverless pipeline that receives recorded video chunks and stores them in S3.
-   **Application & Processing**: The core logic of the system.

### WebRTC Components

-   **Janus Gateway (Media Server)**: A powerful, general-purpose Janus Gateway acting as the media server. It receives the live WebRTC stream from the vehicle and is responsible for forwarding it to viewers. Crucially, it can also transcode the video into multiple quality levels (e.g., 1080p, 720p, 480p) to enable Adaptive Bitrate Streaming (ABR), ensuring a smooth viewing experience even on poor network connections.
-   **Signaling Server**: A matchmaking service (using WebSockets) that helps the vehicle and viewer establish a WebRTC connection with Janus.

### Standard Services
Handle user authentication, playlist management for DVR, and data storage.

### Consumption Flow
Manages how end-users access video, handling authentication and delivering both live streams and recorded content.

### Admin
A web interface for managing the system.

## Step-by-Step Data Flows

The system operates via two primary, parallel flows depending on the user's need.

### Flow 1: Live Streaming (WebRTC with Adaptive Bitrate)

This flow is used when a user wants to watch the vehicle's camera feed in real-time.

1.  **Publishing Starts**: The vehicle initiates a connection with the Janus Gateway and begins publishing its live camera feed, typically at the highest possible quality.
2.  **User Authentication**: The user opens the mobile app and authenticates to get a secure JWT token.
3.  **Request to Watch Live**: The user taps "Watch Live." The app makes an authenticated request to the backend.
4.  **Signaling & Negotiation**:
    *   The backend directs the app to the Signaling Server.
    *   The Signaling Server helps the app and the Janus Gateway negotiate a WebRTC connection.
5.  **Adaptive Stream Consumption**: Once the connection is established, the mobile app subscribes to the vehicle's stream via the Janus Gateway. Janus can then dynamically serve the appropriate video quality based on the app's real-time bandwidth conditions (Adaptive Bitrate Streaming), switching between high and low-quality streams seamlessly to prevent buffering.

### Flow 2: DVR/Recording Playback (HLS/DASH)

This flow is used when a user wants to watch a previously recorded video.

1.  **Capture and Upload**: The vehicle captures video, segments it into small chunks, and uploads each chunk via HTTPS to the API Gateway.
2.  **Ingestion**: The API Gateway triggers a Lambda function to save the chunk to S3 and publish metadata to Kafka.
3.  **User Authentication & Request**: The user authenticates and requests to view a specific recording.
4.  **Playlist Generation**: The Streaming Service generates a playlist file (.m3u8) that lists the URLs of the required video chunks in chronological order.
5.  **Stream Consumption**: The app's video player downloads the playlist and requests each video chunk sequentially from the CloudFront CDN, which serves the files from S3.