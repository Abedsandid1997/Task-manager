import { TaskBadge } from "@/components/index";
import { Task } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import TaskEditDescription from "./TaskEditDescription";

const TaskDetail = async ({ task }: { task: Task }) => {
  return (
    <>
      <Flex gap="2" direction="column">
        <Flex gap="2" direction={{ initial: "column", sm: "row" }}>
          <Card>
            <Heading>{task.title}</Heading>
          </Card>
          <Card>
            <Flex gap="2">
              <Text className="font-bold">Priority:</Text>
              <TaskBadge value={task.priority} />
            </Flex>
          </Card>
          <Card>
            <Flex gap="2">
              <Text className="font-bold">Status:</Text>
              <TaskBadge value={task.status} />
            </Flex>
          </Card>
        </Flex>
        <Box>
          <Card>
            <Flex gap="2">
              <Text className="font-bold">Created At:</Text>
              <Text>{task.createdAt.toString()}</Text>
            </Flex>
          </Card>
        </Box>
        <Box>
          <Card>
            <Flex gap="2">
              <Text className="font-bold">Last update:</Text>
              <Text>{task.updatedAt.toString()}</Text>
            </Flex>
          </Card>
        </Box>
      </Flex>
      <TaskEditDescription description={task.description!} id={task.id} />
    </>
  );
};

export default TaskDetail;
