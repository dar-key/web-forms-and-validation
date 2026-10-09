const form = document.getElementById("register");
const done = document.getElementById("done");
const textFields = form.querySelectorAll(
  "input:not([type=radio]):not([type=checkbox]), select",
);
const genderError = document.getElementById("genderError");

const password = document.getElementById("password");
const confirmPw = document.getElementById("confirm");
const pwError = document.getElementById("pwError");
const confirmError = document.getElementById("confirmError");
const emailError = document.getElementById("emailError");

function checkPassword() {
  const value = password.value;
  let msg = "";

  if (!value) msg = "Password is required.";
  else if (value.length < 8) msg = "Use at least 8 characters.";
  else if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
    msg = "Include at least one letter and one number.";

  password.setCustomValidity(msg);
  pwError.textContent = msg;
}

function checkConfirm() {
  let msg = "";

  if (!confirmPw.value) msg = "Please repeat your password.";
  else if (confirmPw.value !== password.value) msg = "Passwords do not match.";

  confirmPw.setCustomValidity(msg);
  confirmError.textContent = msg;
}

function checkEmail() {
  const email = document.getElementById("email");
  emailError.textContent = email.validity.valueMissing
    ? "Email is required."
    : "Please enter a valid email, like name@example.com.";
}

function mark(field) {
  if (field === password) checkPassword();
  if (field === password || field === confirmPw) checkConfirm();
  if (field.id === "email") checkEmail();

  if (field === password && confirmPw.value) mark(confirmPw);

  const ok = field.checkValidity();
  field.classList.toggle("is-valid", ok);
  field.classList.toggle("is-invalid", !ok);
}

function checkGender() {
  const chosen = form.querySelector("input[name=gender]:checked");
  genderError.hidden = Boolean(chosen);
  return Boolean(chosen);
}

textFields.forEach((field) => {
  field.addEventListener("blur", () => mark(field));
  field.addEventListener("input", () => {
    if (
      field.classList.contains("is-valid") ||
      field.classList.contains("is-invalid")
    )
      mark(field);
  });
});

form.querySelectorAll("input[name=gender]").forEach((r) => {
  r.addEventListener("change", checkGender);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  textFields.forEach(mark);
  const genderOk = checkGender();

  if (form.checkValidity() && genderOk) {
    done.classList.remove("d-none");
    form.reset();
    clearMarks();
    setTimeout(() => done.classList.add("d-none"), 4000);
  } else {
    done.classList.add("d-none");
  }
});

function clearMarks() {
  textFields.forEach((f) => f.classList.remove("is-valid", "is-invalid"));
  genderError.hidden = true;
}

form.addEventListener("reset", () => {
  setTimeout(clearMarks, 0);
  done.classList.add("d-none");
});
