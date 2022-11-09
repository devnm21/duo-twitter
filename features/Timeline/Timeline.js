import Tweet from "../../components/Tweet";
import {useQuery} from "@apollo/client";

import {FETCH_TWEETS} from "./FETCH_TWEETS";
import {Flex} from "@chakra-ui/react";

const Timeline = ({  data, loading }) => {
    if (loading)
        return <div>Loading...</div>;
    return(
        <Flex direction={'column'}>
            {
                data.tweets.length > 0 ?
                    data.tweets.map(tweet => <Tweet tweetBody={tweet.content} />)
                    : 'No Tweets Yet'
            }
        </Flex>
    )
}
export default Timeline
