import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../../../../Components/Button";
import { default as UpdateAuthorModal } from "./CreateAndEditAuthorModal";
import { default as DeleteAuthorModal } from "./ConfirmDeleteAuthor";
import { useState } from "react";
import { formatDate } from "../../../../Ultilities";

// import { default as DeleteModal } from "./ConfirmDeleteGenre";

//sửa lại props
export default function AuthorDataGrid({
  allUsers,
  currentUser,
  dataAuthors,
  setDataAuthors,
}) {
  //sửa
  const [dataAuthorUpdate, setDataAuthorUpdate] = useState({});
  const [dataAuthorDelete, setDataAuthorDelete] = useState();
  const [openUpdateAuthor, setOpenUpdateAuthor] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const hanldeDeleteAuthor = (data) => {
    const deletedAuthor = data;
    setDataAuthorDelete(deletedAuthor);
    handleOpenConfirmDeleteModal();
  };

  const handleEditAuthor = (data) => {
    const dataGenre = data;
    setDataAuthorUpdate(dataGenre);
    handleClickOpenUpdateAuthor();
  };

  const handleClickOpenUpdateAuthor = () => {
    setOpenUpdateAuthor(true);
  };

  const handleCloseUpdateAuthor = () => {
    setOpenUpdateAuthor(false);
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
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Hometown</TableCell>
              <TableCell align="left">Amount of books</TableCell>
              <TableCell align="left">Created By</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Upadate By</TableCell>
              <TableCell align="left">Upadate At</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {dataAuthors &&
                dataAuthors.length > 0 &&
                dataAuthors.map((row, index) => {
                  const createBy = allUsers.find(
                    (item) => item._id === row.createdBy
                  );
                  const updatedBy = allUsers.find(
                    (item) => item._id === row.updatedBy
                  );
                  //   // genreParentId là một mảng
                  //   const parentGenre = rows.map((genre) => {
                  //     if (!row.genreParentId) {
                  //       return "";
                  //     }
                  //     if (row.genreParentId.includes(genre._id)) {
                  //       return genre.name;
                  //     }
                  //     return "";
                  //   });
                  return (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">avatar</TableCell>
                      <TableCell align="left">{row.age}</TableCell>
                      <TableCell align="left">{row.hometown}</TableCell>
                      <TableCell align="center">{row.books.length}</TableCell>
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
                      <TableCell align="left" className="category_col-action">
                        <Button
                          leftIcon={<i className="fa fa-edit" />}
                          onClick={() => handleEditAuthor(row)}
                        />
                        <Button
                          leftIcon={<i className="fa fa-trash" />}
                          onClick={() => hanldeDeleteAuthor(row)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateAuthorModal
        open={openUpdateAuthor}
        handleClose={handleCloseUpdateAuthor}
        dataAuthors={dataAuthors}
        setDataAuthors={setDataAuthors}
        dataUserCurrent={currentUser}
        update={true}
        dataAuthorUpdate={dataAuthorUpdate}
      />

      <DeleteAuthorModal
        open={openConfirmDeleteModal}
        handleClose={handleCloseConfirmDeleteModal}
        dataAuthorDelete={dataAuthorDelete}
        currentUser={currentUser}
        dataAuthors={dataAuthors}
        setDataAuthors={setDataAuthors}
      />
    </Box>
  );
}
