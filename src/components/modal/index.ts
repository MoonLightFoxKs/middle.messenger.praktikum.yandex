import Block from '../../utils/block';
import { ImgButton } from '../img-button';
import template from './modal.pug';

type ModalProps = {
  name: string;
  content: Block[];
  close?: () => void;
  className?: string;
};

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(
      {
        tagName: 'div',
        className: 'modal',
      },
      {
        ...props,
      },
    );
  }

  init(): void {
    this.children.closeButton = new ImgButton({
      imgSrc: '/img/close.svg',
      alt: 'close modal',
      onClick: this.props.close,
      className: 'closeButton',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
