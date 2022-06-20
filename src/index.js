const client = require('prom-client');
const express = require('express');
const app = express();
const port = 3000;
const register = new client.Registry();
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register });

app.get('/demo', (req, res) => {
  res.send('GitHub Action To EKS Demo Working Fine');
});

app.get('/metrics', async (req, res) => {
  var metrics = await register.metrics();
  res.setHeader('Content-Type', register.contentType);
  res.end(metrics);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});