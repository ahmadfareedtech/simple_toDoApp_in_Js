"use strict";

const gradChnange = document.querySelector(".svg__grad");
const rightPanel = document.querySelector(".right__panel");

let count = 0;

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
