import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Container, Card, Charts, Header, Metrics } from "./styles";

const Dashboard: React.FC = () => {
    useEffect(() => {
      const ctx1 = document.getElementById("moderationActivityChart") as HTMLCanvasElement;
      const ctx2 = document.getElementById("moderationFlagsChart") as HTMLCanvasElement;
      const ctx3 = document.getElementById("moderationActionsChart") as HTMLCanvasElement;
  
      new Chart(ctx1, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Moderations",
              data: [32, 30, 52, 45, 6, 55],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Flags",
              data: [24, 13, 38, 39, 48, 38],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
  
      new Chart(ctx2, {
        type: "radar",
        data: {
          labels: [
            "Impatience",
            "Entitlement",
            "Vulgarity",
            "Insulting",
            "Bitter Frustration",
            "Mocking",
            "Threat",
            "Irony",
            "Identity Attack",
          ],
          datasets: [
            {
              label: "Moderations",
              data: [18, 30, 23, 27, 20, 21, 15, 12, 10],
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
      });
  
      new Chart(ctx3, {
        type: "pie",
        data: {
          labels: ["Deleted", "Flagged", "Warned"],
          datasets: [
            {
              label: "Actions",
              data: [1234, 573, 892],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }, []);
  
    return (
      <Container>
        <Header>
          <h1>Incivility</h1>
          <select id="dateRange">
            <option value="7d">Last 7 Days</option>
            <option value="30d" selected>
              Last 30 Days
            </option>
            <option value="90d">Last 90 Days</option>
          </select>
        </Header>
  
        <Metrics>
          <Card>
            <h3>Total Incidents</h3>
            <p>1,204</p>
            <small>Incivility comments over time</small>
          </Card>
          <Card>
            <h3>Flagged Comments</h3>
            <p>15</p>
            <small>Number of flagged comments</small>
          </Card>
        </Metrics>
  
        <Charts>
          <canvas id="moderationActivityChart"></canvas>
          <canvas id="moderationFlagsChart"></canvas>
          <canvas id="moderationActionsChart"></canvas>
        </Charts>
      </Container>
    );
  };
  
export default Dashboard;

