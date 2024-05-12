import classNames from "classnames/bind";

import CardBook from "../../../../Components/CardBook";
import { handleLinkGGDrive } from "../../../../Ultilities";
import style from "./SuggestList.module.scss";

import { addToCart } from "../../../../ApiServices/cartApi";
import { updatePriorityPoints } from "../../../../ApiServices/booksApi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function SuggestList({ dataBooks, dataAuthors, currentUser, onClick }) {
  const dispatch = useDispatch();
  return (
    <div className={cx("container")}>
      <div className={cx("tabs__header")}>
        <span>Gợi ý hôm nay</span>
      </div>
      <div className={cx("row__item")}>
        {dataBooks &&
          dataBooks.map((item) => {
            const author =
              dataAuthors &&
              dataAuthors.map((author) => {
                if (author._id === item.author) {
                  return author.name;
                }
              });
            const handleAddCart = async () => {
              const payload = {
                itemId: item._id,
                quantity: 1,
                price: item.price,
              };
              const result = await addToCart(
                currentUser._id,
                payload,
                dispatch
              );
              await updatePriorityPoints({
                type: "addtocart",
                authorId: item.author,
                genreId: item.genres,
                bookId: item._id,
              });
            };
            return (
              <Link to={`detail-book/${item._id}`} key={item._id}>
                <CardBook
                  src={item?.thumnel ? handleLinkGGDrive(item.thumnel) : ""}
                  alt={item.name}
                  price={item.price}
                  title={item.name}
                  author={author || ""}
                  sale="10%"
                  handleAddCart={handleAddCart}
                />
              </Link>
            );
          })}
      </div>
      <button className={cx("btn_more")} onClick={onClick}>
        Xem thêm
      </button>
    </div>
  );
}

export default SuggestList;
