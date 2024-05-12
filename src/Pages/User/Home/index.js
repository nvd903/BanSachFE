import { Container } from "reactstrap";

import Banner from "./Banner";
import "./Home.scss";
import SuggestList from "./SuggestList";
import { useEffect, useState } from "react";
import { getSuggestList } from "../../../ApiServices/booksApi";
import { getAllAuthor } from "../../../ApiServices/authorApi";
import { useSelector } from "react-redux";

function Home() {
  const [dataBooks, setDataBooks] = useState([]);
  const [dataAuthors, setDataAuthors] = useState();

  const [currentPage, setPage] = useState(1);

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  useEffect(() => {
    fetchSuggestList(1, 20);
    fetchDataAllAuthors();
  }, []);

  const fetchSuggestList = async (page, perPage) => {
    const payload = { perPage, page };
    const result = await getSuggestList(payload);
    setDataBooks(result.data);
    setPage(result.page);
  };

  const handleClickSeeMore = async () => {
    const payload = { perPage: 10, page: currentPage + 1 };
    const res = await getSuggestList(payload);
    setDataBooks([...dataBooks, ...res.data]);
    setPage(res.page);
  };

  const fetchDataAllAuthors = async () => {
    const result = await getAllAuthor();
    setDataAuthors(result);
  };
  return (
    <Container fluid="md">
      <div className="tabs__header--bestseller">
        <span>Sản phẩm bán chạy</span>
      </div>
      <Banner />
      <div className="home__main">
        <SuggestList
          dataBooks={dataBooks}
          dataAuthors={dataAuthors}
          currentUser={currentUser}
          onClick={handleClickSeeMore}
        />
      </div>
    </Container>
  );
}

export default Home;
