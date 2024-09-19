const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve static files for user-module
app.use('/user-module', express.static(path.join(__dirname, 'user-module')));
app.use('/admin-module', express.static(path.join(__dirname, 'admin-module')));
app.use('/BankManager-module', express.static(path.join(__dirname, 'BankManager-module')));

// Serve config.js file
app.use('/config.js', express.static(path.join(__dirname, 'config.js')));

// Serve main.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Proxy requests to admin-module (port 3000)
app.use(
  '/admin-api',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
  })
);

// Proxy requests to BankManager-module (port 3001)
app.use(
  '/bm-api',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
);

// Start the server on port 5500
app.listen(5500, () => {
  console.log('Proxy server running on http://localhost:5500');
});
