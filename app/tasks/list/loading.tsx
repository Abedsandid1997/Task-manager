import { Flex, Card, Table } from "@radix-ui/themes";
import React from "react";
import AddButton from "./_listCopmponents/AddButton";
import FilterPriorityTasks from "./_listCopmponents/FilterPriorityTasks";
import FilterStatusTasks from "./_listCopmponents/FilterStatusTasks";
import Skeleton from "@/components/Skeleton";

const loading = () => {
  const columns = [1, 2, 3, 4, 5, 6];
  return (
    <Flex direction="column" gap="3">
      <Flex justify="between">
        <Flex gapX="3">
          <FilterStatusTasks />
          <FilterPriorityTasks />
        </Flex>
        <AddButton />
      </Flex>
      <Card>
        <Table.Root size="3" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {columns.map((column) => (
              <Table.Row key={column}>
                <Table.RowHeaderCell p="5" className="text-xl">
                  <Skeleton width="4rem" />
                  <div className="block mt-2 md:hidden">
                    {" "}
                    <strong className="font-bold">Status: </strong>
                    <Skeleton />
                  </div>
                  <div className="block mt-2 md:hidden">
                    {" "}
                    <strong className="font-extrabold">Priority: </strong>
                    <Skeleton />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell" p="5">
                  <Skeleton width="4rem" />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell" p="5">
                  <Skeleton width="4rem" />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell" p="5">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
};

export default loading;
