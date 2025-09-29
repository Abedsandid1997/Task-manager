import { TableLinks, TaskBadge } from "@/components/index";
import { Priority, Status, Task } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Card, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const columns: { label: string; value: string; className?: string }[] = [
  { label: "Title", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Priority",
    value: "priority",
    className: "hidden md:table-cell",
  },
  {
    label: "Created at",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export interface TaskQuery {
  orderBy: keyof Task;
  status: Status;
  priority: Priority;
  page: string;
}

interface Props {
  tasks: Task[];
  searchParams: TaskQuery;
}

const TasksTable = async ({ tasks, searchParams }: Props) => {
  return (
    <Card>
      <Table.Root size="3" variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                  className="font-bold"
                >
                  {column.label}
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.RowHeaderCell p="5" className="text-xl">
                <TableLinks href={`/admin/tasks/${task.id}`}>
                  {task.title}
                </TableLinks>{" "}
                <div className="block mt-2 md:hidden">
                  {" "}
                  <strong className="font-bold">Status: </strong>
                  <TaskBadge value={task.status} />
                </div>
                <div className="block mt-2 md:hidden">
                  {" "}
                  <strong className="font-extrabold">Priority: </strong>
                  <TaskBadge value={task.priority} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell" p="5">
                <TaskBadge value={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell" p="5">
                <TaskBadge value={task.priority} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell" p="5">
                {task.createdAt.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default TasksTable;
