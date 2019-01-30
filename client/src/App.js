import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal, getPosts } from "./actions";
import { ADD_POST, UPDATE_POST, DELETE_POST } from "./actions/types";
import RootModal from "./modals/RootModal";

import "./App.css";
import inserted from "./styles/insert.css";
import updated from "./styles/update.module.css";
import deleted from "./styles/delete.module.css";

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { modalType, modalProps } = this.props.modal;
    const { showModal } = this.props;
    const { posts, loading } = this.props.post;
    if (loading) {
      return <div>loading</div>;
    } else if (!loading && (posts === null || posts.length === 0)) {
      return <div>no post found</div>;
    } else {
      return (
        <div className="App">
          <button onClick={() => showModal(ADD_POST, {})} className="btn color">
            insert post
          </button>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Author</th>
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
                          showModal(UPDATE_POST, { postId: _id, name })
                        }
                        className={`${updated["color"]} btn`}
                      >
                        edit
                      </button>
                      <button
                        onClick={() =>
                          showModal(DELETE_POST, { postId: _id, name })
                        }
                        className={`${deleted["color"]} btn`}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RootModal modalType={modalType} modalProps={modalProps} />
        </div>
      );
    }
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
