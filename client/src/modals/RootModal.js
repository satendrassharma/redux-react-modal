//create modal latter
import { DeletePostModal, AddPostModal, UpdatePostModal } from "./index";
import React from "react";
import { connect } from "react-redux";

const MODAL_COMPONENTS = {
  DELETE_POST: DeletePostModal,
  ADD_POST: AddPostModal,
  UPDATE_POST: UpdatePostModal
  /* other modals */
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

const mapStateToProps = state => ({
  state: state.modal
});

export default connect(mapStateToProps)(ModalRoot);
