const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/notes', noteController.getAllNotes);
router.post('/notes', noteController.createNote);
router.delete('/notes/:id', noteController.deleteNote);
router.put('/notes/:id', noteController.updateNote);
router.get('/notes/search', noteController.searchNotes);

module.exports = router;

