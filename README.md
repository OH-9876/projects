# HTTPS Server Tester

A simple Node.js HTTPS server with automated testing.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate SSL certificates:**
   ```bash
   npm run gen-certs
   ```
   This creates self-signed certificates for local testing.

## Running

**Terminal 1 - Start the server:**
```bash
npm start
```

You should see:
```
✅ HTTPS server running on https://localhost:3443
```

**Terminal 2 - Run the tests:**
```bash
npm test
```

## What it does

- **server.js** - HTTPS server with two endpoints:
  - `GET /` - Returns plain text
  - `GET /api/data` - Returns JSON data

- **test.js** - Tests the server using:
  - Native Node.js `https` module
  - `axios` HTTP client

## Endpoints

- `https://localhost:3443/` - Simple text response
- `https://localhost:3443/api/data` - JSON API response
