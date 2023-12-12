import { Block } from "../../utils/block";
import template from "./auth.pug";
import { signinInputs } from "./constants";

export class AuthPage extends Block {
  constructor() {
    super({
      tagName: "div",
    });
  }

  init(): void {
    this.children.signinInputs = signinInputs;
  }

  render() {
    return this.compile(template, this.props);
  }
}
