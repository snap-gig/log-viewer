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

### Running the Server

Execute the following command to start the server:

```bash
node server.js
