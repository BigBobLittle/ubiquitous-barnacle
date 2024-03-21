import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as echarts from "echarts";
import { Container, Row, Col } from "react-bootstrap";


const SleepChart: React.FC = () => {
  const { state } = useLocation();

  console.log({state})
  useEffect(() => {
    if (!state || !state.rowData) return;

    const {sleepTimes, dates, name } = state.rowData;

   

    console.log({dates, sleepTimes})
    // Initialize ECharts instance
    const myChart = echarts.init(document.getElementById("chart")!);

    // Specify the chart configuration
    const option = {
      title: {
        text: `${name}'s Sleep Time for Last 7 Days`,
      },
      xAxis: {
        // type: "category",
        data: dates,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: sleepTimes,
          type: "bar",
        },
      ],
    };

    // Set the chart configuration and render the chart
    myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, [state]);

//   return <div id="chart" style={{ width: "100%", height: "400px" }} />;

return (
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={6} md={12} style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h2>List of Records</h2>
              <span style={{ color: "blue" }}>
                <Link to="/table">Back to User's Table</Link>
              </span>
            </div>

            <div id="chart" style={{ width: "100%", height: "400px" }} />
            </Col>
            </Row>

            </Container>
)
};

export default SleepChart;
