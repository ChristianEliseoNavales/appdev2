const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('action', (message) => {
    console.log(message);
});

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const filename = query.filename ? path.join(__dirname, query.filename) : null;

    if (!filename) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Filename is required. Use ?filename=example.txt');
    }

    if (pathname === '/create') {
        fs.writeFile(filename, 'New file created!', err => {
            res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/plain' });
            res.end(err ? 'Error creating file' : `File created: ${query.filename}`); 
            emitter.emit('action', `File created: ${query.filename}`);
        });
    } else if (pathname === '/read') {
        fs.readFile(filename, 'utf8', (err, data) => {
            res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/plain' });
            res.end(err ? 'Error reading file' : data);
            emitter.emit('action', `File read: ${query.filename}`);
        });
    } else if (pathname === '/update') {
        fs.appendFile(filename, '\nUpdated content.', err => {
            res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/plain' });
            res.end(err ? 'Error updating file' : `File updated: ${query.filename}`);
            emitter.emit('action', `File updated: ${query.filename}`);
        });
    } else if (pathname === '/delete') {
        fs.unlink(filename, err => {
            res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/plain' });
            res.end(err ? 'Error deleting file' : `File deleted: ${query.filename}`);
            emitter.emit('action', `File deleted: ${query.filename}`);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Invalid route or query. You may use the following: \n\nExample: \n\n/create?filename=example.txt, \n/read?filename=example.txt, \n/update?filename=example.txt, \n/delete?filename=example.txt.');
    }
});

server.listen(3000, 'localhost', () => {
  console.log(`Server running at http://localhost:3000/`);
});
