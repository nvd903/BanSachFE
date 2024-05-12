export const formatCurrent = (price = 0) => {
  const formattedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedPrice;
};
