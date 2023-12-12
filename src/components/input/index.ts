import { Block } from "../../utils/block";
import template from "./input.pug";

type InputType = {
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  className?: string;
  events?: { focus: (e: Event) => void; blur: (e: Event) => void };
};

class Input extends Block {
  constructor(props: InputType) {
    super({ tagName: "span", className: "inputContainer" }, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
