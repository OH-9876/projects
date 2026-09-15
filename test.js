const https = require('https');
const axios = require('axios');

// Method 1: Using native https module
console.log('\n📡 Testing with native https module...');
const options = {
  hostname: 'localhost',
  port: 3443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false // Only for self-signed certs in testing
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
    testWithAxios();
  });
});

req.on('error', (e) => {
  console.error('❌ Connection error:', e.message);
  console.error('Make sure the server is running: npm start');
  process.exit(1);
});

req.end();

// Method 2: Using axios
function testWithAxios() {
  console.log('\n📡 Testing with axios...');
  const agent = new https.Agent({ rejectUnauthorized: false });
  
  axios.get('https://localhost:3443/api/data', { httpsAgent: agent })
    .then(res => {
      console.log('Status:', res.status);
      console.log('Response:', JSON.stringify(res.data, null, 2));
      console.log('\n✅ All tests passed!');
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
