import React from 'react';
import { Line } from 'react-chartjs-2';

const NetworkGraph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.ssid),
    datasets: [
      {
        label: 'Signal Strength (dBm)',
        data: data.map((item) => item.signal_level),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default NetworkGraph;
