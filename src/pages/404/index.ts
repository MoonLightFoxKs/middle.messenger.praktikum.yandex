import { ErrorPage } from "../../components/error";
import { Block } from "../../utils/block";
import template from "./404.pug";

export class Error404 extends Block {
  constructor() {
    super({
      tagName: "div",
    });
  }

  init(): void {
    this.children.errorPage = new ErrorPage({
      imgName: "404",
      text: "А вы странички продаете? Нет, даже не показываем Красивое",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
