const https = require('https');
const fs = require('fs');
const path = require('path');

// Check if certificates exist
const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('❌ Certificate files not found!');
  console.error('Run: npm run gen-certs');
  process.exit(1);
}

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

const server = https.createServer(options, (req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello HTTPS World!');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'HTTPS server is working!', timestamp: new Date() }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3443;
server.listen(PORT, () => {
  console.log(`✅ HTTPS server running on https://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
