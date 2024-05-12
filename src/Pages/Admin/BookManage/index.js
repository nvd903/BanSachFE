import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import BannerTilte from "../../../Layouts/AdminLayout/components/BannerTitle";
import { getAllUsers } from "../../../ApiServices/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { default as Pagination } from "../../../Components/Pagination";
import { getAllBooks, getBooksPerPage } from "../../../ApiServices/booksApi";
import BookDataGrid from "./BookDataGrid";
// import Button from "../../../Components/Button";
// import Menu from "../../../Components/Popper/Menu";
// import { exportPDF } from "../../../Ultilities/exportPDF";
// import { exportExcel } from "../../../Ultilities";
// import { importFromExcel } from "../../../Ultilities/importFromExcel";
import { getAllAuthor } from "../../../ApiServices/authorApi";
import { getAllGenres } from "../../../ApiServices/genresApi";
import { default as CreateBookModal } from "./CreateBookModal";

function BookManage() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [dataBooks, setDataBooks] = useState([]);
  const [dataAllBooks, setDataAllBooks] = useState([]);

  const [dataAllUsers, setDataAllUsers] = useState([]);

  const [dataAllAuthors, setDataAllAuthors] = useState([]);

  const [dataAllGenres, setDataAllGenres] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  //   //đổi
  useEffect(() => {
    fetchBooksPerPage();
    fetchAllBooks();
    fetchDataAllUsers();
    fetchAllAuthors();
    fetchAllGenres();
  }, [page]);

  const fetchAllBooks = async () => {
    const result = await getAllBooks();
    setDataAllBooks(result);
  };

  const fetchBooksPerPage = async () => {
    const result = await getBooksPerPage(page);
    setTotalPages(result.totalPages);
    setDataBooks(result.data);
  };

  const fetchDataAllUsers = async () => {
    if (!currentUser) {
      toast.error("chưa đăng nhâp");
      return;
    } else {
      if (!currentUser.isadmin) {
        toast.error("not authenzation");
      } else {
        const res = await getAllUsers(currentUser.accessToken);
        setDataAllUsers(res);
      }
    }
  };

  const fetchAllAuthors = async () => {
    const result = await getAllAuthor();
    setDataAllAuthors(result);
  };

  const fetchAllGenres = async () => {
    const result = await getAllGenres();
    setDataAllGenres(result);
  };

  //dialog create or edit category
  //việc set state ở đây khiến cả component bị rerender liên tục
  //đổi
  const [openBookDialog, setOpenBookDialog] = useState(false);

  const handleClickOpenBookDialog = () => {
    setOpenBookDialog(true);
  };

  const handleCloseBookDialog = () => {
    setOpenBookDialog(false);
  };

  //more option
  //đổi

  // const itemGenreOptions = [
  //   { label: "Get all genres", type: "getAllGenres" },
  //   { label: "Export to PDF", type: "exportTOPDF" },
  //   { label: "Export to Excel", type: "exportToExcel" },
  //   { label: "Import from Excel", type: "importFromExcel" },
  // ];

  // const handleClickGenreOptions = (menuItem) => {
  //   switch (menuItem.type) {
  //     case "getAllGenres":
  //       fetchDataGenre();
  //       break;
  //     case "exportTOPDF":
  //       exportPDF(dataGenres, "genre.pdf");
  //       break;
  //     case "exportToExcel":
  //       exportExcel(dataGenres, "genre.xlsx");
  //       break;
  //     case "importFromExcel":
  //       importFromExcel("D:/Downloads/genre.xlsx");
  //       break;

  //     default:
  //   }
  // };

  return (
    <Grid container className="genre_container copy">
      <BannerTilte
        titlePage={"Book Management Page"}
        btnCreate
        onClick={handleClickOpenBookDialog}
      />
      {/* <Menu
        placement="bottom-start"
        offset={[-30, 10]}
        interactive={true}
        items={itemGenreOptions}
        onChange={handleClickGenreOptions}
      >
        <div className="genre__option">
          <Button leftIcon={<i className="fa fa-navicon" />} />
        </div>
      </Menu> */}
      <BookDataGrid
        allUsers={dataAllUsers}
        currentUser={currentUser}
        handleClose={handleClickOpenBookDialog}
        dataBooks={dataBooks}
        setDataBooks={setDataBooks}
        dataAllAuthors={dataAllAuthors}
        dataAllGenres={dataAllGenres}
      />

      <Pagination page={page} setPage={setPage} totalPage={totalPages || 10} />

      <CreateBookModal
        open={openBookDialog}
        handleClose={handleCloseBookDialog}
        dataAllBooks={dataAllBooks}
        dataBooks={dataBooks}
        setDataBooks={setDataBooks}
        dataUserCurrent={currentUser}
        dataAllAuthors={dataAllAuthors}
        dataAllGenres={dataAllGenres}
      />
    </Grid>
  );
}

export default BookManage;
