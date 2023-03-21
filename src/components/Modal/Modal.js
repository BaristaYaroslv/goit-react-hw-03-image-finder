import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal');

class Modal extends Component {
  static propTypes = {
    modalInfo: PropTypes.exact({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),

    handlerOnCloseModal: PropTypes.func,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlerKeyDownESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlerKeyDownESC);
  }

  handlerOnClickModal = e => {
    if (e.currentTarget !== e.target) return;
    this.props.handlerOnCloseModal();
  };

  handlerKeyDownESC = e => {
    if (e.key !== 'Escape') return;
    this.props.handlerOnCloseModal();
  };

  render() {
    const { src, alt } = this.props.modalInfo;
    return createPortal(
      <Overlay  onClick={this.handlerOnClickModal}>
        <ModalWindow>
          <img src={src} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
