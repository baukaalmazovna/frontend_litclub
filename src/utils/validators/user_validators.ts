// Проверка имени
export const validateFirstName = (firstName: string): string | null => {
  if (!firstName) return "Имя обязательно";

  if (firstName.length < 2) {
    return "Имя должно содержать минимум 2 символа";
  }

  const regex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!regex.test(firstName)) {
    return "Имя должно содержать только буквы";
  }

  return null;
};

// Проверка фамилии
export const validateLastName = (lastName: string): string | null => {
  if (!lastName) return "Фамилия обязательна";

  if (lastName.length < 2) {
    return "Фамилия должна содержать минимум 2 символа";
  }

  const regex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!regex.test(lastName)) {
    return "Фамилия должна содержать только буквы";
  }

  return null;
};

// Проверка email
export const validateEmail = (email: string): string | null => {
  if (!email) return "Email обязателен";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Некорректный email";

  return null;
};

// Проверка пароля
export const validatePassword = (password: string): string | null => {
  if (!password) return "Пароль обязателен";

  if (password.length < 6) {
    return "Пароль должен быть не менее 6 символов";
  }

  return null;
};

// Общая валидация формы логина
export const validateLogin = (email: string, password: string) => {
  return {
    emailError: validateEmail(email),
    passwordError: validatePassword(password),
  };
};
