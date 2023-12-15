import { Block } from "../../utils/block";
import template from "./img-button.pug";

type ImgButtonPropsType = {
  imgSrc: string;
  alt: string;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
  events?: {
    click: (event?: MouseEvent) => void;
  };
};

export class ImgButton extends Block {
  constructor(props: ImgButtonPropsType) {
    super(
      {
        tagName: "div",
      },
      {
        ...props,
        events: {
          click: props.onClick,
        },
      }
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
