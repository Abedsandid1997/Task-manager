import React from "react";
import DeleteButton from "./DeleteButton";
import { Flex } from "@radix-ui/themes";
import AssigenToUser from "./AssigenToUser";
import { Task } from "@prisma/client";
import SelectStatus from "./SelectStatus";
import SelectPriority from "./SelectPriority";
import { auth } from "@/auth";

const TaskActions = async ({ task }: { task: Task }) => {
  const session = await auth();
  return (
    <Flex gap="3" direction="column">
      <SelectStatus status={task.status} id={task.id} />
      {session?.user?.role === "ADMIN" && (
        <>
          <SelectPriority priority={task.priority} id={task.id} />
          <AssigenToUser task={task} />
          <DeleteButton id={task.id} />
        </>
      )}
    </Flex>
  );
};

export default TaskActions;
