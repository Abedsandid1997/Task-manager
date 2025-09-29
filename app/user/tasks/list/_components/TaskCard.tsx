import { TaskBadge } from "@/components";
import { Task } from "@prisma/client";
import { Card, Flex, Avatar, Text, Box } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const TaskCard = ({
  task,
  userImage,
  userName,
}: {
  task: Task;
  userImage: string;
  userName: string;
}) => {
  return (
    <>
      <Box width="500px" height="180px">
        <Card size="4">
          <Flex gap="3" align="center" justify="between">
            <Avatar
              size="4"
              src={userImage}
              radius="full"
              fallback={userName[0].toUpperCase() || "?"}
              color="indigo"
            />
            <Flex direction={"column"} gap="2">
              <Box>
                <Text
                  as="div"
                  size="4"
                  weight="bold"
                  className="hover:text-zinc-600"
                >
                  <Link href={`/user/tasks/${task.id}`}>{task.title}</Link>
                </Text>
              </Box>
              <Box>
                <Text as="div" size="4" weight="bold">
                  <TaskBadge value={task.status} />
                </Text>
              </Box>
              <Box>
                <Text as="div" size="4" weight="bold">
                  <TaskBadge value={task.priority} />
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default TaskCard;
