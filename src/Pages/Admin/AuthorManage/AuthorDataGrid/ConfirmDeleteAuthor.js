import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { deleteAAuthor } from "../../../../ApiServices/authorApi";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({
  open,
  handleClose,
  dataAuthorDelete,
  currentUser,
  dataAuthors,
  setDataAuthors,
}) {
  const handleDelete = async () => {
    const result = await deleteAAuthor(
      dataAuthorDelete._id,
      currentUser.accessToken
    );

    if (result) {
      const index = dataAuthors.indexOf(
        dataAuthors.find((item) => item._id === result._id)
      );
      const newDataAuthors = [...dataAuthors];
      newDataAuthors.splice(index, 1);
      setDataAuthors(newDataAuthors);
    }
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure to delete ${dataAuthorDelete?.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
