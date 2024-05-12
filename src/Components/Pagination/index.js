import Pagination from "@mui/material/Pagination";

import "./Pagination.scss";
import { Stack } from "@mui/material";

/*
  không sử lý call api ở đây vì sẽ khó tái sử dụng
  truyền curentPage và setPage ở bên ngoài vào onChange chỉ là setPage
*/

export default function PaginationCustom({
  page = 1,
  setPage,
  totalPage = 10,
}) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="pagination__container">
      <Stack spacing={2}>
        <Pagination count={totalPage} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
}
