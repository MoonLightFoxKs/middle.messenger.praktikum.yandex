type validateRulesType = Record<
  string,
  { pattern: RegExp; errorMessage: string }
>;

const validateRules: validateRulesType = {
  login: {
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    errorMessage: "Некорректный логин",
  },
  email: {
    pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
    errorMessage: "Некорректный email",
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Некорректный пароль",
  },
  first_name: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    errorMessage: "Некорректное имя",
  },
  second_name: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    errorMessage: "Некорректная фамилия",
  },
  phone: {
    pattern: /^[+-d]?\d{10,15}$/,
    errorMessage: "Некорректный номер телефона",
  },
  message: {
    pattern: /(.|\s)*\S(.|\s)*/,
    errorMessage: "Некорректно",
  },
};

const validateData = (inputName: string, inputValue: string) => {
  const result: {
    verify: boolean;
    message: string;
  } = {
    verify: true,
    message: "",
  };
  if (!validateRules.hasOwnProperty(inputName)) {
    result.verify = true;
    result.message = "";
    return result;
  }
  const pattern = validateRules[inputName].pattern;
  if (!pattern.test(inputValue)) {
    result.verify = false;
    result.message = validateRules[inputName].errorMessage;
  }

  return result;
};

export const validateInput = (el: Element) => {
  const input = el.querySelector("input");
  const span = el.querySelector("span");
  const resultValidation = validateData(input!.name, input!.value);
  if (input && span) {
    if (!resultValidation.verify) {
      span.innerHTML = resultValidation.message;
      el.classList.add("error");
    } else {
      span.innerHTML = "";
      el.classList.remove("error");
    }
  }
  return resultValidation;
};
