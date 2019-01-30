import { addPost, hideModal } from "../actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import ModalWrapper from "./ModalWrapper";
class AddPostModal extends Component {
  state = {
    author: "",
    post: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { author, post } = this.state;
    const newPost = {
      name: author,
      post
    };
    this.props.addPost(newPost).then(res => this.props.hideModal());
  };
  render() {
    const { hideModal } = this.props;
    return (
      <ModalWrapper Header="Add new Post" onClose={hideModal}>
        <div>
          <form onSubmit={this.onSubmit}>
            <label>Author name:</label>
            <input type="text" name="author" onChange={this.onChange} />
            <br />
            <label>Post:</label>
            <input type="text" name="post" onChange={this.onChange} />
            <br />
            <button>submit</button>
          </form>
        </div>
      </ModalWrapper>
    );
  }
}

export default connect(
  null,
  { addPost, hideModal }
)(AddPostModal);
