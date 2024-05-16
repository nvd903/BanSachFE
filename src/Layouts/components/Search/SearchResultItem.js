import { Link } from "react-router-dom";
import "./Search.scss";

function SearchResultItem({ data }) {
  return (
    <Link to={data._id ? `/detail-book/${data._id}` : "/"} className="search__result--item" >
      {data?.name || "abc"}
    </Link>
  );
}

export default SearchResultItem;
