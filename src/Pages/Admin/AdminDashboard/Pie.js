import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
    title: {
      display: true,
      text: "Sản phẩm bán chạy trong tháng trước",
    },
  },
};

export function PieChart({ dataOrders, dataAllBooks }) {
  const aggregation = [];

  if (dataOrders && dataOrders.length > 0) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const filterData = [];
    dataOrders.forEach((ele) => {
      const dateString = ele.createdAt;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const condition =
        ele.state === "confirm" &&
        year === currentYear &&
        month === currentMonth - 1; // sau phải sửa thành curentMonth -1;
      if (condition) {
        filterData.push(...ele.items);
      }
    });

    const sameEles = [];
    for (let i = 0; i < filterData.length; i++) {
      let { itemId, quantity } = filterData[i];
      if (!sameEles.includes(filterData[i].itemId)) {
        for (let j = i + 1; j < filterData.length; j++) {
          if (filterData[i].itemId === filterData[j].itemId) {
            quantity += filterData[j].quantity;
          }
        }
        aggregation.push({ itemId: itemId, quantity: quantity });
        sameEles.push(filterData[i].itemId);
      }
    }
  }
  const labels = [];
  if (dataAllBooks && dataAllBooks.length > 0) {
    // const filterBook = dataAllBooks.filter((item) =>
    //   aggregation.map((item) => item.itemId).includes(item._id)
    // );
    const filterBook = aggregation.map((item) => {
      return dataAllBooks.filter((ele) => ele._id === item.itemId)[0].name;
    });
    labels.push(...filterBook);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: aggregation.map((item) => {
          return item.quantity;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}
