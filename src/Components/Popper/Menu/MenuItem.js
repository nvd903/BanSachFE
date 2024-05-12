// có thể dùng chung file css
import Button from "../../Button";
import "./Menu.scss";

//data truyền từ cha, props onClick handle fn
function MenuItem({ data, onClick }) {
  return (
    //render Buttom custom
    <Button leftIcon={data.icon} to={data.to} onClick={onClick} itemMenu>
      {data.label}
    </Button>
  );
}

export default MenuItem;
