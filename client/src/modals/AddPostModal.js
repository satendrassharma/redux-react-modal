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
            <div class="form-group">
              <label for="exampleInputEmail1">Author name:</label>
              <input name="author" onChange={this.onChange} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter author name"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Post:</label>
              <input type="text" name="post" onChange={this.onChange} class="form-control" id="exampleInputPassword1" placeholder="Enter the post" />
            </div>
           
            <button type="submit" class="btn btn-primary">Submit</button>
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
