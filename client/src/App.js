import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal, getPosts } from "./actions";
import { ADD_POST, UPDATE_POST, DELETE_POST } from "./actions/types";
import RootModal from "./modals/RootModal";

import Loading from "./Loading";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { modalType, modalProps } = this.props.modal;
    const { showModal } = this.props;
    const { posts, loading } = this.props.post;

    return (
      <div className="container">
        <nav class="navbar navbar-light bg-light mt-4">
          <a class="navbar-brand" href="#">
            React-redux-modal
          </a>
          <button
            onClick={() => showModal(ADD_POST, {})}
            className="btn btn-primary text-light"
          >
            Insert Post
          </button>
        </nav>

        {loading && <Loading />}
        {!loading && (
          <div>
            {!posts || posts.length == 0 ? (
              <h1 className="text-center">No Post Found</h1>
            ) : (
              <div class="table-responsive">
                <table class="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Post</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(({ name, post, _id }) => (
                      <tr key={_id}>
                        <td>{name}</td>
                        <td>{post}</td>
                        <td>
                          <button
                            onClick={() =>
                              showModal(UPDATE_POST, {
                                postId: _id,
                                name
                              })
                            }
                            className={` btn btn-success mr-4`}
                          >
                            edit
                          </button>
                          <button
                            onClick={() =>
                              showModal(DELETE_POST, {
                                postId: _id,
                                name
                              })
                            }
                            className={`btn btn-danger`}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <RootModal modalType={modalType} modalProps={modalProps} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  modal: state.modal,
  post: state.post
});
export default connect(
  mapStateToProps,
  { showModal, getPosts }
)(App);
