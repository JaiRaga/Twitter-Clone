import {
  GET_TWEETS,
  CLEAR_TWEET,
  CLEAR_TWEETS,
  POST_TWEET,
  DELETE_TWEET,
  UPDATE_LIKES,
  RETWEET,
  UPDATE_COMMENTS,
  POST_COMMENT,
  GET_MY_TWEETS,
  GET_MY_RETWEETS,
  GET_MY_LIKES
} from "../actions/types";

const initialState = {
  tweet: null,
  tweets: [],
  retweets: [],
  likes: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TWEETS:
    case GET_MY_TWEETS:
      return {
        ...state,
        tweets: payload,
        loading: false
      };

    // case GET_MY_TWEETS:
    //   return {
    //     ...state,
    //     userTweets: [...payload],
    //     loading: false
    //   };
    case GET_MY_RETWEETS:
      return {
        ...state,
        retweets: payload,
        loading: false
      };

    case GET_MY_LIKES:
      return {
        ...state,
        likes: payload,
        loading: false
      };

    case POST_TWEET:
      return {
        ...state,
        tweets: [payload, ...state.tweets],
        loading: false
      };

    case DELETE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((tweet) => tweet._id !== payload),
        loading: false
      };

    case CLEAR_TWEET:
      return {
        ...state,
        tweet: null,
        loading: true
      };

    case CLEAR_TWEETS:
      return {
        ...state,
        tweets: [],
        loading: true
      };

    case UPDATE_LIKES:
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet._id === payload.tweetId
            ? { ...tweet, likes: [...payload.likes] }
            : tweet
        ),
        loading: false
      };

    case RETWEET:
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet._id === payload.id
            ? { ...tweet, retweets: [...payload.retweets] }
            : tweet
        ),
        loading: false
      };

    case UPDATE_COMMENTS:
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet._id === payload.id
            ? { ...tweet, comments: [...payload.comments] }
            : tweet
        ),
        loading: false
      };

    // case POST_COMMENT:
    //   return {
    //     ...state,
    //     tweets: state.tweets.map((tweet) =>
    //       tweet._id === payload.id
    //         ? { ...tweet, comments: [...payload.comment] }
    //         : tweet
    //     ),
    //     loading: false
    //   };

    default:
      return state;
  }
};
