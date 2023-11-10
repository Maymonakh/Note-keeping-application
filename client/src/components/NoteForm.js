import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

function NoteForm({ onAddNote }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleAddNote = () => {
    if (title && content) {
      const newNote = {
        title,
        content,
      };

      onAddNote(newNote);
      setTitle("");
      setContent("");
      setFormVisible(false);
    }
  };

  return (
    <Grid spacing={2}>
      <button onClick={handleToggleForm}>
        {isFormVisible ? "Cancel" : "Add a New Note"}
      </button>

      {isFormVisible && (
        <Grid className="form-container expanded" spacing={2}>
          <input
            type="text"
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={handleAddNote}>Add Note</button>
        </Grid>
      )}
    </Grid>
  );
}

export default NoteForm;
