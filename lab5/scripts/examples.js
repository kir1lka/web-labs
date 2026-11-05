const exampleForm = document.getElementById("examples-form");
const exampleResult = document.getElementById("example-result");
function showExample() {
  if (!exampleForm.reportValidity()) return;
  const values = [];
  for (const [key, value] of new FormData(exampleForm)) {
    if (key === "password") values.push("password: [скрыто]");
    else values.push(key + ": " + (value instanceof File ? (value.name || "файл не выбран") : value));
  }
  exampleResult.textContent = values.join("\n");
  exampleResult.hidden = false;
}
exampleForm.addEventListener("submit", (event) => { event.preventDefault(); showExample(); });
document.getElementById("example-button").addEventListener("click", showExample);
exampleForm.addEventListener("reset", () => { exampleResult.hidden = true; exampleResult.textContent = ""; });
