import { gql } from "@apollo/client";

export const CREATE_TWEET_MUTATION = gql`
    mutation createTweet ($tweet: TweetInsertInput!) {
         insertOneTweet (data: $tweet) {
             _id
         }
}`
