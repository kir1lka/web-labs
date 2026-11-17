"use strict";

// Все переменные алгоритмов имеют числовой тип. Текст выводится литералами.
function checkPoint() {
  const x = document.getElementById("x").valueAsNumber;
  const y = document.getElementById("y").valueAsNumber;
  const r = document.getElementById("radius").valueAsNumber;
  let quarter = 0;
  let location = 0; // 0: вне круга, 1: на границе, 2: внутри.

  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(r) || r <= 0) {
    document.getElementById("point-result").textContent = "Введите конечные числовые координаты и положительный радиус.";
    return;
  }
  if (x > 0 && y > 0) quarter = 1;
  else if (x < 0 && y > 0) quarter = 2;
  else if (x < 0 && y < 0) quarter = 3;
  else if (x > 0 && y < 0) quarter = 4;

  // hypot не переполняется при возведении больших координат в квадрат.
  if (Math.hypot(x, y) < r) location = 2;
  else if (Math.hypot(x, y) === r) location = 1;

  document.getElementById("point-result").textContent =
    (quarter === 0 ? "Точка лежит на оси координат или в начале координат. " : "Четверть: " + quarter + ". ") +
    (location === 2 ? "Точка внутри круга. " : location === 1 ? "Точка на границе круга. " : "Точка вне круга. ") +
    ((quarter === 1 || quarter === 3) && location === 2 ? "Условие выполнено." : "Условие не выполнено.");
}

function checkPower() {
  const n = document.getElementById("number").valueAsNumber;
  let remainder = n;
  let exponent = 0;
  if (!Number.isSafeInteger(n) || n < 1) {
    document.getElementById("power-result").textContent = "Введите положительное целое число в допустимом диапазоне.";
    return;
  }
  // Последовательно делим на 3, пока деление выполняется без остатка.
  while (remainder > 1 && remainder % 3 === 0) {
    remainder /= 3;
    exponent++;
  }
  if (remainder === 1) {
    document.getElementById("power-result").textContent = "Да: " + n + " = 3 в степени " + exponent + ".";
  } else {
    document.getElementById("power-result").textContent = "Нет: " + n + " не является степенью числа 3.";
  }
}
