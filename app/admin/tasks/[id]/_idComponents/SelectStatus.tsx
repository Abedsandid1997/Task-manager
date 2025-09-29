"use client";
import { AlertDialogs, TaskBadge } from "@/components/index";
import { Status } from "@prisma/client";
import { Card, Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const statuses: { value: Status }[] = [
  { value: "TODO" },
  { value: "IN_PROGRESS" },
  { value: "DONE" },
];

const SelectStatus = ({ status, id }: { status: Status; id: string }) => {
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const updateStatus = async (newStatus: Status) => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/task/${id}`, { status: newStatus });
      setIsSubmitting(false);
      router.refresh();
    } catch (_error) {
      setError(true);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Select.Root value={status} onValueChange={updateStatus}>
        <Select.Trigger disabled={isSubmitting} />
        <Select.Content color="gray" variant="soft">
          <Select.Group>
            <Card>
              <Select.Label>Status</Select.Label>
            </Card>
            <Card>
              {statuses.map((status) => (
                <Select.Item key={status.value} value={status.value}>
                  <TaskBadge value={status.value} />
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

export default SelectStatus;
