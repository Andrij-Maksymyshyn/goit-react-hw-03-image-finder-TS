import  { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

interface IProps {
  onClose: (largeImageURL?: string, tags?: string) => void,
  children?: React.ReactNode,
};

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

class Modal extends Component <IProps>{
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    };
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalBox>{this.props.children}</ModalBox>
      </Overlay>,
      modalRoot,
    );
  };
};

export default Modal;

