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
          <form onSubmit={this.onSubmit}>
            <label>Author name:</label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.onChange}
            />
            <br />
            <label>Post:</label>
            <input
              type="text"
              name="post"
              value={this.state.post}
              onChange={this.onChange}
            />
            <br />
            <button>submit</button>
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
