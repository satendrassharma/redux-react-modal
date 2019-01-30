import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_LOADING,
  POST_ERROR
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  error: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case UPDATE_POST:
      const Index = state.posts.findIndex(
        post => post._id === action.payload.id
      );
      let posts = [...state.posts];
      posts[Index] = action.payload.data;
      return {
        ...state,
        posts
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
