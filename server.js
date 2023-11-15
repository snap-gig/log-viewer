const http = require('http');
const fs = require('fs');
const { promisify } = require('util');
const fsRead = promisify(fs.read);
const LOG_FILE_PATH = './log.txt';


async function findPosition(filePath, timestamp) {
    const fd = await fs.promises.open(filePath, 'r');
    try {
        let start = 0;
        let fileSize = (await fd.stat()).size;
        let end = fileSize - 1;
        let position = -1;

        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            let lineStart = await findLineStart(fd, mid);

            let buffer = Buffer.alloc(256);
            let { bytesRead } = await fd.read(buffer, 0, 256, lineStart);

            let line = buffer.toString('utf-8', 0, bytesRead).split('\n')[0];
            let lineTimestamp = line.split(' ')[0];

            if (lineTimestamp === timestamp) {
                position = lineStart;
                break;
            } else if (lineTimestamp < timestamp) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        return position;
    } finally {
        await fd.close();
    }
}

async function findLineStart(fd, position) {
    let buffer = Buffer.alloc(1);
    while (position > 0) {
        await fd.read(buffer, 0, 1, position);
        if (buffer.toString('utf-8') === '\n') {
            break;
        }
        position--;
    }
    return position + 1;
}




async function readLogData(filePath, position, timestamp) {
    const fd = await fs.promises.open(filePath, 'r');
    try {
        const chunkSize = 1024 * 10;
        const startPosition = Math.max(0, position - chunkSize / 2);
        let buffer = Buffer.alloc(chunkSize);
        let { bytesRead } = await fd.read(buffer, 0, chunkSize, startPosition);
        let data = buffer.toString('utf-8', 0, bytesRead);

        let lines = data.split('\n');
        let targetLineIndex = lines.findIndex(line => line.includes(timestamp));

        if (targetLineIndex === -1) {
            return 'Timestamp not found in the surrounding context';
        }

        const startLine = Math.max(0, targetLineIndex - 10);
        const endLine = Math.min(lines.length - 1, targetLineIndex + 10);
        return lines.slice(startLine, endLine + 1).join('\n');
    } finally {
        await fd.close();
    }
}





const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/logs?timestamp=')) {
        const timestamp = req.url.split('=')[1];

        try {
            const position = await findPosition(LOG_FILE_PATH, timestamp);
            if (position === -1) {
                res.writeHead(404);
                res.end('Timestamp not found');
                return;
            }

            const logData = await readLogData(LOG_FILE_PATH, position, timestamp);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(logData);
        } catch (error) {
            console.error(error)
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(9000, () => {
    console.log('Server running on port 9000');
});
