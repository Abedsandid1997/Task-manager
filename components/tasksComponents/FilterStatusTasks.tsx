"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value: Status }[] = [
  { label: "Todo", value: "TODO" },
  { label: "IN-progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

const FilterStatusTasks = ({role}: { role: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      value={searchParams.get("status") || undefined}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status.toString());
        if (searchParams.get("priority"))
          params.append("priority", searchParams.get("priority")!.toString());
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!.toString());
        const query = params.size ? "?" + params : " ";
        router.push(`/${role}/tasks/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Status" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          <Select.Item value="All">All</Select.Item>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterStatusTasks;
