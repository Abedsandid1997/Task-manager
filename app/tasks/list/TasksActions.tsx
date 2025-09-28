import { Flex } from "@radix-ui/themes";
import React from "react";
import FilterPriorityTasks from "./_listCopmponents/FilterPriorityTasks";
import FilterStatusTasks from "./_listCopmponents/FilterStatusTasks";
import AddButton from "./_listCopmponents/AddButton";

const TasksActions = () => {
  return (
    <Flex justify="between">
      <Flex gapX="3">
        <FilterStatusTasks />
        <FilterPriorityTasks />
      </Flex>
      <AddButton />
    </Flex>
  );
};

export default TasksActions;
