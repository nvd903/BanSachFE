import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Doanh thu hàng tháng",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function BarChart({ dataOrders }) {
  if (dataOrders && dataOrders.length > 0) {
    const newDataOrders = dataOrders.map((item) => {
      const dateString = item.createdAt;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const condition = item.state === "confirm" && year === currentYear;
      if (condition) {
        return { totalAmount: item.totalAmount, month: month };
      }
    });
    const newDataOrder = newDataOrders.filter((item) => item !== undefined);
    var dataAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < newDataOrder.length; i++) {
      if (newDataOrder[i].month === 1) {
        dataAmount[0] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 2) {
        dataAmount[1] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 3) {
        dataAmount[2] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 4) {
        dataAmount[3] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 5) {
        dataAmount[4] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 6) {
        dataAmount[5] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 7) {
        dataAmount[6] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 8) {
        dataAmount[7] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 9) {
        dataAmount[8] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 10) {
        dataAmount[9] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 11) {
        dataAmount[10] += newDataOrder[i].totalAmount;
      }
      if (newDataOrder[i].month === 12) {
        dataAmount[11] += newDataOrder[i].totalAmount;
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        backgroundColor: [
          "#b5ddd1",
          "#d7e7a9",
          "#d3c0f9",
          "#f99a9c",
          "#fdbccf",
          "#c45850",
          "#87CEFA",
        ],
        data: dataAmount,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
