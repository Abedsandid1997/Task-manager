import { TaskBadge } from "@/components";
import Skeleton from "@/components/Skeleton";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import TaskEditDescription from "./_idComponents/TaskEditDescription";

const loading = () => {
  return (
    <Card>
      <Grid columns={{ sm: "5", initial: "1" }} gap="5">
        <Box className="md:col-span-4">
          <>
            <Flex gap="2" direction="column">
              <Flex gap="2" direction={{ initial: "column", sm: "row" }}>
                <Card>
                  <Skeleton width="8rem" />
                </Card>
                <Card>
                  <Flex gap="2">
                    <Text className="font-bold">Priority:</Text>
                    <Skeleton width="4rem" />
                  </Flex>
                </Card>
                <Card>
                  <Flex gap="2">
                    <Text className="font-bold">Status:</Text>
                    <Skeleton width="4rem" />
                  </Flex>
                </Card>
              </Flex>
              <Box>
                <Card>
                  <Flex gap="2">
                    <Text className="font-bold">Created At:</Text>
                    <Skeleton width="20rem" />
                  </Flex>
                </Card>
              </Box>
              <Box>
                <Card>
                  <Flex gap="2">
                    <Text className="font-bold">Last update:</Text>
                    <Skeleton width="20rem" />
                  </Flex>
                </Card>
              </Box>
            </Flex>
            <Box>
              <Card mt="2">
                <Flex justify="between">
                  <Heading size="3">Description:</Heading>
                  <Skeleton width="2rem" height="2rem" />
                </Flex>
                <Card className="prose max-w-full" mt="3">
                  <Skeleton width="20rem" />
                </Card>
              </Card>
            </Box>
          </>
        </Box>
      </Grid>
    </Card>
  );
};

export default loading;
