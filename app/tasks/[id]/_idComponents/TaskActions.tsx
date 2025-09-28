import React from "react";
import DeleteButton from "./DeleteButton";
import { Flex } from "@radix-ui/themes";
import AssigenToUser from "./AssigenToUser";
import { Task } from "@prisma/client";
import SelectStatus from "./SelectStatus";
import SelectPriority from "./SelectPriority";

const TaskActions = ({ task }: { task: Task }) => {
  return (
    <Flex gap="3" direction="column">
      <AssigenToUser task={task} />
      <SelectStatus status={task.status} id={task.id} />
      <SelectPriority priority={task.priority} id={task.id} />
      <DeleteButton id={task.id} />
    </Flex>
  );
};

export default TaskActions;
