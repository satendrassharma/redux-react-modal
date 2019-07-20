import { updatePost, hideModal, getPost } from "../actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import ModalWrapper from "./ModalWrapper";
class UpdatePostModal extends Component {
  state = {
    author: "",
    post: "",
    updated: false
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { author, post } = this.state;
    const updatedPost = {
      name: author,
      post
    };
    this.props
      .updatePost(this.props.postId, updatedPost)
      .then(res => this.props.hideModal());
  };
  componentDidMount() {
    this.props.getPost(this.props.postId);
  }
  componentDidUpdate(prevprops) {
    if (!this.state.updated) {
      this.setState({
        author: this.props.post.post.name,
        post: this.props.post.post.post,
        updated: true
      });
    }
  }

  render() {
    const { hideModal, name } = this.props;
    return (
      <ModalWrapper Header={`Update post ${name}`} onClose={hideModal}>
        <div>
          {" "}
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Author name:</label>
              <input
                name="author"
                onChange={this.onChange}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter author name"
                value={this.state.author}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Post:</label>
              <input
                type="text"
                name="post"
                onChange={this.onChange}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter the post"
                value={this.state.post}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { updatePost, hideModal, getPost }
)(UpdatePostModal);
