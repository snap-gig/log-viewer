# Log Viewer Server

## Overview

This Node.js application provides an HTTP server that allows clients to view logs from a large log file. The server is optimized for efficient file processing and offers an easy-to-use API for retrieving logs based on specific timestamps.

## Features

- **Efficient Log File Reading**: Optimized to read large log files without loading the entire file into memory.
- **Timestamp-Based Retrieval**: Allows clients to request logs for specific timestamps.
- **Contextual Log Output**: Returns the log line for the requested timestamp along with 10 preceding and 10 following lines for context.

## Getting Started

### Prerequisites

* Node.js installed on your machine.
* A log file named `log.txt` located in the same directory as the server script.

### Installation

Clone the repository or download the source code:

```bash
git clone https://your-repository-url.git
cd your-repository-directory
```

### Running the Server

Execute the following command to start the server:

```bash
node server.js
```
The server will start on localhost at port 9000.

### Usage
To retrieve log data, make an HTTP GET request to the server with the desired timestamp:

```bash
http://localhost:9000/logs?timestamp=2023-01-01T00:00:00.000Z
```
The server will respond with the relevant log entries.

### API Reference
Endpoints
GET /logs?timestamp=[timestamp]
Retrieves logs around the specified timestamp.
Parameters:
timestamp: A timestamp string in ISO format (e.g., 2023-01-01T00:00:00.000Z).

### Error Handling
Returns a 404 Not Found status if the timestamp is not found in the log file.
Returns a 500 Internal Server Error status for any server-side errors.

### Testing
Ensure to test the application with various timestamps to verify the accuracy of log retrieval. Also, test edge cases, such as requests with invalid timestamp formats.
