import { Flex } from "@radix-ui/themes";
import React from "react";
import FilterStatusTasks from "./FilterStatusTasks";
import FilterPriorityTasks from "./FilterPriorityTasks";
import AddButton from "./AddButton";
import { auth } from "@/auth";

const TasksActions = async ({ role }: { role: string }) => {
  const session = await auth();
  return (
    <Flex justify="between">
      <Flex gapX="3">
        <FilterStatusTasks role={role} />
        <FilterPriorityTasks role={role} />
      </Flex>
      {session?.user?.role && role === "admin" && <AddButton />}
    </Flex>
  );
};

export default TasksActions;
