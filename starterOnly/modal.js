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


