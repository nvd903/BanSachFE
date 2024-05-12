import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwitchButton from "../../../../Layouts/AdminLayout/components/SwitchButton";
import { updateAGenre } from "../../../../ApiServices/genresApi";
import Button from "../../../../Components/Button";
import DraggableDialog from "./CreateAndEditCategoryModal";
import { useState } from "react";

import { default as DeleteModal } from "./ConfirmDeleteGenre";
import { formatDate } from "../../../../Ultilities";

export default function CategoryDataGrid({
  rows,
  allUsers,
  currentUser,
  dataGenres,
  setDataGenres,
}) {
  const handleChangeActive = async (e) => {
    const payload = { active: e.target.checked };
    await updateAGenre(e.target.id, payload, currentUser.accessToken);
  };

  const [dataGenreUpdate, setDataGenreUpdate] = useState({});
  const [dataGenreDelete, setDataGenreDelete] = useState();
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const hanldeDeleteGenre = (data) => {
    const deletedGenre = data;
    setDataGenreDelete(deletedGenre);
    handleOpenConfirmDeleteModal();
  };

  const handleEditgenre = (data) => {
    const dataGenre = data;
    setDataGenreUpdate(dataGenre);
    handleClickOpenCategoryDialog();
  };

  const handleClickOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  return (
    <Box
      sx={{
        minHeight: "520px",
        // maxHeight: "520px",
        width: "95%",
        backgroundColor: "#eee",
        margin: "-30px 0 30px 30px",
        borderRadius: "4px",
        padding: "20px",
        overflow: "overlay",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Ordinal number</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Name of parent's genre</TableCell>
              <TableCell align="left">Quantity of books</TableCell>
              <TableCell align="left">Created By</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Upadate By</TableCell>
              <TableCell align="left">Upadate At</TableCell>
              <TableCell align="left">Active</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {rows &&
                rows.length > 0 &&
                rows.map((row, index) => {
                  const createBy = allUsers.find(
                    (item) => item._id === row.createdBy
                  );
                  const updatedBy = allUsers.find(
                    (item) => item._id === row.updatedBy
                  );
                  // genreParentId là một mảng
                  const parentGenre = rows.map((genre) => {
                    if (!row.genreParentId) {
                      return "";
                    }
                    if (row.genreParentId.includes(genre._id)) {
                      return genre.name;
                    }
                    return "";
                  });
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {parentGenre.map((genreParent) => {
                          if (genreParent) {
                            return genreParent + "   ";
                          }
                          return "";
                        })}
                      </TableCell>
                      <TableCell align="left">{row.books.length}</TableCell>
                      <TableCell align="left">
                        {createBy?.username || ""}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.createdAt)}
                      </TableCell>
                      <TableCell align="left">
                        {updatedBy?.username || ""}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.updatedAt)}
                      </TableCell>
                      <TableCell align="left">
                        {
                          <SwitchButton
                            id_togglebtn={row._id}
                            isCheck={row.active}
                            onClick={handleChangeActive}
                          />
                        }
                      </TableCell>
                      <TableCell align="left" className="category_col-action">
                        <Button
                          leftIcon={<i className="fa fa-edit" />}
                          onClick={() => handleEditgenre(row)}
                        />
                        <Button
                          leftIcon={<i className="fa fa-trash" />}
                          onClick={() => hanldeDeleteGenre(row)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>
      {dataGenreUpdate && (
        <DraggableDialog
          open={openCategoryDialog}
          handleClose={handleCloseCategoryDialog}
          dataGenre={dataGenres}
          dataUserCurrent={currentUser}
          setDataGenres={setDataGenres}
          update={true}
          dataGenreUpdate={dataGenreUpdate}
        />
      )}
      <DeleteModal
        open={openConfirmDeleteModal}
        handleClose={handleCloseConfirmDeleteModal}
        dataGenreDelete={dataGenreDelete}
        currentUser={currentUser}
        dataGenre={dataGenres}
        setDataGenres={setDataGenres}
      />
    </Box>
  );
}
