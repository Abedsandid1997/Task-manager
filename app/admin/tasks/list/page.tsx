import { Flex } from "@radix-ui/themes";
import React from "react";
import TasksTable, {
  columnNames,
  TaskQuery,
} from "./_listCopmponents/TasksTable";
import { prisma } from "@/lib/prisma";
import { Priority, Status, Task } from "@prisma/client";
import Pagination from "@/components/Pagination";
import TasksActions from "@/components/tasksComponents/TasksActions";

interface PageProps {
  searchParams?: Record<string, string | string[]>;
}

const Tasks = async ({ searchParams }: PageProps) => {
  searchParams = await searchParams;
  const params: TaskQuery = {
    orderBy: (searchParams?.orderBy as keyof Task) || undefined,
    status: (searchParams?.status as Status) || undefined,
    priority: (searchParams?.priority as Priority) || undefined,
    page: (searchParams?.page as string) || "1",
  };
  const pageSize = 10;
  const page = parseInt(params.page) || 1;

  const statuses = Object.values(Status);
  const priorities = Object.values(Priority);

  const status = statuses.includes(params.status) ? params.status : undefined;
  const priority = priorities.includes(params.priority)
    ? params.priority
    : undefined;

  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const tasks = await prisma.task.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: { status, priority },
    orderBy,
  });

  const tasksCount = await prisma.task.count({
    where: { status, priority },
  });

  return (
    <Flex direction="column" gap="3">
      <TasksActions role="admin" />
      <TasksTable tasks={tasks} searchParams={params} />
      <Flex align="center" justify="center" mt="2">
        <Pagination
          currentPage={page}
          totalItems={tasksCount}
          pageItems={pageSize}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default Tasks;
