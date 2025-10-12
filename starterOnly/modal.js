
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


// FORM VALIDATION 


// Fonction de validation des données du formulaire
function validateFormData(form) {
  // Récupérer la valeur du prénom
  const firstInput = form.querySelector('input[name="first"]');
  const firstValue = firstInput.value.trim();
  const firstFormData = firstInput.closest('.formData');
  // Réinitialiser l'état d'erreur
  firstFormData.removeAttribute('data-error');
  firstFormData.removeAttribute('data-error-visible');
  firstInput.removeAttribute('data-error');

  // Vérification du prénom
  if (firstValue.length < 2) {
    const errorMsg = 'Le prénom doit contenir au moins 2 caractères.';
    firstFormData.setAttribute('data-error', errorMsg);
    firstFormData.setAttribute('data-error-visible', 'true');
    firstInput.setAttribute('data-error', errorMsg);
    firstInput.focus();
    return false;
  }
  return true;
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