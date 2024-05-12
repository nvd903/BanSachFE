import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatCurrent } from "../../../../Ultilities";

export default function AuthorDataGrid({
  allUsers,
  currentUser,
  dataBooks,
  setDataBooks,
  dataAllGenres,
  dataAllAuthors,
}) {
  return (
    <Box
      sx={{
        minHeight: "520px",
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
              <TableCell align="left">Description</TableCell>
              <TableCell align="left" sx={{ maxWidth: "120px" }}>
                Thumnel
              </TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Inventory Quantity</TableCell>
              <TableCell align="left">Purchased Quantity</TableCell>
              <TableCell align="left">Assess Star</TableCell>
              <TableCell align="left">Genres</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Priority Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {dataBooks &&
                dataBooks.length > 0 &&
                dataBooks.map((row, index) => {
                  const genres = dataAllGenres.map((item) => {
                    if (row.genres.includes(item._id)) {
                      return item.name + " ";
                    }
                  });
                  const author = dataAllAuthors.map((item) => {
                    if (item._id === row.author) {
                      return item.name;
                    }
                  });

                  return (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log("e", row);
                      }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          whiteSpace: "wrap",
                        }}
                      >
                        <p style={{ wordWrap: "break-word" }}>{row.thumnel}</p>
                      </TableCell>
                      <TableCell align="left">
                        {formatCurrent(row.price)}
                      </TableCell>
                      <TableCell align="center">
                        {row.inventoryQuantity}
                      </TableCell>
                      <TableCell align="left">
                        {row.purchasedQuantity}
                      </TableCell>
                      <TableCell align="left">{row.assessStar}</TableCell>
                      <TableCell align="left">{genres}</TableCell>
                      <TableCell align="left">{author}</TableCell>
                      <TableCell align="left">{row.priorityPoints}</TableCell>
                      {/* <TableCell align="left" className="category_col-action">
                        <Button
                          leftIcon={<i className="fa fa-edit" />}
                          //   onClick={() => handleEditAuthor(row)}
                        />
                        <Button
                          leftIcon={<i className="fa fa-trash" />}
                          //   onClick={() => hanldeDeleteAuthor(row)}
                        />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <UpdateAuthorModal
        open={openUpdateAuthor}
        handleClose={handleCloseUpdateAuthor}
        dataAuthors={dataAuthors}
        setDataAuthors={setDataAuthors}
        dataUserCurrent={currentUser}
        update={true}
        dataAuthorUpdate={dataAuthorUpdate}
      /> */}

      {/* <DeleteAuthorModal
        open={openConfirmDeleteModal}
        handleClose={handleCloseConfirmDeleteModal}
        dataAuthorDelete={dataAuthorDelete}
        currentUser={currentUser}
        dataAuthors={dataAuthors}
        setDataAuthors={setDataAuthors}
      /> */}
    </Box>
  );
}
