import { ButtonType, InputType } from "../../constants";
import { Block } from "../../utils/block";
import { Button } from "../button";
import { Input } from "../input";
import template from "./chat.pug";

type ChatProps = {
  name: string;
  messages?: string[];
};

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(
      { tagName: "div", className: "chatContainer" },
      {
        messages: new Array(""),
        ...props,
      }
    );
  }

  init() {
    this.children.messageInput = new Input({
      type: InputType.text,
      name: "message",
      placeholder: "Сообщение",
    });

    this.children.send = new Button({
      type: ButtonType.submit,
      name: "➜",
      onClick: (event: MouseEvent | undefined) => {
        event?.preventDefault();
        if (
          !Array.isArray(this.children.messageInput) &&
          this.children.messageInput
        ) {
          const el = this.children.messageInput.getContent();
          const value = el!.querySelector("input")!.value;

          let messages = this.props.messages;
          if (Array.isArray(messages)) {
            messages.push(value);
          } else {
            messages = [value];
          }

          if (!Array.isArray(this.children.messages))
            this.setProps({
              messages: messages,
            });

          this.children.messageInput.setProps({
            value: "",
          });

          el?.querySelector("input")?.focus();

          console.log({ message: value });
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
