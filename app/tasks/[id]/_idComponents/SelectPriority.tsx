"use client";
import { AlertDialogs, TaskBadge } from "@/components/index";
import { Priority } from "@prisma/client";
import { Card, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const prioritys: { value: Priority }[] = [
  { value: "HIGH" },
  { value: "LOW" },
  { value: "MEDIUM" },
];

const SelectPriority = ({
  priority,
  id,
}: {
  priority: Priority;
  id: string;
}) => {
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const updatePriority = async (newPriority: Priority) => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/tsssask/${id}`, { priority: newPriority });
      router.refresh();
    } catch (error) {
      setError(true);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Select.Root value={priority} onValueChange={updatePriority}>
        <Select.Trigger disabled={isSubmitting} />
        <Select.Content color="gray" variant="soft">
          <Select.Group>
            <Card>
              <Select.Label>Status</Select.Label>
            </Card>
            <Card>
              {prioritys.map((priority) => (
                <Select.Item key={priority.value} value={priority.value}>
                  <TaskBadge value={priority.value} />
                </Select.Item>
              ))}
            </Card>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <AlertDialogs error={error} onClose={() => setError(false)} />
    </>
  );
};

export default SelectPriority;
