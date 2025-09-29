import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import TaskCard from "./_components/TaskCard";
import TasksActions from "@/components/tasksComponents/TasksActions";
import { Priority, Status } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  searchParams: { status: Status; priority: Priority };
}) => {
  const params = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  const prioritys = Object.values(Priority);
  const priority = prioritys.includes(params.priority)
    ? params.priority
    : undefined;
  const session = await auth();
  const user = session?.user?.id;
  const tasks = await prisma.task.findMany({
    where: { userId: user, status, priority },
  });
  return (
    <>
      <Box mb="4">
        <TasksActions role="user" />
      </Box>

      <Grid columns={{ initial: "1", md: "3" }} gap={"3"}>
        {tasks.map((task) => (
          <Flex key={task.id} justify="center">
            <TaskCard
              task={task}
              userName={session!.user!.name!}
              userImage={session!.user!.image!}
            />
          </Flex>
        ))}
      </Grid>
    </>
  );
};

export default page;
