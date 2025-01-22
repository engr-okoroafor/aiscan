"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import LoadGraphs from "../components/LoadGraphs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graphs() {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  const getColorBySignal = (signalStrength) => {
    if (signalStrength >= -60) return "rgba(34, 197, 94, 0.7)"; // Green (Good)
    if (signalStrength >= -70) return "rgba(251, 191, 36, 0.7)"; // Yellow (Moderate)
    return "rgba(239, 68, 68, 0.7)"; // Red (Weak)
  };

  const getColorBySecurity = (security) => {
    if (security.includes("WPA3")) return "rgba(34, 197, 94, 0.7)"; // Green (Good)
    if (security.includes("WPA2")) return "rgba(251, 191, 36, 0.7)"; // Yellow (Moderate)
    return "rgba(239, 68, 68, 0.7)"; // Red (Weak)
  };

  const transformData = (networks) => ({
    labels: networks.map((network) => network.ssid),
    datasets: [
      {
        label: "Signal Strength (dBm)",
        data: networks.map((network) => network.signalStrength),
        backgroundColor: networks.map((network) =>
          getColorBySignal(network.signalStrength)
        ),
        borderColor: networks.map((network) =>
          getColorBySignal(network.signalStrength)
        ),
        borderWidth: 1,
        borderRadius: 10, // Beveled corners
        barThickness: 35, // Increased bar width
        categoryPercentage: 0.5, // Slightly wider category spacing
        categoryPercentage: 0.5, // More spacing for side-by-side bars
        barPercentage: 0.9, // More spacing for side-by-side bars
      },
      {
        label: "Security Protocol Analysis",
        data: networks.map((network) =>
          network.security.includes("WPA3")
            ? 100
            : network.security.includes("WPA2")
            ? 50
            : 25
        ),
        backgroundColor: networks.map((network) =>
          getColorBySecurity(network.security)
        ),
        borderColor: networks.map((network) =>
          getColorBySecurity(network.security)
        ),
        borderWidth: 1,
        borderRadius: 10, // Beveled corners
        barThickness: 35, // Increased bar width
        categoryPercentage: 0.5, // Slightly wider category spacing
        barPercentage: 0.9, // More spacing for side-by-side bars
      },
    ],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze");
      const data = await res.json();
      if (data.success) {
        setGraphData(transformData(data.networks));
      } else {
        console.error("Failed to fetch network data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching network data:", error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labels = original(chart);

            labels.forEach((label) => {
              if (label.text === "Signal Strength (dBm)") {
                label.text = "Signal Strength";
              }
              if (label.text === "Security Protocol Analysis") {
                label.text = "Security Status";
              }
            });

            return labels;
          },
        },
      },
      title: {
        display: true,
        text: "Wi-Fi Network Analysis",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => {
            const index = tooltipItem[0].dataIndex;
            const ssid = graphData.labels[index];
            return `Network: ${ssid}`;
          },
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;

            if (datasetIndex === 0) {
              // Signal Strength in dBm
              const signalStrength = graphData.datasets[0].data[dataIndex];
              return `Signal Strength: ${signalStrength} dBm`;
            }

            if (datasetIndex === 1) {
              // Security Protocol
              const score = graphData.datasets[1].data[dataIndex];
              const securityLabel =
                score === 100
                  ? "Good (WPA3)"
                  : score === 50
                  ? "Moderate (WPA2)"
                  : "Weak (Other)";
              return `Security Protocol: ${securityLabel} - Score: ${score}`;
            }

            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Analysis Score (%)", // Corrected Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: "Networks (SSID)",
        },
        stacked: false, // Bars will appear side by side
      },
    },
    elements: {
      line: {
        borderColor: "white", // White lines for visibility
      },
    },
  };

  return (
    <div>
      <LoadGraphs onClick={fetchData} loading={loading} />
      <Bar data={graphData} options={options} />
    </div>
  );
}
