import {Grid, Box, Container, Flex, Heading} from "@chakra-ui/react";

// COMPONENTS
import Sidebar from "../components/Sidebar";
import Tweet from "../components/Tweet";
import NewTweet from "../features/NewTweet";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Auth/Banner";
import {useQuery} from "@apollo/client";
import Timeline from "../features/Timeline";
import {FETCH_TWEETS} from "../features/Timeline/FETCH_TWEETS";
import {useState} from "react";

export default function Home() {
  const { data, loading, error, updateQuery } = useQuery(FETCH_TWEETS);

  return (
    <>
      <Container maxW={"container.xl"}>
        <Grid
            gridTemplateColumns={"25% 50% 25%"}
            w={"100%"}
            h={'100vh'}
        >
          <Box padding={"1rem"}>
            <Sidebar />
          </Box>
          <Box
              borderLeft={'1px solid'}
              borderRight={'1px solid'}
              borderColor={'gray.600'}
              h={'100%'}
              overflowY={'scroll'}
          >
            <Flex flexDirection={'column'} padding={'1rem'}>
                <Heading size={'md'}>Home</Heading>
                <NewTweet updateTweets={updateQuery} />
            </Flex>
           <Timeline data={data} loading={loading} />
          </Box>
          <Box padding={"1rem"}>
            <SearchBar />
          </Box>
        </Grid>
        <Banner />

      </Container>
    </>
  );
}
