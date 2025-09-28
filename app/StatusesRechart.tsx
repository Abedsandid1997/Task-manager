"use client";
import { Status } from "@prisma/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
interface Props {
  todo: number;
  inProgress: number;
  done: number;
}
const StatusesRechart = ({ todo, inProgress, done }: Props) => {
  const data: { name: Status; status: number }[] = [
    { name: "TODO", status: todo },
    { name: "IN_PROGRESS", status: inProgress },
    { name: "DONE", status: done },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar
          dataKey="status"
          style={{ fill: "var(--accent-9)" }}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusesRechart;
