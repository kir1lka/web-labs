"use strict";

const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const weekdays = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
function showDate() {
  const now = new Date();
  document.getElementById("today").textContent = "Сегодня – " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " года, " +
    [now.getHours(), now.getMinutes(), now.getSeconds()].map(value => String(value).padStart(2, "0")).join(":") + ", " + weekdays[now.getDay()] + ".";
}
showDate();
setInterval(showDate, 1000);

for (let i = 1; i <= 10; i++) {
  const label = document.createElement("label");
  label.textContent = "Число " + i;
  const input = document.createElement("input");
  input.id = "value-" + i;
  input.name = "value" + i;
  input.type = "text";
  input.inputMode = "decimal";
  input.required = true;
  input.autocomplete = "off";
  label.appendChild(input);
  document.getElementById("numbers-fields").appendChild(label);
}

function parseReal(value) {
  const text = String(value).trim().replace(",", ".");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text) || !Number.isFinite(Number(text))) {
    throw new Error("Каждое поле должно содержать конечное число.");
  }
  return Number(text);
}

document.getElementById("numbers-form").addEventListener("submit", event => {
  event.preventDefault();
  try {
    const numbers = Array.from(document.querySelectorAll("#numbers-fields input"), input => parseReal(input.value));
    const multiples = numbers.filter(number => number % 5 === 0);
    const sum = multiples.reduce((total, number) => total + number, 0);
    if (!Number.isFinite(sum)) throw new Error("Сумма выходит за допустимый числовой диапазон. Уменьшите значения.");
    document.getElementById("sum-result").textContent = "Сумма: " + sum + ".\nКратные 5: " + (multiples.length ? multiples.join("; ") : "не найдены") + ".";
  } catch (error) {
    document.getElementById("sum-result").textContent = error.message;
  }
});
document.getElementById("numbers-form").addEventListener("input", () => { document.getElementById("sum-result").textContent = ""; });
document.getElementById("numbers-form").addEventListener("reset", () => { document.getElementById("sum-result").textContent = ""; });

// Функция-конструктор определяет четыре свойства каждого экземпляра.
function Manager(fullName, department, experience, salary) {
  this.fullName = fullName;
  this.department = department;
  this.experience = experience;
  this.salary = salary;
}
Manager.prototype.getProfile = function () { return this.fullName + " (стаж: " + this.experience + " лет)"; };
Manager.prototype.annualIncome = function () { return this.salary * 12; };
Manager.prototype.calculateBonus = function (percent) { return this.salary * percent / 100; };

const managers = [
  new Manager("Иванов Алексей", "Продажи", 5, 70000),
  new Manager("Петрова Анна", "Маркетинг", 3, 65000),
  new Manager("Сидоров Павел", "Логистика", 7, 80000),
  new Manager("Смирнова Ольга", "Работа с клиентами", 4, 68000),
  new Manager("Кузнецов Игорь", "Закупки", 6, 75000),
  new Manager("Попова Мария", "Персонал", 2, 60000),
  new Manager("Волков Дмитрий", "Развитие", 8, 90000),
  new Manager("Соколова Елена", "Проекты", 5, 82000)
];
for (const manager of managers) {
  const row = document.createElement("tr");
  // Для каждого из восьми экземпляров вызываются все три метода.
  for (const value of [manager.getProfile(), manager.department, manager.salary.toLocaleString("ru-RU"), manager.annualIncome().toLocaleString("ru-RU"), manager.calculateBonus(10).toLocaleString("ru-RU")]) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  }
  document.getElementById("managers-body").appendChild(row);
}
