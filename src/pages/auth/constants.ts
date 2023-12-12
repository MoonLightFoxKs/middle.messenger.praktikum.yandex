import Input from "../../components/input";

export const signinInputs = [
  new Input({
    type: "email",
    placeholder: "Почта",
    name: "email",
  }),
  new Input({
    type: "text",
    placeholder: "Логин",
    name: "login",
  }),
  new Input({
    type: "text",
    placeholder: "Имя",
    name: "first_name",
  }),
  new Input({
    type: "text",
    placeholder: "Фамилия",
    name: "second_name",
  }),
  new Input({
    type: "text",
    placeholder: "Телефон",
    name: "phone",
  }),
  new Input({
    type: "text",
    placeholder: "Пароль",
    name: "password",
  }),
  new Input({
    type: "text",
    placeholder: "Пароль еще раз",
    name: "password",
  }),
];
