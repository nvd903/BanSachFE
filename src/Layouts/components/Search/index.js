import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";

import "./Search.scss";
import { Wrapper as PopperWrapper } from "../../../Components/Popper";
import SearchResultItem from "./SearchResultItem";
import { useEffect, useRef, useState } from "react";
import { search } from "../../../ApiServices/searchApi";
import { useDebounce } from "../../../hooks";

function Search() {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [showResultSearch, setShowResultSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounced = useDebounce(inputSearchValue, 500);

  const inputRef = useRef();

  const fetchApi = async (q, limit, type) => {
    const res = await search(q, limit, type);
    if (!!res) {
      console.log(res);
      setResultSearch(res.data);
      setIsLoading(false);
    } else {
      setResultSearch([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setResultSearch([]);
      return;
    }
    setIsLoading(true);
    fetchApi(debounced);
  }, [debounced]);

  return (
    <Tippy
      visible={inputSearchValue.trim().length > 0 && showResultSearch}
      interactive
      onClickOutside={() => setShowResultSearch(false)}
      render={(attrs) => (
        <div className="box__search--result" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <Link className="search__book-result">
              {`Có phải bạn muốn tìm kiếm tên sách "${inputSearchValue}"?`}
            </Link>
            {!!resultSearch && resultSearch.length > 0 ? (
              resultSearch.map((item) => {
                return <SearchResultItem key={item._id} data={item} />;
              })
            ) : (
              <span className="search__result--item">{`Not found the books or authors are called name "${inputSearchValue}" yet!`}</span>
            )}
          </PopperWrapper>
        </div>
      )}
    >
      <div className="search__container">
        <input
          placeholder="enter name of books or authors"
          className="search__input"
          spellCheck={false}
          value={inputSearchValue}
          onChange={(e) => {
            setInputSearchValue(e.target.value);
          }}
          onFocus={() => setShowResultSearch(true)}
          ref={inputRef}
        />
        {!!inputSearchValue && !isLoading && (
          <button
            className="search__btn--clear"
            onClick={() => {
              setInputSearchValue("");
              setResultSearch([]);
              inputRef.current.focus();
            }}
          >
            <i className="fa fa-close" />
          </button>
        )}
        {isLoading && <i className="fa fa-spinner search__spinner--loading" />}
        <button className="search__btn--search">
          <i className="fa fa-search" />
        </button>
      </div>
    </Tippy>
  );
}

export default Search;
