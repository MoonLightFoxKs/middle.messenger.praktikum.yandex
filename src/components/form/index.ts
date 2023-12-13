import { ButtonType } from "../../constants";
import { Block } from "../../utils/block";
import { validateInput } from "../../utils/validate-input";
import { Button } from "../button";
import { Input } from "../input";

import template from "./form.pug";

type FormPropsType = {
  buttonProps: {
    type: ButtonType;
    name: string;
    className?: string;
    callback?: () => void;
  };
  name?: string;
  inputs?: Input[];
  className?: string;
};

type DataForm = {
  [index: string]: string;
};

export class Form extends Block {
  constructor(props: FormPropsType) {
    super(
      { tagName: "form" },
      {
        ...props,
      }
    );
  }

  init() {
    this.children.button = new Button({
      ...this.props.buttonProps,
      onClick: (event: MouseEvent) => {
        event.preventDefault();
        const data: DataForm = {};
        let isSuccess = true;
        this.getContent()
          ?.querySelectorAll("span.inputContainer")
          .forEach((el) => {
            isSuccess = validateInput(el).verify;

            const input = el.querySelector("input");
            data[`${input!.name}`] = input!.value;
          });

        console.log(this.getContent());

        if (isSuccess) {
          console.log(data);
          if (this.props.buttonProps.callback) {
            this.props.buttonProps.callback();
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
