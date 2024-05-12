import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import style from "./DetailBook.module.scss";
import { getABook } from "../../../ApiServices/booksApi";
import Image from "../../../Components/Image";
import { formatCurrent, handleLinkGGDrive } from "../../../Ultilities";
import { getAAuthor } from "../../../ApiServices/authorApi";
import { getAGenre } from "../../../ApiServices/genresApi";
import { addToCart } from "../../../ApiServices/cartApi";
import { updatePriorityPoints } from "../../../ApiServices/booksApi";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style);

function DetailBook() {
  const [dataBook, setDataBook] = useState();
  const [author, setAuthor] = useState();
  const [genres, setGenres] = useState([]);

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBookById = async () => {
    const res = await getABook(id);
    if (res) {
      setDataBook(res);
      getAuthorById(res.author);
      let genresArr = Promise.all(
        res.genres.map(async (item) => {
          const genre = await getGenreById(item);
          const { name } = genre;
          return name;
        })
      );

      genresArr.then((data) => setGenres(data));
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  const getAuthorById = async (authorId) => {
    const author = await getAAuthor(authorId);
    setAuthor(author);
  };

  const getGenreById = async (genreId) => {
    return await getAGenre(genreId);
  };

  const handleAddCart = async () => {
    const payload = {
      itemId: dataBook._id,
      quantity: 1,
      price: dataBook.price,
    };
    await addToCart(currentUser._id, payload, dispatch);
    await updatePriorityPoints({
      type: "addtocart",
      authorId: dataBook.author,
      genreId: dataBook.genres,
      bookId: dataBook._id,
    });
    navigate("/cart");
  };

  return (
    <div className={cx("container")}>
      {!dataBook ? (
        <h2>...loading</h2>
      ) : (
        <div className={cx("inner")}>
          <div className={cx("product__gallery")}>
            <Image src={handleLinkGGDrive(dataBook.thumnel)} />
          </div>
          <div className={cx("product__detail")}>
            <div className={cx("product--heading")}>{dataBook.name}</div>
            {author && (
              <div className={cx("product--author")}>
                <span>Tác giả: </span>
                <span className={cx("author__inf")}>
                  <span className={cx("author__avatar")}>
                    <Image src={handleLinkGGDrive(author.avatar)} />
                  </span>
                  <span className={cx("author__name")}>{author.name}</span>
                </span>
              </div>
            )}
            {genres && genres.length > 0 && (
              <div className={cx("product--genre")}>
                Thể loại:{" "}
                {genres.map((item, index) => {
                  return <strong key={index}>{item} &nbsp;</strong>;
                })}
              </div>
            )}
            <div className={cx("product--price")}>
              {formatCurrent(dataBook.price)}
            </div>

            <div className={cx("product--action")}>
              <button className={cx("btn__addCart")} onClick={handleAddCart}>
                Thêm giỏ hàng
              </button>
            </div>

            <div className={cx("product--description")}>
              <strong>Mô tả: </strong>
              {dataBook.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailBook;
