import { Block } from "../../utils/block";
import template from "./auth.pug";

export class AuthPage extends Block {
  constructor() {
    super({
      tagName: "div",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
