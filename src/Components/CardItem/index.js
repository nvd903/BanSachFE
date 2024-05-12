import {
  Card,
  Button,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import "./CardItem.scss";

function CardItem({ srcImg, cardTitle, cardSubTitle, cardSub, size }) {
  return (
    <Card className={size}>
      <img alt="" src={srcImg} className="cardItem__img" />
      <CardBody>
        <CardTitle tag="h5">{cardTitle}</CardTitle>
        {cardSubTitle && (
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {cardSubTitle}
          </CardSubtitle>
        )}
        <CardText>{cardSub}</CardText>
        <Button className="cardItem__btn--buy">Buy now</Button>
        {/* <Button className="button-89">Buy now</Button> */}
      </CardBody>
    </Card>
  );
}

export default CardItem;
