import { Flex } from "@radix-ui/themes";
import React from "react";
import TasksTable, {
  columnNames,
  TaskQuery,
} from "./_listCopmponents/TasksTable";
import { prisma } from "@/lib/prisma";
import { Priority, Status } from "@prisma/client";
import Pagination from "@/components/Pagination";
import TasksActions from "@/components/tasksComponents/TasksActions";

const Tasks = async ({ searchParams }: { searchParams: TaskQuery }) => {
  const params = await searchParams;
  const pageSize = 10;
  const page = parseInt(params.page) || 1;
  const statuses = ["TODO", "IN_PROGRESS", "DONE"];
  const prioritys = ["LOW", "MEDIUM", "HIGH"];
  const status = statuses.includes(params.status)
    ? (params.status as Status)
    : undefined;

  const priority = prioritys.includes(params.priority)
    ? (params.priority as Priority)
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
        {" "}
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
