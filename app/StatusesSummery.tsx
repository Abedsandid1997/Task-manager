import { TaskBadge } from "@/components";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import StatusesRechart from "./StatusesRechart";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

const StatusesSummery = async () => {
  const done = await prisma.task.count({ where: { status: "DONE" } });
  const todo = await prisma.task.count({ where: { status: "TODO" } });
  const inProgress = await prisma.task.count({
    where: { status: "IN_PROGRESS" },
  });

  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Done", value: done, status: "DONE" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Todo", value: todo, status: "TODO" },
  ];
  return (
    <Card className="space-y-5">
      <Flex gap="5" justify="center">
        {statuses.map((s) => (
          <Card key={s.status}>
            <Flex gap="2" align="center" direction="column">
              <TaskBadge value={s.status} />
              <Text>{s.value}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>

      <StatusesRechart done={done} todo={todo} inProgress={inProgress} />
    </Card>
  );
};

export default StatusesSummery;
