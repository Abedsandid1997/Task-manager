import { Badge } from "@radix-ui/themes";
import React from "react";

const statuses: Record<
  string,
  { label: string; color: "red" | "green" | "violet" | "orange" | "yellow" }
> = {
  DONE: { label: "Done", color: "green" },
  IN_PROGRESS: { label: "In_progress", color: "violet" },
  TODO: { label: "Todo", color: "red" },
  HIGH: { label: "High", color: "red" },
  MEDIUM: { label: "Medium", color: "orange" },
  LOW: { label: "Low", color: "yellow" },
};

const TaskBadge = ({ value }: { value: string }) => {
  return (
    <Badge size="3" color={statuses[value].color}>
      {statuses[value].label}
    </Badge>
  );
};

export default TaskBadge;
