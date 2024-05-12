import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { deleteAGenre } from "../../../../ApiServices/genresApi";

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
  dataGenreDelete,
  currentUser,
  dataGenre,
  setDataGenres,
}) {
  const handleDelete = async () => {
    try {
      const result = await deleteAGenre(
        dataGenreDelete._id,
        currentUser.accessToken
      );
      if (result) {
        const index = dataGenre.indexOf(
          dataGenre.find((item) => item._id === result._id)
        );
        const newDataGenres = [...dataGenre];
        newDataGenres.splice(index, 1);
        setDataGenres(newDataGenres);
      }
      handleClose();
    } catch (error) {
      console.log("lỗi");
    }
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
            {`Are you sure to delete ${dataGenreDelete?.name}`}
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
