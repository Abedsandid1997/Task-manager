import React from "react";
import LatestTasks from "./LatestTasks";

import StatusesSummery from "./StatusesSummery";
import PrioritesSummery from "./PrioritesSummery";
import { Container, Flex, Grid } from "@radix-ui/themes";
import TopUsers from "./TopUsers";

const Home = () => {
  return (
    <Container>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex gap="3" direction="column">
          <LatestTasks />
          <TopUsers />
        </Flex>
        <Flex gap="3" direction="column">
          <PrioritesSummery />
          <StatusesSummery />
        </Flex>
      </Grid>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default Home;
