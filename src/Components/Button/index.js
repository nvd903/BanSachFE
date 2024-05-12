import { Link } from "react-router-dom";

import "./Button.scss";

function Button({
  children,
  to,
  href,
  className,
  leftIcon,
  rightIcon,
  badge,
  countBadge = 0,
  itemMenu,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };

  //logic choose type Comp
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  //hạn chế tối đa sử dụng className vì hiện tại chưa viết sử lý css như thế nào
  //tạm thời thì nếu có thêm className thì vào Button.sccs viết class đó
  const classes = {
    [className]: className,
    badge: badge ? "btn__badge" : "",
    itemMenu: itemMenu ? "btn__item-menu" : "",
  };

  //nếu counntBadge lớn hơn 99 thì hiển thị 99+
  if (countBadge && countBadge > 99) {
    countBadge = "99+";
  }

  return (
    <Comp
      className={
        itemMenu
          ? `${classes.itemMenu}`
          : `button__wrapper ${classes.badge}  ${classes?.[className]}`
      }
      {...props}
    >
      {leftIcon && <span className="button__icon">{leftIcon}</span>}
      {children && <span className="button__label">{children}</span>}
      {rightIcon && <span className="button__icon">{rightIcon}</span>}
      {badge && <span className="button__badge">{countBadge}</span>}
    </Comp>
  );
}

export default Button;
