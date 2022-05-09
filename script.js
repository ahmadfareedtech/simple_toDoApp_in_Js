"use strict";

const gradChnange = document.querySelector(".svg__grad");
const rightPanel = document.querySelector(".right__panel");
const addNewBtn = document.querySelector(".add__new__btn");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const closeModelBtn = document.querySelector(".close__model");
const saveModelBtn = document.querySelector(".model__save");
const taskContainer = document.querySelector(".tasks__container");

let count = 0;

// Data

let tasks = [];

///// functions ////

const openModel = function () {
  document.querySelector(".todo__title__inp").value = "";
  document.querySelector(".todo__detail__inp").value = "";
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModel = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

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

addNewBtn.addEventListener("click", openModel);

closeModelBtn.addEventListener("click", closeModel);

saveModelBtn.addEventListener("click", function () {
  const title = document.querySelector(".todo__title__inp").value;
  const desc = document.querySelector(".todo__detail__inp").value;

  if (title === "") {
    alert("enter valid title");
    return;
  }

  tasks.push({
    title: title,
    description: desc,
  });

  const html = `<div class="task">${title}</div>`;

  taskContainer.insertAdjacentHTML("afterbegin", html);

  closeModel();

  console.log(tasks);
});
