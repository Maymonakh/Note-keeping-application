const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(bodyParser.json());

// Define Note Schema and Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  creationDate: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving notes' });
  }
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (deletedNote) {
      res.json(deletedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
});

app.put('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating note' });
  }
});

app.get('/notes/search', async (req, res) => {
  const query = req.query.query;
  try {
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
        { content: { $regex: query, $options: 'i' } }, // Case-insensitive content search
      ],
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for notes' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
