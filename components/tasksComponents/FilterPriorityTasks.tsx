"use client";
import { Priority } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const prioritys: { label: string; value: Priority }[] = [
  { label: "High", value: "HIGH" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
];

const FilterPriorityTasks = ({ role }: { role: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      value={searchParams.get("priority") || undefined}
      onValueChange={(priority) => {
        const params = new URLSearchParams();
        if (priority) params.append("priority", priority.toString());
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!.toString());
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!.toString());
        const query = params.size ? "?" + params : " ";
        router.push(`/${role}/tasks/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Priority" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Priority</Select.Label>
          <Select.Item value="All">All</Select.Item>
          {prioritys.map((priority) => (
            <Select.Item key={priority.value} value={priority.value}>
              {priority.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterPriorityTasks;
