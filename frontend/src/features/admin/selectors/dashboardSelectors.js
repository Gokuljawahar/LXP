const DEFAULT_CHART_COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

export const mapCourseEnrollmentsToChartData = (enrollments, chartType) => ({
  labels: enrollments.map((row) => row.courseName),
  datasets: [
    {
      label: "Enrollments",
      data: enrollments.map((row) => row.count),
      backgroundColor: DEFAULT_CHART_COLORS,
      borderColor: chartType === "line" ? "rgba(75,192,192,1)" : undefined,
      borderWidth: chartType === "line" ? 2 : undefined,
    },
  ],
});
