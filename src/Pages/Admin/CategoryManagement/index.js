import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getAllGenres, getGenrePerPage } from "../../../ApiServices/genresApi";
import BannerTilte from "../../../Layouts/AdminLayout/components/BannerTitle";
import CategoryDataGrid from "./CategoryDataGrid";
import { getAllUsers } from "../../../ApiServices/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import DraggableDialog from "./CategoryDataGrid/CreateAndEditCategoryModal";
import { default as Pagination } from "../../../Components/Pagination";
import Button from "../../../Components/Button";
import Menu from "../../../Components/Popper/Menu";
import "./GenreManagement.scss";
import { exportPDF } from "../../../Ultilities/exportPDF";
import { exportExcel } from "../../../Ultilities";
import { importFromExcel } from "../../../Ultilities/importFromExcel";

function CategoryManagement() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [dataGenres, setDataGenres] = useState("");
  const [dataAllUsers, setDataAllUsers] = useState([]);

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    // fetchDataGenre();
    fetchDataAllUsers();
    fetchDataPerPage();
  }, [page]);

  const fetchDataGenre = async () => {
    const result = await getAllGenres();
    setDataGenres(result);
  };

  const fetchDataPerPage = async () => {
    const result = await getGenrePerPage(page);
    setTotalPages(result.totalPages);
    setDataGenres(result.data);
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

  //dialog create or edit category
  //việc set state ở đây khiến cả component bị rerender liên tục
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const handleClickOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  //more option

  const itemGenreOptions = [
    { label: "Get all genres", type: "getAllGenres" },
    { label: "Export to PDF", type: "exportTOPDF" },
    { label: "Export to Excel", type: "exportToExcel" },
    { label: "Import from Excel", type: "importFromExcel" },
  ];

  const handleClickGenreOptions = (menuItem) => {
    switch (menuItem.type) {
      case "getAllGenres":
        fetchDataGenre();
        break;
      case "exportTOPDF":
        exportPDF(dataGenres, "genre.pdf");
        break;
      case "exportToExcel":
        exportExcel(dataGenres, "genre.xlsx");
        break;
      case "importFromExcel":
        importFromExcel("D:/Downloads/genre.xlsx");
        break;

      default:
    }
  };

  return (
    <Grid container className="genre_container">
      <BannerTilte
        titlePage={"Category Management Page"}
        btnCreate
        onClick={handleClickOpenCategoryDialog}
      />
      <Menu
        placement="bottom-start"
        offset={[-30, 10]}
        interactive={true}
        items={itemGenreOptions}
        onChange={handleClickGenreOptions}
      >
        <div className="genre__option">
          <Button leftIcon={<i className="fa fa-navicon" />} />
        </div>
      </Menu>
      <CategoryDataGrid
        rows={dataGenres}
        allUsers={dataAllUsers}
        currentUser={currentUser}
        handleClose={handleCloseCategoryDialog}
        dataGenres={dataGenres}
        dataUserCurrent={currentUser}
        setDataGenres={setDataGenres}
      />

      <Pagination page={page} setPage={setPage} totalPage={totalPages} />

      <DraggableDialog
        open={openCategoryDialog}
        handleClose={handleCloseCategoryDialog}
        dataGenre={dataGenres}
        dataUserCurrent={currentUser}
        setDataGenres={setDataGenres}
      />
    </Grid>
  );
}

export default CategoryManagement;
