import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Search from './components/Search';
import NoteForm from './components/NoteForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import { getAllNotes, deleteNote, updateNote , createNote} from './services/noteService';
import {  Grid } from '@mui/material';



import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleSearch = (searchTerm) => {
    const results = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleDelete = (note) => {
    console.log(note);
    setNoteToDelete(note);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log(noteToDelete)
    deleteNote(noteToDelete._id)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== noteToDelete._id));
        setShowDialog(false);
        setNoteToDelete(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setNoteToDelete(null);
  };

  const handleUpdate = (_id, title, content) => {
    updateNote(_id, title, content)
      .then((updatedNote) => {
        const updatedNotes = notes.map((note) =>
          note._id === updatedNote._id ? { ...note, ...updatedNote } : note
        );
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error(error);
      });

      
  };

  const handleAddNote = (newNote) => {
    createNote(newNote.title, newNote.content)
      .then((createdNote) => {
        setNotes([...notes, createdNote]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllNotes()
      .then((data) => setNotes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Grid container className="App" spacing={2}>
      <Grid item xs={12}>
        <div className='header-container'>
          <h1>My Note Keeper</h1>
          <Search onSearch={handleSearch} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <NoteForm onAddNote={handleAddNote} />
      </Grid>
      <Grid item xs={12}>
        <div>
          {searchResults.length === 0
            ? notes.map((note) => (
                <Note
                  key={note._id}
                  note={note}
                  onDelete={() => handleDelete(note)}
                  onUpdate={handleUpdate}
                />
              ))
            : searchResults.map((note) => (
                <Note
                  key={note._id}
                  note={note}
                  onDelete={() => handleDelete(note)}
                  onUpdate={handleUpdate}
                />
              ))}
        </div>
      </Grid>
      <Grid item xs={12}>
        <ConfirmationDialog
          isOpen={showDialog}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Grid>
    </Grid>
  );
}

export default App;
