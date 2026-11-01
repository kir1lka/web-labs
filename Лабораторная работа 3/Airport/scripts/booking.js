// Учебное бронирование без отправки данных на сервер.
const form = document.getElementById("booking-form");
const date = document.getElementById("date");
const result = document.getElementById("booking-result");

// Не разрешаем выбирать прошедшую дату.
const today = new Date();
date.min = today.getFullYear() + "-" +
  String(today.getMonth() + 1).padStart(2, "0") + "-" +
  String(today.getDate()).padStart(2, "0");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const flight = document.getElementById("flight");
  const quantity = Number(document.getElementById("quantity").value);
  const passenger = document.getElementById("passenger").value.trim();

  if (!passenger) {
    result.textContent = "Укажите ФИО, используя не только пробелы.";
    result.hidden = false;
    return;
  }

  const total = Number(flight.value) * quantity;
  const departure = date.value.split("-").reverse().join(".");
  result.textContent = "Учебное бронирование оформлено. Пассажир: " +
    passenger + ". Рейс " + flight.options[flight.selectedIndex].text +
    ". Дата вылета: " + departure + ". Билетов: " + quantity +
    ". Общая стоимость: " + total + " ₽.";
  result.hidden = false;
});
