import { gql } from "@apollo/client";

export const FETCH_TWEETS = gql`
    query fetchTweets {
        tweets (sortBy: _ID_DESC, limit: 20) {
            _id
            author {
                username
                fullname
            }
            content
            createdAt
        }
    }
`
