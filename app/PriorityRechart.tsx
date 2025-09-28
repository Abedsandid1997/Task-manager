"use client";
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from "recharts";
interface Props {
  high: number;
  medium: number;
  low: number;
}

const PriorityRechart = ({ high, medium, low }: Props) => {
  const data = [
    { name: "HIGH", priority: high, fill: "red" },
    { name: "MEDIUM", priority: medium, fill: "orange" },
    { name: "LOW", priority: low, fill: "yellow" },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="priority"
          nameKey="name"
          fill="#8884d8"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PriorityRechart;
