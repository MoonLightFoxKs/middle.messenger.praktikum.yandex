import { ButtonTag, ButtonType } from "../../constants";
import { Block } from "../../utils/block";
import template from "./button.pug";

type ButtonPropsType = {
  type: ButtonType;
  name: string;
  tag?: ButtonTag;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
  events?: {
    click: (event?: MouseEvent) => void;
  };
};

export class Button extends Block {
  constructor(props: ButtonPropsType) {
    super(
      {
        tagName: "div",
        className: props.tag === ButtonTag.link ? "buttonContainer" : "",
      },
      {
        tag: ButtonTag.button,
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
