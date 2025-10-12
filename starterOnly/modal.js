
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
openModalBtn.forEach((btn) => btn.addEventListener("click", openModal));
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// OPEN MODAL
function openModal() {
  modalbg.style.display = "block";
}

// CLOSE MODAL
function closeModal() {
  modalbg.style.display = "none";
}



/***** FORM VALIDATION *****/

// We use this function to show or reset an error message on a field
function setFieldError(input, message) {
  const formDataDiv = input.closest('.formData');
  if (message) {
    formDataDiv.setAttribute('data-error', message);
    formDataDiv.setAttribute('data-error-visible', 'true');
    input.setAttribute('data-error', message);
  } else {
    formDataDiv.removeAttribute('data-error');
    formDataDiv.removeAttribute('data-error-visible');
    input.removeAttribute('data-error');
  }
}

// FUNCTION TO VALIDATE FORM DATA
function validateFormData(form) {
  let isValid = true;

  // First Name
  const firstInput = form.querySelector('input[name="first"]');
  const firstValue = firstInput.value.trim();
  setFieldError(firstInput, null);
  if (firstValue.length < 2) {
    setFieldError(firstInput, 'Le prénom doit contenir au moins 2 caractères.');
    firstInput.focus();
    isValid = false;
  }

  // Last Name
  const lastInput = form.querySelector('input[name="last"]');
  const lastValue = lastInput.value.trim();
  setFieldError(lastInput, null);
  if (lastValue.length < 2) {
    setFieldError(lastInput, 'Le nom doit contenir au moins 2 caractères.');
    if (isValid) lastInput.focus();
    isValid = false;
  }

  // Email
  const emailInput = form.querySelector('input[name="email"]');
  const emailValue = emailInput.value.trim();
  setFieldError(emailInput, null);
  // REGEX for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    setFieldError(emailInput, 'Veuillez entrer une adresse email valide.');
    if (isValid) emailInput.focus();
    isValid = false;
  }

  // Competition number
  const quantityInput = form.querySelector('input[name="quantity"]');
  const quantityValue = quantityInput.value.trim();
  setFieldError(quantityInput, null);
  if (quantityValue === '' || isNaN(quantityValue) || !Number.isInteger(Number(quantityValue))) {
    setFieldError(quantityInput, 'Veuillez saisir un nombre entier de concours.');
    if (isValid) quantityInput.focus();
    isValid = false;
  }

  // Location (radio buttons)
  const locationInputs = form.querySelectorAll('input[name="location"]');
  let locationChecked = false;
  locationInputs.forEach(input => {
    if (input.checked) locationChecked = true;
    setFieldError(input, null); // reset all
  });
  if (!locationChecked) {
    setFieldError(locationInputs[0], 'Veuillez sélectionner un lieu.');
    if (isValid) locationInputs[0].focus();
    isValid = false;
  }

  return isValid;
}

// Gestionnaire de soumission du formulaire
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[name="reserve"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!validateFormData(form)) {
        e.preventDefault();
        return;
      }
      alert('Formulaire soumis !');
    });
  }
});