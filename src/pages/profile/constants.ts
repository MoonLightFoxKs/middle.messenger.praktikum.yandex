import { InputType } from '../../constants.ts';

type InfoListProps = {
  label: string;
  type: InputType;
  name: string;
  text?: string;
};

export const infoList: InfoListProps[] = [
  {
    label: 'Почта',
    text: 'pochta@yandex.ru',
    type: InputType.email,
    name: 'email',
  },
  {
    label: 'Логин',
    text: 'lalallla',
    type: InputType.text,
    name: 'login',
  },
  {
    label: 'Имя',
    text: 'Ксения',
    type: InputType.text,
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    text: 'Котова',
    type: InputType.text,
    name: 'second_name',
  },
  {
    label: 'Имя в чате',
    text: 'Ксения Котова',
    type: InputType.text,
    name: 'display_name',
  },
  {
    label: 'Телефон',
    text: '89991234567',
    type: InputType.tel,
    name: 'phone',
  },
];

export const passwordList: InfoListProps[] = [
  {
    label: 'Старый пароль',
    type: InputType.password,
    name: 'oldPassword',
  },
  {
    label: 'Новый пароль',
    type: InputType.password,
    name: 'newPassword',
  },
  {
    label: 'Новый пароль еще раз',
    type: InputType.password,
    name: 'newPassword',
  },
];
