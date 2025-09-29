import { TaskBadge } from "@/components";
import Pagination from "@/components/Pagination";
import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

const Users = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  const page = parseInt(searchParams?.page || "1", 10);
  // const page = parseInt(params.page) || 1;
  const pageSize = 10;
  const users = await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      _count: {
        select: {
          tasks: true,
        },
      },

      tasks: {
        select: {
          status: true,
        },
      },
    },
  });
  const usersCount = await prisma.user.count();
  if (!users) notFound();
  const usersWithStatusCount = users.map((user) => {
    const statusCount = {
      done: 0,
      todo: 0,
      inProgress: 0,
    };
    user.tasks.forEach((task) => {
      if (task.status === "DONE") statusCount.done++;
      if (task.status === "TODO") statusCount.todo++;
      if (task.status === "IN_PROGRESS") statusCount.inProgress++;
    });
    return {
      ...user,
      statusCount,
    };
  });
  const statuses = ["TODO", "IN_PROGRESS", "DONE"];
  return (
    <Flex
      justify="center"
      className="w-full min-h-screen items-start overflow-y-auto"
    >
      <Card className="w-full max-w-[45rem] p-5">
        <Flex justify="center" mb="2">
          <Card>
            <Heading>Users</Heading>
          </Card>
        </Flex>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row align={"center"}>
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="center">
                Total tasks
              </Table.ColumnHeaderCell>
              {statuses.map((status) => (
                <Table.ColumnHeaderCell
                  key={status}
                  className="hidden md:table-cell"
                  justify="center"
                >
                  <TaskBadge value={status} />
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {usersWithStatusCount.map((user) => (
              <Table.Row key={user.id} className="text-xl" align={"center"}>
                <Table.Cell>
                  <Flex gap="3" align="center">
                    <Avatar
                      src={user.image!}
                      fallback={user.name![0].toUpperCase() ?? "?"}
                      radius="full"
                      size="2"
                    />
                    {user.name}
                  </Flex>
                </Table.Cell>
                <Table.Cell justify="center">{user._count.tasks}</Table.Cell>
                <Table.Cell justify="center" className="hidden md:table-cell">
                  {user.statusCount.todo}
                </Table.Cell>
                <Table.Cell justify="center" className="hidden md:table-cell">
                  {user.statusCount.inProgress}
                </Table.Cell>
                <Table.Cell justify="center" className="hidden md:table-cell">
                  {user.statusCount.done}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex justify="center" mt="5">
          <Pagination
            currentPage={page}
            totalItems={usersCount}
            pageItems={pageSize}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default Users;
