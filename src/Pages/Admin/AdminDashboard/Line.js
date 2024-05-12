import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Doanh thu từng ngày trong tuần",
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function LineChart({ dataOrders }) {
  const statisticsAWeak = [0, 0, 0, 0, 0, 0, 0];
  if (dataOrders && dataOrders.length > 0) {
    const filterData = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentDayOfWeak = currentDate.getDay();
    const numberBeforeDays = (currentDayOfWeak + 6) % 7;
    dataOrders.forEach((ele) => {
      const dateString = ele.createdAt;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayOfWeek = date.getDay();
      const condition =
        ele.state === "confirm" &&
        year === currentYear &&
        month === currentMonth &&
        day >= currentDay - numberBeforeDays;
      if (condition) {
        filterData.push({ totalAmount: ele.totalAmount, day: dayOfWeek });
      }
    });

    filterData.forEach((ele) => {
      switch (ele.day) {
        case 1:
          statisticsAWeak[0] += ele.totalAmount;
          break;
        case 2:
          statisticsAWeak[1] += ele.totalAmount;
          break;
        case 3:
          statisticsAWeak[2] += ele.totalAmount;
          break;
        case 4:
          statisticsAWeak[3] += ele.totalAmount;
          break;
        case 5:
          statisticsAWeak[4] += ele.totalAmount;
          break;
        case 6:
          statisticsAWeak[5] += ele.totalAmount;
          break;
        case 0:
          statisticsAWeak[6] += ele.totalAmount;
          break;
        default:
      }
    });
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu các ngày trong tuần",
        data: statisticsAWeak,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#fdbccf",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
