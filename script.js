const btn = document.querySelector(".btn");
const radioSmallElement = document.querySelector(".radio-error-message");
const checkboxSmallElement = document.querySelector(".checkbox-error-message");
const inputFields = document.querySelectorAll(".input__field");
const radioFieldBtns = document.querySelectorAll("[type=radio]");
const checkboxField = document.querySelector("[type=checkbox]");
const successModal = document.querySelector(".modal");

btn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let formIsValid = true;

  inputFields.forEach((inputField) => {
    if (inputField.type === "text" && inputField.value.trim() === "") {
      displayErrorMessage(inputField, "This field is required");
      formIsValid = false;
    } else if (inputField.type === "email" && !isValidEmail(inputField)) {
      displayErrorMessage(inputField, "Please enter a valid email address");
      formIsValid = false;
    } else if (
      inputField.classList.contains("contact-form__textarea") &&
      inputField.value.trim() === ""
    ) {
      displayErrorMessage(inputField, "This field is required");
      formIsValid = false;
    } else {
      removeErrorMessage(inputField);
    }
  });

  const isAnyChecked = Array.from(radioFieldBtns).some(
    (radio) => radio.checked
  );

  if (!isAnyChecked) {
    radioErrorMessage(radioSmallElement, `Please select a query type`);
    formIsValid = false;
  } else {
    removeRadioErrorMessage(radioSmallElement);
  }

  if (checkboxField.checked === false) {
    radioErrorMessage(
      checkboxSmallElement,
      "To submit this form, please consent to being contacted"
    );
    formIsValid = false;
  } else {
    removeRadioErrorMessage(checkboxSmallElement);
  }

  if (formIsValid) {
    displaySuccessModal();
  }
}

function isValidEmail(inputs) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputValue = inputs.value.trim();
  return emailRegex.test(inputValue);
}

function displayErrorMessage(inputs, message) {
  inputs.nextElementSibling.innerText = message;
  inputs.style = "border: 1px solid red";
}

function removeErrorMessage(inputs) {
  inputs.nextElementSibling.classList += " error-message-hidden";
  inputs.removeAttribute("style");
}

function radioErrorMessage(radioSmallElement, message) {
  radioSmallElement.innerText = message;
}

function removeRadioErrorMessage(radioSmallElement) {
  radioSmallElement.classList += " error-message-hidden";
  radioSmallElement.innerText = "";
}

function displaySuccessModal() {
  successModal.classList += " modal-display";
  resetInputs();
}

function resetInputs() {
  inputFields.forEach((inputField) => {
    inputField.value = "";
    inputField.nextElementSibling.classList.remove("error-message-hidden");
    inputField.nextElementSibling.innerText = "";
  });

  radioFieldBtns.forEach((radioFieldBtn) =>
    radioFieldBtn.checked === true ? (radioFieldBtn.checked = false) : ""
  );

  checkboxField.checked = false;
  radioSmallElement.classList.remove("error-message-hidden");
  checkboxSmallElement.classList.remove("error-message-hidden");

  // successModal.classList.remove("modal-display");
  setTimeout(() => {
    successModal.classList.remove("modal-display");
  }, 1000);
}
