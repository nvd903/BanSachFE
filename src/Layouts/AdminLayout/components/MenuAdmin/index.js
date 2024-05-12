import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";

function MenuAdmin({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  menuId,
  children,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      marginThreshold={60}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {children}
    </Menu>
  );
}

export default MenuAdmin;
