import { auth } from "@/auth";
import { TableLinks, TaskBadge } from "@/components";
import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import React from "react";

const LatestTasks = async () => {
  const session = await auth();
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedTo: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });

  return (
    <Card>
      <Flex justify="center" mb="2">
        <Card>
          <Heading>Latest tasks</Heading>
        </Card>
      </Flex>
      <Table.Root variant="surface">
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id} className="text-xl">
              <Table.Cell>
                <Flex justify="between" align="center" gap="3">
                  <Flex direction="column" gap="2">
                    {session?.user?.role === "ADMIN" ? (
                      <TableLinks href={`admin/tasks/${task.id}`}>
                        {task.title}
                      </TableLinks>
                    ) : (
                      <Text> {task.title}</Text>
                    )}
                    <TaskBadge value={task.status} />
                    <TaskBadge value={task.priority} />
                  </Flex>
                  {task.assignedTo ? (
                    <Avatar
                      src={task.assignedTo.image!}
                      fallback={task.assignedTo.name![0].toUpperCase() ?? "?"}
                      radius="full"
                    />
                  ) : (
                    ""
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTasks;
