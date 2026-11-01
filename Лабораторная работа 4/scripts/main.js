function randomComponent() {
  const color = Math.round(255 * Math.random());
  return color.toString(16).padStart(2, "0");
}

function createTable() {
  const tbody = document.querySelector("#colors tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 10; j++) {
      const r = randomComponent();
      const g = randomComponent();
      const b = randomComponent();
      const color = r + g + b;
      const cell = document.createElement("td");
      cell.setAttribute("bgcolor", "#" + color);
      cell.textContent = color;
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }
}

document.getElementById("generate").addEventListener("click", createTable);
createTable();
