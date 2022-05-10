"use strict";

const gradChnange = document.querySelector(".svg__grad");
const rightPanel = document.querySelector(".right__panel");
const addNewBtn = document.querySelector(".add__new__btn");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const closeModelBtn = document.querySelector(".close__model");
const saveModelBtn = document.querySelector(".model__save");
const taskContainer = document.querySelector(".tasks__container");
const openedTask = document.querySelector(".opened__task");
const taskCompleteBtn = document.querySelector(".task__complete");

let count = 0;
let id = 0;
let currId = 0;

// Data

let tasks = [];

///// functions ////

const renderLeftNavTasks = function () {
  taskContainer.innerHTML = "";

  let html = ``;

  tasks.forEach((el) => {
    if (el.status === "completed") {
      html += ` <div class="task completed" data-id="${el.id}">${el.title}</div>`;
    } else {
      html += ` <div class="task" data-id="${el.id}">${el.title}</div>`;
    }
  });

  taskContainer.insertAdjacentHTML("afterbegin", html);
};

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

// toggel model
const toggelModel = function () {
  model.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const resetModelForm = function () {
  document.querySelector(".todo__title__inp").value = "";
  document.querySelector(".todo__detail__inp").value = "";
};

//////////// EVENT HANDLERS //////////

gradChnange.addEventListener("click", function () {
  count++;
  if (count > 5) {
    count = 0;
    rightPanel.classList.remove("grad__5");
  } else {
    // console.log(count);
    rightPanel.classList.remove(`grad__${count - 1}`);
    rightPanel.classList.add(`grad__${count}`);
  }
});

addNewBtn.addEventListener("click", toggelModel);

closeModelBtn.addEventListener("click", function () {
  toggelModel();
  resetModelForm();
});

saveModelBtn.addEventListener("click", function () {
  const title = document.querySelector(".todo__title__inp").value;
  const desc = document.querySelector(".todo__detail__inp").value;

  if (title === "") {
    alert("enter valid title");
    return;
  }

  tasks.push({
    id: id++,
    title: title,
    description: desc,
    status: "uncomplete",
  });

  // console.log(tasks);

  renderLeftNavTasks();

  toggelModel();
  resetModelForm();

  // console.log(tasks);
});

const renderOpenedTask = function (currTask) {
  const html = `
  <div class="ot__heading">Title</div>
  <div class="ot__text ot__title__text">${currTask.title}</div>
  <div class="ot__heading">Description</div>
  <div class="ot__text">${currTask.description}</div>`;

  openedTask.innerHTML = "";
  taskCompleteBtn.textContent = currTask.status;
  openedTask.insertAdjacentHTML("beforeend", html);
};

taskContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".task");
  // renderOpenedTask(clicked);
  if (!clicked) return;
  // console.log(clicked);
  // console.log(clicked.dataset.id);
  const currTask = tasks[clicked.dataset.id];
  // console.log(currTask);
  currId = currTask.id;

  if (!currTask) return;

  renderOpenedTask(currTask);
});

taskCompleteBtn.addEventListener("click", function () {
  const currTask = tasks[currId];
  // console.log("currId = ", currId);
  // console.log(currTask);
  currTask.status === "uncomplete"
    ? (currTask.status = "completed")
    : (currTask.status = "uncomplete");

  taskCompleteBtn.textContent = currTask.status;
});
