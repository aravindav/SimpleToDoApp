const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001; // use Azure port!

app.use(cors());
app.use(express.json());

// API endpoints
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  todos.push(req.body);
  res.status(201).send();
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client-build')));

// Catch-all to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
