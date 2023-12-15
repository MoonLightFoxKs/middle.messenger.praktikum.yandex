import { Block } from "../../utils/block";
import template from "./img-button.pug";

type ImgButtonProps = {
  imgSrc: string;
  alt: string;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
  events?: {
    click: (event?: MouseEvent) => void;
  };
};

export class ImgButton extends Block {
  constructor(props: ImgButtonProps) {
    super(
      {
        tagName: "div",
      },
      {
        ...props,
        events: {
          click: props.onClick,
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
