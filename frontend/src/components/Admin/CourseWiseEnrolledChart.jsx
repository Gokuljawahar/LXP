import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Doughnut, Line } from "react-chartjs-2";
import { Paper, Button, Typography } from "@mui/material";
import { getCourseWiseEnrollmentCount } from "../../features/admin/api/dashboardApi";
import { mapCourseEnrollmentsToChartData } from "../../features/admin/selectors/dashboardSelectors";
import useAsyncRequest from "../../hooks/useAsyncRequest";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
  },
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CourseWiseEnrolledChart = () => {
  const [chartType, setChartType] = useState("pie");
  const {
    data: chartData,
    error,
    isLoading,
    run: loadCourseEnrollmentData,
  } = useAsyncRequest(getCourseWiseEnrollmentCount, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadCourseEnrollmentData();
      } catch (error) {
        console.error("Error fetching course enrollments", error);
      }
    };

    fetchData();
  }, [loadCourseEnrollmentData]);

  const normalizedChartData =
    chartData.length > 0
      ? mapCourseEnrollmentsToChartData(chartData, chartType)
      : null;

  const renderChart = () => {
    switch (chartType) {
      case "doughnut":
        return <Doughnut data={normalizedChartData} />;
      case "line":
        return <Line data={normalizedChartData} />;
      default:
        return <Pie data={normalizedChartData} />;
    }
  };

  return (
    <>
      <Grid item xs={12} md={7}>
        <Item style={{ borderRadius: "15px" }}>
          <Card variant="">
            <CardContent sx={{ height: "560px" }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "bold", color: "#003f5c" }}
                color="text.secondary"
                gutterBottom
              >
                Course Wise Enrollment Count &nbsp;
                <DonutSmallRoundedIcon />
              </Typography>
              <div
                style={{
                  padding: "20px",
                  margin: "15px",
                  // borderRadius: "15px",
                  // boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                  // width: "55%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center align content horizontally
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center", // Center align content horizontally
                  }}
                >
                  <Button
                    onClick={() => setChartType("pie")}
                    variant={chartType === "pie" ? "contained" : "outlined"}
                    style={{ marginRight: "10px" }}
                  >
                    Pie Chart
                  </Button>
                  <Button
                    onClick={() => setChartType("doughnut")}
                    variant={
                      chartType === "doughnut" ? "contained" : "outlined"
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Doughnut Chart
                  </Button>
                  <Button
                    onClick={() => setChartType("line")}
                    variant={chartType === "line" ? "contained" : "outlined"}
                  >
                    Line Chart
                  </Button>
                </div>
                <div style={{ width: "100%", maxWidth: "400px" }}>
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && error && <p>Unable to load chart data.</p>}
                  {!isLoading && !error && normalizedChartData && renderChart()}
                </div>
              </div>
            </CardContent>
          </Card>
        </Item>
      </Grid>
    </>
  );
};

export default CourseWiseEnrolledChart;
