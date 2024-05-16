import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../../../../Components/Button";
// import { formatCurrent } from "../../../../Ultilities";

import {deleteUser} from "../../../../ApiServices/userApi"
import { toast } from "react-toastify";

export default function AuthorDataGrid({
  allUsers,currentUser
}) {
  const handleDeleteUser = async (row) => { 
    if(row.isadmin) { 
      toast.error("Bạn không thể xóa tài khoản admin khác")
    } else { 
      const res = await deleteUser(currentUser.accessToken, row._id);
      if(res === "Succesful delete") { 
        toast.success("Xóa tài khoản thành công. Vui lòng tải lại trang hoặc sử dụng phím tắt F5")
      } else { 
        toast.error("Xóa tài khoản không thành công.")
      }
    }

    
  }
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
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left" >
                Role
              </TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {allUsers &&
                allUsers.length > 0 &&
                allUsers.map((row, index) => {
                  return (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.isadmin ? "Admin" : "User"}</TableCell>
                      <TableCell align="left" className="category_col-action">
                        
                        <Button
                          leftIcon={<i className="fa fa-trash" />}
                            onClick={() => handleDeleteUser(row)}
                        />
                      </TableCell>
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
      />

      <DeleteAuthorModal
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
