import { TaskBadge } from "@/components";
import { Card, Flex, Link, Text } from "@radix-ui/themes";
import React from "react";
import { prisma } from "@/lib/prisma";
import PriorityRechart from "./PriorityRechart";
import { Priority } from "@prisma/client";

const PrioritesSummery = async () => {
  const high = await prisma.task.count({ where: { priority: "HIGH" } });
  const medium = await prisma.task.count({ where: { priority: "MEDIUM" } });
  const low = await prisma.task.count({
    where: { priority: "LOW" },
  });
  const priorites: { label: string; value: number; priority: Priority }[] = [
    { label: "High", value: high, priority: "HIGH" },
    { label: "Medium", value: medium, priority: "MEDIUM" },
    { label: "Low", value: low, priority: "LOW" },
  ];
  return (
    <Card className="space-y-1">
      <Flex gap="5" justify="center">
        {priorites.map((p) => (
          <Card key={p.priority}>
            <Flex gap="2" align="center" direction="column">
              <Link href={`/tasks/list?priority=${p.priority}`}>
                <TaskBadge value={p.priority} />
              </Link>
              <Text>{p.value}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
      <PriorityRechart low={low} high={high} medium={medium} />
    </Card>
  );
};

export default PrioritesSummery;
