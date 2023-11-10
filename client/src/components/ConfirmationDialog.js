import React from "react";
import Modal from "./Modal";
import { Grid } from "@mui/material";

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal>
      <Grid container className="ConfirmationDialog" spacing={2}>
        <Grid>
          <p>Are you sure you want to delete this note?</p>
        </Grid>
        <Grid>
          <button onClick={onConfirm}>Yes</button>
        </Grid>
        <Grid>
          <button onClick={onCancel}>No</button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ConfirmationDialog;
