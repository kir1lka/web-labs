"use strict";

const registrationForm = document.getElementById("registration-form");
const resultBox = document.getElementById("form-result");

const emailPattern = new RegExp("^[\\.\\-_A-Za-z0-9]+?@[\\.\\-A-Za-z0-9]+?\\.[A-Za-z0-9]{2,6}$");
const phonePattern = new RegExp("^(?:\\+7|8)[\\s\\-]?(?:(?:\\(\\d{3}\\)|\\d{3})[\\s\\-]?\\d{3}|(?:\\(\\d{4}\\)|\\d{4})[\\s\\-]?\\d{2})[\\s\\-]?\\d{2}[\\s\\-]?\\d{2}$");

function CheckData() {
  const uname = document.getElementById("uname").value.trim();
  const organization = document.getElementById("organization").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const errors = [];

  if (uname.length === 0) {
    errors.push("Заполните обязательное поле «Имя».");
  }
  if (email.length === 0) {
    errors.push("Заполните обязательное поле «Адрес эл.почты».");
  } else {
    const validEMail = emailPattern.test(email);
    if (!validEMail) {
      errors.push("Некорректный адрес эл.почты. Пример: ivanov@example.ru.");
    }
  }

  if (phone.length > 0) {
    const validPhone = phonePattern.test(phone);
    if (!validPhone) {
      errors.push("Некорректный номер телефона. Пример: +7 (900) 123-45-67 или 8-900-123-45-67.");
    }
  }

  if (errors.length > 0) {
    resultBox.className = "result error";
    resultBox.textContent = "Ошибка проверки данных:\n" + errors.join("\n");
    return false;
  }

  const ans = confirm("Вы уверены, что хотите отправить введенные данные ?");
  if (!ans) {
    resultBox.className = "result";
    resultBox.textContent = "Отправка данных отменена пользователем.";
    return false;
  }

  resultBox.className = "result";
  resultBox.textContent = [
    "Проверка пройдена. Данные формы подтверждены:",
    "Имя: " + uname,
    "Организация (компания): " + (organization || "не указана"),
    "Телефон: " + (phone || "не указан"),
    "Адрес эл.почты: " + email
  ].join("\n");
  return true;
}

registrationForm.addEventListener("input", () => {
  resultBox.className = "result";
  resultBox.textContent = "";
});

registrationForm.addEventListener("reset", () => {
  resultBox.className = "result";
  resultBox.textContent = "";
});
