const Note = require('../models/note');

module.exports = {
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving notes' });
    }
  },

  createNote: async (req, res) => {
    const { title, content } = req.body;
    try {
      const note = new Note({ title, content });
      const savedNote = await note.save();
      res.status(201).json(savedNote);
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  },

  deleteNote: async (req, res) => {
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
  },

  updateNote: async (req, res) => {
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
  },

  searchNotes: async (req, res) => {
    const query = req.query.query;
    try {
      const notes = await Note.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
        ],
      });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Error searching for notes' });
    }
  },

  paginateNotes: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 4;
      const skip = (page - 1) * limit;

      const totalNotes = await Note.countDocuments();
      const totalPages = Math.ceil(totalNotes / limit);

      const notes = await Note.find()
        .skip(skip)
        .limit(limit)
        .sort({ creationDate: 'desc' });

      res.json({
        notes,
        totalPages,
        currentPage: page,
        totalNotes,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving notes' });
    }
  },


};
