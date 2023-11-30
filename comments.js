// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body parser to parse JSON body
app.use(bodyParser.json());

// Use EJS to render HTML
app.set('view engine', 'ejs');

// Path: /
app.get('/', (req, res) => {
  res.render('index', { comments: comments });
});

// Path: /comments
// Return all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Path: /comments/:id
// Return comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  res.json(comment);
});

// Path: /comments
// Add new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.json(comment);
});

// Path: /comments/:id
// Update comment by id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  Object.assign(comment, req.body);
  res.json(comment);
});

// Path: /comments/:id
// Delete comment by id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(comment => comment.id == id);
  const comment = comments[index];
  comments.splice(index, 1);
  res.json(comment);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// In-memory data store
const comments = [
  { id: 1, author: 'John Doe', text: 'Hello World!' },
  { id: 2, author: 'Jane Doe', text: 'Hi, there!' },
];
