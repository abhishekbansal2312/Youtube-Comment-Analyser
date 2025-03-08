import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Comment {
  postedAt: string;
}

interface MonthlyContributionChartProps {
  comments: Comment[];
}

const MonthlyContributionChart: React.FC<MonthlyContributionChartProps> = ({
  comments,
}) => {
  console.log(comments, "comments in monthly");

  // Process comments to count occurrences per month
  const monthlyData: { [key: string]: number } = {};

  comments.forEach((comment) => {
    const date = new Date(comment.postedAt);
    const monthYear = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;

    if (monthlyData[monthYear]) {
      monthlyData[monthYear]++;
    } else {
      monthlyData[monthYear] = 1;
    }
  });

  // Convert data into an array suitable for Recharts
  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    count: monthlyData[month],
  }));

  return (
    <div className="p-6  rounded-lg ">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 20, bottom: 40 }}
        >
          <XAxis dataKey="month" angle={-30} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyContributionChart;
