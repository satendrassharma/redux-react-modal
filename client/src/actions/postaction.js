import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_LOADING,
  POST_ERROR
} from "./types";
import axios from "axios";

export const getPost = postId => dispatch => {
  dispatch(setPostLoading());
  return axios
    .get(`/api/post/${postId}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(e => dispatch({ type: GET_POST, payload: null }));
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  return axios
    .get("/api/post/all")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(e => dispatch({ type: GET_POSTS, payload: null }));
};

export const addPost = data => dispatch => {
  return axios
    .post("/api/post/", data)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(e => dispatch({ type: POST_ERROR, payload: e.response.data }));
};

export const deletePost = postId => dispatch => {
  return axios
    .delete(`/api/post/${postId}`)
    .then(res => dispatch({ type: DELETE_POST, payload: postId }))
    .catch(e => dispatch({ type: POST_ERROR, payload: e.response.data }));
};

export const updatePost = (postId, data) => dispatch => {
  return axios
    .post(`/api/post/update/${postId}`, data)
    .then(res =>
      dispatch({
        type: UPDATE_POST,
        payload: {
          id: postId,
          data: res.data
        }
      })
    )
    .catch(e => dispatch({ type: POST_ERROR, payload: e.response.data }));
};

const setPostLoading = () => ({
  type: POST_LOADING
});
