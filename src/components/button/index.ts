import { ButtonTag, ButtonType } from "../../constants";
import { Block } from "../../utils/block";
import template from "./button.pug";

type ButtonProps = {
  type: ButtonType;
  name: string;
  tag?: ButtonTag;
  className?: string;
  display?: string;
  onClick?: (event?: MouseEvent) => void;
  events?: {
    click: (event?: MouseEvent) => void;
  };
};

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(
      {
        tagName: "div",
        className: props.tag === ButtonTag.link ? "buttonContainer" : "",
        display: props.display,
      },
      {
        tag: ButtonTag.button,
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
