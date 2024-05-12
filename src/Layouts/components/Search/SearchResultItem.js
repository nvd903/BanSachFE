import { Link } from "react-router-dom";
import "./Search.scss";

function SearchResultItem({ data, onClick }) {
  return (
    <Link className="search__result--item" onClick={onClick}>
      {data?.name || "abc"}
    </Link>
  );
}

export default SearchResultItem;
