// import { faker } from "@faker-js/faker";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const linesChartData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 15),
      borderColor: "rgb(255, 0, 0)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 22),
      borderColor: "rgb(0, 0, 255)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default linesChartData;
