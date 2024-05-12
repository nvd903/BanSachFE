import "./CardProduct.scss";

function CardProduct({ srcImg, cardTitle, cardPrice }) {
  return (
    <div className="card__container">
      <div className="card-heart">
        <i className="fa fa-heart-o" />
      </div>
      <div className="card--cart">
        <i className="fa fa-shopping-cart" />
      </div>
      <div className="card-image">
        <img src={srcImg} alt="" />
      </div>
      <div className="card__title">
        <p>{cardTitle}</p>
      </div>
      <div className="card__price">
        <p>${cardPrice}</p>
      </div>
      <div className="card__size">
        <h3>Size</h3>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
      <div className="card__color">
        <h3>Color</h3>
        <div className="green"></div>
        <div className="red"></div>
        <div className="black"></div>
      </div>
      <div className="card__action">
        <button>Buy now</button>
        <button>Add cart</button>
      </div>
    </div>
  );
}

export default CardProduct;
