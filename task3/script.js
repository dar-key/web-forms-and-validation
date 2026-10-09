const form = document.getElementById("contact");
const fields = form.querySelectorAll("input, textarea");
const done = document.getElementById("done");
const emailError = document.getElementById("emailError");

function mark(field) {
  if (field.id === "email") {
    emailError.textContent = field.validity.valueMissing
      ? "Email is required."
      : "Please enter a valid email, like name@example.com.";
  }

  const ok = field.checkValidity();
  field.classList.toggle("is-valid", ok);
  field.classList.toggle("is-invalid", !ok);
}

fields.forEach((field) => {
  field.addEventListener("blur", () => mark(field));
  field.addEventListener("input", () => {
    if (
      field.classList.contains("is-valid") ||
      field.classList.contains("is-invalid")
    ) {
      mark(field);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fields.forEach(mark);

  if (form.checkValidity()) {
    done.classList.remove("d-none");
    form.reset();
    fields.forEach((f) => f.classList.remove("is-valid", "is-invalid"));
    setTimeout(() => done.classList.add("d-none"), 4000);
  }
});
