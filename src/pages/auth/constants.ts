import { Input } from "../../components/input";
import { InputType } from "../../constants";

export const signinInputs = [
  new Input({
    type: InputType.email,
    placeholder: "Почта",
    name: "email",
  }),
  new Input({
    type: InputType.text,
    placeholder: "Логин",
    name: "login",
  }),
  new Input({
    type: InputType.text,
    placeholder: "Имя",
    name: "first_name",
  }),
  new Input({
    type: InputType.text,
    placeholder: "Фамилия",
    name: "second_name",
  }),
  new Input({
    type: InputType.tel,
    placeholder: "Телефон",
    name: "phone",
  }),
  new Input({
    type: InputType.password,
    placeholder: "Пароль",
    name: "password",
  }),
  new Input({
    type: InputType.password,
    placeholder: "Пароль еще раз",
    name: "password",
  }),
];
