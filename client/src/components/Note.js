import React, { useState } from "react";
import { updateNote, deleteNote } from "../services/noteService";
import Modal from "./Modal";
import { Grid } from "@mui/material";

const Note = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDoneClick = async () => {
    try {
      const updatedNote = await updateNote(note._id, title, content);
      onUpdate(updatedNote._id, updatedNote.title, updatedNote.content);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(true);
  };

  return (
    <Grid className="note-card">
      <Grid onClick={handleOpenModal}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p style={{ backgroundColor:'rgba(230, 174, 72, 0.5)', padding: '7px', borderRadius: '15px'}}>{formatDate(note.creationDate)}</p>
      </Grid>
      <Grid>
        <button onClick={() => onDelete(note)}>Delete</button>
      </Grid>
      {isEditing && (
        <Modal>
          <Grid container className="ConfirmationDialog">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Grid>
              <button onClick={handleDoneClick}>Done</button>
            </Grid>
            <Grid>
              <button onClick={handleCancelClick}>Cancel</button>
            </Grid>
          </Grid>
        </Modal>
      )}
    </Grid>
  );
};

export default Note;
