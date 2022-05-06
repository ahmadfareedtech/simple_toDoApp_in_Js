"use strict";

const gradChnange = document.querySelector(".svg__grad");
const rightPanel = document.querySelector(".right__panel");
const addNewBtn = document.querySelector(".add__new__btn");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const closeModel = document.querySelector(".close__model");

let count = 0;

//////////// EVENT HANDLERS //////////

gradChnange.addEventListener("click", function () {
  count++;
  if (count > 5) {
    count = 0;
    rightPanel.classList.remove("grad__5");
  } else {
    console.log(count);
    rightPanel.classList.remove(`grad__${count - 1}`);
    rightPanel.classList.add(`grad__${count}`);
  }
});

addNewBtn.addEventListener("click", function () {
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModel.addEventListener("click", function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
});
