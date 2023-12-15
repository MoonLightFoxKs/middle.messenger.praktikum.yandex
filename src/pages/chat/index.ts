import { Button } from "../../components/button";
import { Chat } from "../../components/chat";
import { Input } from "../../components/input";
import { ButtonTag, ButtonType, InputType } from "../../constants";
import { Block } from "../../utils/block";
import { render } from "../../utils/render";
import template from "./chat.pug";
import { chatPreviewList } from "./constants";

type ChatPageProps = {
  isNoChat?: boolean;
};

export class ChatPage extends Block {
  constructor(props?: ChatPageProps) {
    super(
      {
        tagName: "div",
        className: "chatPage",
      },
      {
        isNoChat: true,
        ...props,
      }
    );
  }

  init(): void {
    this.children.profileButton = new Button({
      type: ButtonType.button,
      tag: ButtonTag.link,
      name: "Профиль",
      onClick: () => render("profile"),
    });

    this.children.search = new Input({
      type: InputType.text,
      placeholder: "поиск",
      name: "search",
      className: "searchInput",
    });

    this.children.chatPreviewList = chatPreviewList.map((el) => {
      el.setProps({
        events: {
          click: () => {
            this.children.chat = new Chat({
              name: el.element?.querySelector(".name")?.innerHTML!,
            });
            if (Array.isArray(this.children.chatPreviewList)) {
              this.children.chatPreviewList.forEach((elem) => {
                elem.getContent()?.classList.remove("active");
              });
            }
            el.getContent()?.classList.add("active");
            this.setProps({
              isNoChat: false,
            });
          },
        },
      });
      return el;
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
