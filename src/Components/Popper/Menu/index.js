import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

import { Wrapper as PopperWrapper } from "../../Popper";
import "./Menu.scss";
import MenuItem from "./MenuItem";

// sử dụng onChange ở dưới mà nếu không truyền hàm từ cha thì sẽ báo lỗi nên phải định nghĩa 1 hàm rỗng làm mặc định
const defaultFn = () => {};

function Menu({
  children,
  items = [],
  onChange = defaultFn,
  interactive = false,
  placement = "bottom-end",
  offset = [40, 4],
}) {
  // lữu chữ dữ liệu
  const [menuPages, setMenuPages] = useState([{ data: items }]);
  // hiển thị phần tử cuối cùng của mảng
  const currentMenuPage = menuPages[menuPages.length - 1].data;

  // hàm sử lý logic onclick item menu
  const handleOnclickItemMenu = (item) => {
    //tạo biến điều kiện xác định item có data children không
    const isParent = !!item.children;
    // dùng !! vì nó sẽ luôn luôn trả về boolean nên sẽ không bị lỗi isParent trả về underfine
    //cần làm những gì
    //nếu có isparent === true thì đẩy data children vào menuPages
    if (isParent) {
      setMenuPages((prev) => [...prev, item.children]);
    } else {
      //nếu k có data con thì item có chức năng link hoặc thực thi hàm (vd logout)
      // vì bên Buttom custom dã sử lý link nên chỉ còn th là thực hiện hàm
      onChange(item);
      // onchange (item) là sao chưa hiểu lắm
    }
  };

  // fn handle render menu items
  const renderItems = () => {
    return currentMenuPage.map((item, index) => {
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => handleOnclickItemMenu(item)}
        />
      );
    });
  };
  return (
    <Tippy
      interactive={interactive}
      delay={[100, 100]}
      offset={offset}
      placement={placement}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
          <PopperWrapper>{renderItems()}</PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
