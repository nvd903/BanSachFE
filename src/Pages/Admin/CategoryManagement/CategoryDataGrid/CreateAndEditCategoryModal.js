import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import "./CategoryDataGrid.scss";
import MultiSelect from "../../../../Components/MultiSelect";
import { toast } from "react-toastify";
import { creareAGenre, updateAGenre } from "../../../../ApiServices/genresApi";

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

const RenderCreateCategory = ({
  update = false,
  dataGenre,
  dataUserCurrent,
  setValidateSuccess,
  nameInputValue,
  setNameInputValue,
  parentGenre,
  setParentGenre,
  dataGenreUpdate,
}) => {
  const nameInputRef = React.useRef();
  const nameSpanRef = React.useRef();

  const validate = () => {
    if (!nameInputValue.trim()) {
      nameInputRef.current.className = "error--nameinput";
      nameSpanRef.current.textContent =
        "Do not leave the name of genre field blank";
    } else {
      const isExist =
        dataGenre &&
        dataGenre.length > 0 &&
        dataGenre.some((item) => item.name === nameInputValue.trim());
      if (isExist) {
        nameSpanRef.current.textContent = `${nameInputValue} is existed`;
      } else {
        nameInputRef.current.className = "success--nameinput";
        nameSpanRef.current.textContent = ``;
        setValidateSuccess(true);
      }
    }
  };

  const genreOptions =
    dataGenre &&
    dataGenre.length > 0 &&
    dataGenre.map((obj) => {
      return { label: obj.name, value: obj._id };
    });

  const handleChangeSelect = (selected) => {
    const parentIdArr = selected.map((item) => {
      return item.value;
    });

    setParentGenre(parentIdArr);
  };

  //defaultvalue cũng nhận mảng object gồm label và value
  let defaultValue;
  if (dataGenreUpdate?.genreParentId) {
    const optionsArr =
      dataGenre &&
      dataGenre.length > 0 &&
      dataGenre.map((obj) => {
        if (dataGenreUpdate?.genreParentId.includes(obj._id)) {
          return { label: obj.name, value: obj._id };
        }
        return "";
      });
    if (optionsArr) {
      defaultValue = optionsArr.filter((item) => typeof item !== "undefined");
    }
  }
  return (
    <div className="content__create__container">
      <span className="content__create__inputgroup">
        <label className="content__create__label--name">Name: </label>
        <input
          ref={nameInputRef}
          placeholder="The name of new genre"
          className="content__create__input--name"
          defaultValue={update ? dataGenreUpdate.name : ""}
          onChange={(e) => setNameInputValue(e.target.value)}
          onBlur={() => (update ? () => {} : validate())}
        />
      </span>
      <span ref={nameSpanRef} className="name__error"></span>
      <span className="content__create__inputgroup">
        <label className="content__create__label--name">Parent's genre: </label>
        <div className="content__crate__multiselect">
          <MultiSelect
            defaultValue={update ? defaultValue : ""}
            options={genreOptions}
            // value={defaultValue}
            onChange={handleChangeSelect}
          />
        </div>
      </span>
    </div>
  );
};

export default function DraggableDialog({
  open,
  handleClose,
  update = false,
  dataGenre,
  dataUserCurrent,
  setDataGenres,
  dataGenreUpdate,
}) {
  const [validateSuccess, setValidateSuccess] = React.useState(false);
  const [nameInputValue, setNameInputValue] = React.useState("");
  const [parentGenre, setParentGenre] = React.useState([]);
  const handleSubmit = async () => {
    if (validateSuccess) {
      const genreParentId = parentGenre.length > 0 ? parentGenre : null;
      const payload = {
        name: nameInputValue,
        url: `/genre/${nameInputValue.toLowerCase()}`,
        genreParentId: genreParentId,
        createdBy: dataUserCurrent._id,
      };
      const token = dataUserCurrent.accessToken;
      const result = await creareAGenre(payload, token);
      if (result) {
        const newDataGenres = [result, ...dataGenre];
        setDataGenres(newDataGenres);
      }
      setNameInputValue("");
      setParentGenre("");
      setValidateSuccess(false);

      handleClose();
    } else {
      toast.error("Name does not validate!", {
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

  const handleUpdate = async () => {
    let payload = {
      updatedBy: dataUserCurrent._id,
      genreParentId: parentGenre,
    };
    if (nameInputValue) {
      payload = { ...payload, name: nameInputValue };
    }

    const result = await updateAGenre(
      dataGenreUpdate._id,
      payload,
      dataUserCurrent.accessToken
    );
    //tìm index trong dataGenre thay thế result vào vị trí index

    if (result) {
      const index = dataGenre.indexOf(
        dataGenre.find((item) => item._id === result._id)
      );
      const newDataGenres = [...dataGenre];
      newDataGenres.splice(index, 1, result);
      setDataGenres(newDataGenres);
    }
    handleClose();
    // }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{ minWidth: "400px" }}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {!update ? "Create a new Genre" : "Update Genre"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <RenderCreateCategory
              dataGenre={dataGenre}
              dataUserCurrent={dataUserCurrent}
              setValidateSuccess={setValidateSuccess}
              nameInputValue={nameInputValue}
              setNameInputValue={setNameInputValue}
              parentGenre={parentGenre}
              setParentGenre={setParentGenre}
              dataGenreUpdate={dataGenreUpdate}
              update={update}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={update ? handleUpdate : handleSubmit}>
            {update ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
