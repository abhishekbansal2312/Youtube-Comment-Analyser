import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { SentimentResults } from "../types/index";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SentimentDistributionProps {
  data: SentimentResults[];
}

const SentimentDistribution: React.FC<SentimentDistributionProps> = ({
  data,
}) => {
  console.log(data, "data in sent");

  // Normalize the sentiment labels
  const normalizedData = data.map((s) => {
    if (s === "Agree") return "positive";
    if (s === "Neutral") return "neutral";
    if (s === "Disagree") return "negative"; // Fix: Map "Disagree" to "negative"

    return s;
  });

  // Count occurrences of each sentiment type
  const sentimentCounts = {
    positive: normalizedData.filter((s) => s === "positive").length,
    neutral: normalizedData.filter((s) => s === "neutral").length,
    negative: normalizedData.filter((s) => s === "negative").length,
  };

  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [
          sentimentCounts.positive,
          sentimentCounts.neutral,
          sentimentCounts.negative,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderColor: ["#388E3C", "#FFA000", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mb-6 w-full h-96">
      {/* Sentiment Labels */}
      <div className="flex justify-center space-x-6 mb-4">
        <span className="text-green-600 font-medium">
          Positive: {sentimentCounts.positive}
        </span>
        <span className="text-yellow-600 font-medium">
          Neutral: {sentimentCounts.neutral}
        </span>
        <span className="text-red-600 font-medium">
          Negative: {sentimentCounts.negative}
        </span>
      </div>

      {/* Bar Chart */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SentimentDistribution;
