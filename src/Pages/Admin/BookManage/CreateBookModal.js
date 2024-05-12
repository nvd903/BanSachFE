import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import MultiSelect from "../../../Components/MultiSelect";
import { toast } from "react-toastify";
import { createABook } from "../../../ApiServices/booksApi";

// import { toast } from "react-toastify";

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
  update = false,
  dataUserCurrent,
  dataBooks,
  setDataBooks,
  dataAllBooks,
  dataAllAuthors,
  dataAllGenres,
}) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [thumnel, setThumnel] = React.useState();
  const [price, setPrice] = React.useState();
  const [genres, setGenres] = React.useState();
  const [author, setAuthor] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const nameInputRef = React.useRef();
  const nameSpanRef = React.useRef();
  const priceSpanRef = React.useRef();
  const priceInputRef = React.useRef();
  const authorSpanRef = React.useRef();
  const genresSpanRef = React.useRef();

  const validateName = (e) => {
    const nameValue = e.target.value;
    //kiểm tra rỗng, trùng tên đã có
    if (!nameValue.trim()) {
      nameInputRef.current.className = "error--nameinput";
      nameSpanRef.current.textContent = "Do not leave the name field blank";
    } else {
      const isExist =
        dataAllBooks &&
        dataAllBooks.length > 0 &&
        dataAllBooks.some((item) => item.name === nameValue.trim());
      if (isExist) {
        nameSpanRef.current.textContent = "this name is exist";
      } else {
        nameInputRef.current.className = "success--nameinput";
        nameSpanRef.current.textContent = ``;
        setValidated(true);
      }
    }
  };

  const validatePrice = (e) => {
    const priceValue = e.target.value;
    if (!priceValue.trim()) {
      priceInputRef.current.className = "error--nameinput";
      priceSpanRef.current.textContent = "Do not leave the price field blank";
    } else {
      if (Number.isInteger(parseInt(priceValue)) && parseInt(priceValue) > 0) {
        priceInputRef.current.className = "success--nameinput";
        priceSpanRef.current.textContent = "";
      } else {
        priceInputRef.current.className = "error--nameinput";
        priceSpanRef.current.textContent =
          "The value is not invalid! The value must bigger than 0";
      }
    }
  };

  const authorOptions =
    dataAllAuthors &&
    dataAllAuthors.length > 0 &&
    dataAllAuthors.map((obj) => {
      return { label: obj.name, value: obj._id };
    });

  const handleChangeSelect = (selected) => {
    setAuthor(selected.value);
  };

  const validateAuthor = () => {
    if (!author) {
      authorSpanRef.current.textContent = "Do not leave the author field blank";
    } else {
      authorSpanRef.current.textContent = "";
    }
  };

  const genreOptions =
    dataAllGenres &&
    dataAllGenres.length > 0 &&
    dataAllGenres.map((obj) => {
      return { label: obj.name, value: obj._id };
    });

  const handleChangeSelectGenre = (selected) => {
    const genresId = selected.map((item) => item.value);
    setGenres(genresId);
  };

  const validateGenre = () => {
    if (!genres) {
      genresSpanRef.current.textContent = "Do not leave the genres field blank";
    } else {
      genresSpanRef.current.textContent = "";
    }
  };

  const handleClickCreate = async () => {
    if (
      nameSpanRef.current.textContent === "" &&
      priceSpanRef.current.textContent === "" &&
      authorSpanRef.current.textContent === "" &&
      genresSpanRef.current.textContent === ""
    ) {
      const payload = {
        name,
        description,
        thumnel,
        price,
        createdBy: dataUserCurrent._id,
        author: author,
        genres: genres,
      };
      console.log(payload);
      const newBook = await createABook(payload);
      const newDataBooks = [...dataBooks];
      newDataBooks.unshift(newBook);
      setDataBooks(newDataBooks);
      handleClose();
    } else {
      toast.error("Does not validate!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{ minWidth: "400px", height: "auto", marginBottom: "10px" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Create a new author
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="content__create__container">
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">Name: </label>
                <input
                  ref={nameInputRef}
                  className="content__create__input--name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={validateName}
                />
              </span>
              <span ref={nameSpanRef} className="name__error"></span>
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">
                  Description:
                </label>
                <textarea
                  className="content__create__input--name"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">Thumnel:</label>
                <input
                  className="content__create__input--name"
                  onChange={(e) => setThumnel(e.target.value)}
                />
              </span>
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">Price: </label>
                <input
                  ref={priceInputRef}
                  className="content__create__input--name"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={validatePrice}
                />
              </span>
              <span ref={priceSpanRef} className="name__error"></span>
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">Author: </label>
                <div
                  className="content__crate__multiselect"
                  onBlur={validateAuthor}
                >
                  <MultiSelect
                    options={authorOptions}
                    isMulti={false}
                    onChange={handleChangeSelect}
                    // onBlur={validateAuthor}
                  />
                </div>
              </span>
              <span ref={authorSpanRef} className="name__error"></span>
              <span className="content__create__inputgroup">
                <label className="content__create__label--name">Genre: </label>
                <div
                  className="content__crate__multiselect"
                  onBlur={validateGenre}
                >
                  <MultiSelect
                    options={genreOptions}
                    onChange={handleChangeSelectGenre}
                  />
                </div>
              </span>
              <span ref={genresSpanRef} className="name__error"></span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClickCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
