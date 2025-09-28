import { prisma } from "@/lib/prisma";
import React from "react";
import { notFound } from "next/navigation";
import TaskDetail from "./_idComponents/TaskDetail";
import { Box, Card, Grid } from "@radix-ui/themes";
import TaskActions from "./_idComponents/TaskActions";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
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
        {session && (
          <Box>
            <TaskActions task={task} />
          </Box>
        )}
      </Grid>
    </Card>
  );
};

export default page;
