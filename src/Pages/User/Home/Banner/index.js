import Slider from "react-slick";

import "./Banner.scss";
import { useState } from "react";
import { getBestSellerList } from "../../../../ApiServices/booksApi";
import { useEffect } from "react";
import Image from "../../../../Components/Image";
import { handleLinkGGDrive } from "../../../../Ultilities";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getBestSellerList();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Slider {...settings}>
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <div className="slider__item" key={item._id}>
              <div className="slider__item-inner">
                <Image src={handleLinkGGDrive(item.thumnel)} />
              </div>
            </div>
          );
        })}
    </Slider>
  );
}

export default Banner;
