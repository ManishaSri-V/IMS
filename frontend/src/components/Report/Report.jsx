import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const lineChartRef = useRef(null); // Ref for line chart
  const lineChartInstance = useRef(null); // Store line chart instance

  // Fetch report data
  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/report/orders"
      );
      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (reportData.length > 0) {
      // Destroy previous chart instances if they exist
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const labels = reportData.map((report) => report.product_id);
      const data = reportData.map((report) => report.quantity);

      // Line Chart
      const lineCtx = lineChartRef.current.getContext("2d");
      lineChartInstance.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Quantity Sold (Line Chart)",
              data: data,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw} units`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Product ID",
              },
            },
            y: {
              title: {
                display: true,
                text: "Quantity",
              },
            },
          },
        },
      });

      // Cleanup function to destroy charts when component unmounts
      return () => {
        if (lineChartInstance.current) {
          lineChartInstance.current.destroy();
        }
      };
    }
  }, [reportData]);

  return (
    <div>
      <div>
        <h2>Sales Line Chart</h2>
        <p
          style={{
            marginLeft: "150px",
            position: "relative",
            height: "500px",
            width: "75%",
            backgroundColor: "#f9f9f9",
          }}
        >
          <canvas ref={lineChartRef}></canvas>
        </p>
      </div>
    </div>
  );
};

export default Report;
