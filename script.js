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
const taskDescVal = document.getElementById("desc");
const taskNameVal = document.querySelector(".ot__title__text");

let count = 0;
let id = 0; // to assign different ids to tasks
let currId = 0; // has current tasks Id that is open in right panel

// Data

let tasks = []; // array to store objects of tasks

///// functions ////

// renders left navigation's tasks list
const renderLeftNavTasks = function () {
  taskContainer.innerHTML = ""; // clear the left nav

  let html = ``;

  tasks.forEach((el) => {
    html += ` <div class="task" data-id="${el.id}"> ${
      el.status == "completed" ? "✅" : ""
    } ${el.title}</div>`;
  });

  taskContainer.insertAdjacentHTML("afterbegin", html);
};

// toggel model
const toggelModel = function () {
  model.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// reset form data of model
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
  // to cpitalize first letter of the title
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const title = capitalize(document.querySelector(".todo__title__inp").value);
  const desc = document.querySelector(".todo__detail__inp").value;

  if (title === "" && title.length > 100) {
    alert("enter valid title, length should be > 1 and  < 100");
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

// show task that is clicked
const renderOpenedTask = function (currTask) {
  taskNameVal.textContent = currTask.title;
  taskDescVal.textContent = currTask.description;

  if (openedTask.classList.contains("hidden"))
    openedTask.classList.remove("hidden");
};

taskContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".task");

  if (!clicked) return;

  const currTask = tasks[clicked.dataset.id];

  currId = currTask.id;

  if (!currTask) return;

  renderOpenedTask(currTask);
});

// mark task as completed
taskCompleteBtn.addEventListener("click", function () {
  const currTask = tasks[currId];

  if (!currTask) return;

  currTask.status === "uncomplete"
    ? (currTask.status = "completed")
    : (currTask.status = "uncomplete");

  taskCompleteBtn.textContent = currTask.status;

  renderLeftNavTasks();
});
