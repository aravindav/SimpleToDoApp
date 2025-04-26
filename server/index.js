const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  todos.push(req.body);
  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
