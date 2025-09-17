// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing body request (JSON)
app.use(express.json());

// Route GET
app.get('/', (req, res) => {
  res.send('Hello, ini hallaman HOME demgam methpd GET!');
});

// Route POST
app.post('/submit', (req, res) => {
  const { name, npm, jenisKelamin } = req.body;
  res.send(`Hello, ${name} dengan npm ${npm}. Apakah kamu ${jenisKelamin}!`);
});

app.use(express.static('public'));

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
