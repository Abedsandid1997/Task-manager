import TaskActions from "@/app/admin/tasks/[id]/_idComponents/TaskActions";
import TaskDetail from "@/components/tasksComponents/TaskDetail";
import { prisma } from "@/lib/prisma";
import { Card, Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) notFound();
  return (
    <Card>
      <Grid columns={{ sm: "5", initial: "1" }} gap="5">
        <Box className="md:col-span-4">
          <TaskDetail task={task} />{" "}
        </Box>
        <Box>
          <TaskActions task={task} />
        </Box>
      </Grid>
    </Card>
  );
};

export default page;
