# log-viewer
Log Viewer Server
Log Viewer Server
Overview
This Node.js application provides an HTTP server that enables clients to view logs from a large log file efficiently. Designed to handle large-scale log data, the server allows for querying logs based on specific timestamps, returning relevant log entries with surrounding context.

Features
Efficient Log File Reading: Optimized for handling large log files without loading the entire file into memory.
Timestamp-Based Retrieval: Enables clients to request logs for specific timestamps.
Contextual Log Output: Provides not just the matching log line but also 10 lines before and after for context.
Getting Started
Prerequisites
Node.js installed on your machine.
A log file named log.txt placed in the same directory as the server script.
Installation
Clone the repository or download the source code.
Navigate to the directory containing the server script.
Running the Server
Execute the following command in the terminal:

bash
Copy code
node server.js
The server will start on localhost at port 9000.

Using the API
Make an HTTP GET request to the server with the desired timestamp:

bash
Copy code
http://localhost:9000/logs?timestamp=2023-01-01T00:00:00.000Z
The server will respond with log entries surrounding the specified timestamp.

API Reference
Endpoints
GET /logs?timestamp=[timestamp]
Retrieves logs around a specific timestamp.
Parameters:
timestamp: A timestamp string in ISO format (e.g., 2023-01-01T00:00:00.000Z).
Error Handling
Returns 404 Not Found if the timestamp is not present in the log file.
Returns 500 Internal Server Error for server-side errors.
Testing
Conduct tests with various timestamps to ensure accurate log retrieval. Include edge cases, such as invalid timestamp formats, to verify robust error handling.

License
[Include license information here, if applicable]
