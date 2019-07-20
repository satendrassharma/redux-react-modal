import { deletePost, hideModal } from "../actions";

import React, { Component } from "react";
import { connect } from "react-redux";
import ModalWrapper from "./ModalWrapper";

class DeletePostModal extends Component {
  onDelete = postId => {
    this.props
      .deletePost(this.props.postId)
      .then(res => this.props.hideModal());
  };
  render() {
    const { name, hideModal } = this.props;
    return (
      <ModalWrapper Header={`Delete post ${name}`} onClose={hideModal}>
        <p>It will delete post permanently!!!</p>
        <button onClick={this.onDelete} className="btn btn-success">ok</button>
      </ModalWrapper>
    );
  }
}

export default connect(
  null,
  { deletePost, hideModal }
)(DeletePostModal);
