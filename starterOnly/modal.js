
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
  modalbg.style.display = "flex";
}

// CLOSE MODAL
function closeModal() {
  modalbg.style.display = "none";
  const form = document.querySelector('form[name="reserve"]');
  const modalBody = document.querySelector('.modal-body');
  // Clear confirmation message and reset form
  if (modalBody) {
    const conf = modalBody.querySelector('.form-confirmation');
    if (conf) {
      conf.style.display = 'none';
    }
    if (form) {
      form.style.display = '';
    }
    modalBody.style.minHeight = '';
  }
  if (form) {
    form.reset();
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => setFieldError(input, null));
  }
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
    setFieldError(firstInput, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    firstInput.focus();
    isValid = false;
  }

  // Last Name
  const lastInput = form.querySelector('input[name="last"]');
  const lastValue = lastInput.value.trim();
  setFieldError(lastInput, null);
  if (lastValue.length < 2) {
    setFieldError(lastInput, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
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

  // Birthdate
  const birthInput = form.querySelector('input[name="birthdate"]');
  const birthValue = birthInput.value.trim();
  setFieldError(birthInput, null);
  if (birthValue === '') {
    setFieldError(birthInput, 'Vous devez entrer votre date de naissance.');
    if (isValid) birthInput.focus();
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
    setFieldError(locationInputs[0], 'Vous devez choisir une option.');
    if (isValid) locationInputs[0].focus();
    isValid = false;
  }

  // Using conditions (mandatory checkbox)
  const cguInput = form.querySelector('input#checkbox1');
  setFieldError(cguInput, null);
  if (!cguInput.checked) {
    setFieldError(cguInput, 'Vous devez vérifier que vous acceptez les termes et conditions.');
    if (isValid) cguInput.focus();
    isValid = false;
  }

  return isValid;
}


// Form submission handler
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[name="reserve"]');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Avoid default submission to prevent navigation
      e.preventDefault();
      if (!validateFormData(form)) {
        return;
      }
      // Show confirmation in the modal without closing the page
      showConfirmation(form);
    });
  }
});

// Show a confirmation message in the center of the modal
function showConfirmation(form) {
  // Lock modal-body height so modal doesn't shrink when we hide the form
  const modalBody = document.querySelector('.modal-body');
  const bodyRect = modalBody.getBoundingClientRect();
  modalBody.style.minHeight = `${bodyRect.height}px`;

  // Clear form fields
  try { form.reset(); } catch (err) { /* ignore */ }

  // Hide the form entirely
  form.style.display = 'none';
  form.height = modalBody.style.height;

  // Create or reuse confirmation container inside modal-body
  let conf = modalBody.querySelector('.form-confirmation');
  if (!conf) {
    conf = document.createElement('div');
    conf.className = 'form-confirmation';
    modalBody.appendChild(conf);
  }

  // Build confirmation content (message + button)
  conf.innerHTML = '';
  const msg = document.createElement('div');
  msg.className = 'form-confirmation-message';
  msg.textContent = "Merci pour votre inscription";
  conf.appendChild(msg);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'button form-confirmation-close';
  closeBtn.textContent = 'Fermer';
  conf.appendChild(closeBtn);

  conf.style.display = 'flex';

  // Close handler: hide confirmation, show form and close modal
  closeBtn.addEventListener('click', function () {
    conf.style.display = 'none';
    form.style.display = '';
    // Clear the locked minHeight and then close
    modalBody.style.minHeight = '';
    closeModal();
  });
}