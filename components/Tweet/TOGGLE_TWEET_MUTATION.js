import {gql} from "@apollo/client";

export const TOGGLE_TWEET_MUTATION = gql`
    mutation toggleTweetLike ($like: Boolean, $tweetId: String!) {
        toggleTweetLike (input: {
            like: $like,
            tweetId: $tweetId
        })
    }
    `
