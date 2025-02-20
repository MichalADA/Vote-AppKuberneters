const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

const client = redis.createClient({ url: 'redis://redis-service:6379' });
client.connect();

app.use(express.json());

app.post('/vote', async (req, res) => {
  const { option } = req.body;
  await client.hIncrBy('votes', option, 1);
  res.send({ message: `Oddano głos na ${option}` });
});

app.get('/results', async (req, res) => {
  const results = await client.hGetAll('votes');
  res.json(results);
});

app.listen(port, () => {
  console.log(`Backend działa na porcie ${port}`);
});