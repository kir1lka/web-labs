"use strict";

const reservationForm = document.getElementById("reservation-form");
const departure = document.getElementById("departure");
const fullName = document.getElementById("full-name");
const phone = document.getElementById("phone");
const reservationResult = document.getElementById("reservation-result");
const summary = document.getElementById("reservation-summary");

function setMinimumDate() {
  const now = new Date();
  departure.min = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")].join("-");
}
setMinimumDate();

reservationForm.addEventListener("input", () => {
  fullName.setCustomValidity(fullName.value.trim() ? "" : "Введите ФИО, используя не только пробелы.");
  phone.setCustomValidity(phone.value.replace(/\D/g, "").length >= 7 ? "" : "Введите не менее семи цифр телефона.");
  reservationResult.hidden = true;
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setMinimumDate();
  if (!reservationForm.reportValidity()) return;
  const data = new FormData(reservationForm);
  const flight = document.getElementById("flight");
  summary.textContent = [
    "Пассажир: " + data.get("fullName").trim(),
    "Почта: " + data.get("email"),
    "Телефон: " + data.get("phone"),
    "Рейс: " + flight.options[flight.selectedIndex].text,
    "Дата: " + data.get("departure").split("-").reverse().join("."),
    "Билетов: " + data.get("tickets"),
    "Класс: " + data.get("travelClass"),
    "Услуги: " + (data.getAll("services").join(", ") || "не выбраны"),
    "Пожелания: " + (data.get("comment").trim() || "нет")
  ].join("\n");
  reservationResult.hidden = false;
});

reservationForm.addEventListener("reset", () => {
  fullName.setCustomValidity("");
  phone.setCustomValidity("");
  reservationResult.hidden = true;
  summary.textContent = "";
});
