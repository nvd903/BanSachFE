import { useState, forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";
import { handleLinkGGDrive } from "../../Ultilities";

const cx = classNames.bind(styles);

/*
    dùng classnames cho nó chuyên nghiệp
    nó tiện khi có nhiều class và truyền class từ ngoài

    dùng forwardRef có tác dụng là đẩy cái ref của thẻ bên trong ra ngoài
    khi sd tippy thì nó cần ref để xác định vị trí hiển thị
*/
// const id = `https://drive.google.com/file/d/1c-29EXE0NSIuLX0AFZYXG9RZc0LH86EV/view?usp=share_link
// `;
const fallbackDefault =
  handleLinkGGDrive(`https://drive.google.com/file/d/1c-29EXE0NSIuLX0AFZYXG9RZc0LH86EV/view?usp=share_link
  `);

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = fallbackDefault,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <img
        className={cx("wrapper", className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
