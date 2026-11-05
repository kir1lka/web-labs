"use strict";
const cylinderForm = document.getElementById("cylinder-form");
const radiusInput = document.getElementById("radius");
const heightInput = document.getElementById("height");
const volumeOutput = document.getElementById("volume");
const calculationStatus = document.getElementById("calculation-status");
const calculateLink = document.getElementById("calculate");

function readPositiveNumber(input) {
  const text = input.value.trim().replace(",", ".");
  const value = Number(text);
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text) || !Number.isFinite(value) || value <= 0) {
    throw new Error("Введите положительное число в поле «" + (input === radiusInput ? "Радиус" : "Высота") + "».");
  }
  return value;
}

function calculateVolume() {
  volumeOutput.value = "";
  try {
    const radius = readPositiveNumber(radiusInput);
    const height = readPositiveNumber(heightInput);
    const volume = Math.PI * Math.pow(radius, 2) * height;
    if (!Number.isFinite(volume) || volume <= 0) throw new Error("Размеры слишком велики или малы для расчёта. Измените значения.");
    volumeOutput.value = volume.toLocaleString("ru-RU", { maximumSignificantDigits: 10 });
    calculationStatus.textContent = "Расчёт выполнен: V = π × " + radius + "² × " + height + " см³.";
    calculationStatus.style.color = "#315d20";
  } catch (error) {
    calculationStatus.textContent = error.message;
    calculationStatus.style.color = "#a32424";
  }
}

calculateLink.addEventListener("mouseout", (event) => {
  if (!calculateLink.contains(event.relatedTarget)) calculateVolume();
});
calculateLink.addEventListener("blur", calculateVolume);
calculateLink.addEventListener("click", (event) => event.preventDefault());
cylinderForm.addEventListener("submit", (event) => event.preventDefault());
cylinderForm.addEventListener("input", () => { volumeOutput.value = ""; calculationStatus.textContent = ""; });
cylinderForm.addEventListener("reset", () => { volumeOutput.value = ""; calculationStatus.textContent = ""; });
