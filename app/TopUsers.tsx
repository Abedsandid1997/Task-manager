import React from "react";
import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { TaskBadge } from "@/components";

const TopUsers = async () => {
  const users = await prisma.user.findMany({
    take: 3,
    where: {
      tasks: {
        some: {
          status: "DONE",
        },
      },
    },
    orderBy: {
      tasks: {
        _count: "desc",
      },
    },
    select: {
      name: true,
      id: true,
      image: true,
      _count: {
        select: {
          tasks: {
            where: {
              status: "DONE",
            },
          },
        },
      },
    },
  });
  return (
    <Card>
      <Flex justify="center" mb="2">
        <Card>
          <Heading>Top Users</Heading>
        </Card>
      </Flex>
      <Table.Root variant="surface">
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} className="text-xl">
              <Table.Cell>
                <Flex align="center" justify="between">
                  <Flex gap="2" align="center">
                    <Avatar
                      src={user.image!}
                      fallback={user.name![0].toUpperCase() ?? "?"}
                      radius="full"
                      size="2"
                    />{" "}
                    {user.name} - {user._count.tasks} tasks{" "}
                  </Flex>
                  <TaskBadge value="DONE" />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default TopUsers;
