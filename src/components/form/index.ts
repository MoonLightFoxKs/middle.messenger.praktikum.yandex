import { ButtonType } from '../../constants';
import { Block } from '../../utils/block';
import { validateInput } from '../../utils/validate-input';
import { Button } from '../button';
import { Input } from '../input';

import template from './form.pug';

type FormProps = {
  buttonProps: {
    type: ButtonType;
    name: string;
    className?: string;
    callback?: () => void;
  };
  name?: string;
  inputs?: Input[];
  className?: string;
  display?: string;
};

type DataForm = {
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
