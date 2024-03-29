import { ButtonType } from '../../constants.ts';
import Block from '../../utils/block.ts';
import { validateInput } from '../../utils/validate-input.ts';
import { Button } from '../button/index.ts';
import { Input } from '../input/index.ts';

import template from './form.pug';

type FormProps = {
  buttonProps: {
    type: ButtonType;
    name: string;
    className?: string;
    callback?: (data?: DataForm) => void;
  };
  name?: string;
  inputs?: Input[];
  className?: string;
  display?: string;
};

export type DataForm = {
  [index: string]: string;
};

export class Form extends Block {
  constructor(props: FormProps) {
    super(
      { tagName: 'form', display: props.display },
      {
        ...props,
      },
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
          ?.querySelectorAll('span.inputContainer')
          .forEach((el) => {
            isSuccess = validateInput(el).verify;

            const input = el.querySelector('input');
            data[`${input!.name}`] = input!.value;
          });

        if (isSuccess) {
          console.log(data);
          if (this.props.buttonProps.callback) {
            this.props.buttonProps.callback(data);
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
