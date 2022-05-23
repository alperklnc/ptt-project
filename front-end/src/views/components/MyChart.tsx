import React, { useEffect, useState } from "react";
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
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Bel-Omuz Açısı Grafiği",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 0.5,
      },
    },
  },
};

const labels = ["Set1", "Set2", "Set3"];

export const data = {
  labels,
  datasets: [
    {
      label: "Bel Açısı",
      data: labels.map((i) => [
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
      ]),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Omuz Açısı",
      data: labels.map(() => [
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
      ]),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
  redraw: true,
};

export default function App() {
  const [bids, setBids] = useState([0]);

  useEffect(
    () => {
      const apiCall = {
        event: "bts:subscribe",
        data: { channel: "order_book_btcusd" },
      };

      const ws = new WebSocket("wss://ws.bitstamp.net");
      
      ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
      };
    
      ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
          if ((json.event = "data")) {
            setBids(json.data.bids.slice(0, 5));
          }
        } catch (err) {
          console.log(err);
        }
      };
      
    },
    []
  );
  //map the first 5 bids
  const firstBids = bids.map((item) => {
    return (
      <div>
        <p> {item}</p>
      </div>
    );
  });

  return (<div>
    {firstBids}
    <Line options={options} data={data} />
    
    </div>);
}
