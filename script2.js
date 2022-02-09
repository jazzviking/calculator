`use strict`;

// Selectors
const display = document.querySelector(`.display`);
const equals = document.querySelector(`.equals`);
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const times = document.querySelector(".times");
const decimal = document.querySelector(`.decimal`);
const numCell = document.querySelectorAll(".num_cell");
const formatNumber = (num) =>
  new Intl.NumberFormat(navigator.locale, { maximumFractionDigits: 10 }).format(
    num
  );

// Logic variables
const numArr = [];
let num = "";
let storedNum = "0";

numCell.forEach((numCell) =>
  numCell.addEventListener("click", function () {
    num === "0" ? (num = numCell.textContent) : (num += numCell.textContent);
    display.textContent = num;
    console.log(num);
  })
);

document.addEventListener("keydown", function (e) {
  if (e.key >= 0 && e.key <= 9) {
    num === "0" ? (num = e.key) : (num += e.key);
    display.textContent = num;
    console.log(num);

    // fixme this is garbage logic
    /*     if (num[0] === "-" && num[1] === ".") {
      display.textContent = `0${num.slice(1)}`;
    } else if (num[0] === ".") {
      display.textContent = `0${num}`;
    } else if (num[num.length - 1] === "0") {
      display.textContent = `${formatNumber(Math.abs(num))}.0`;
    } else {
      display.textContent = formatNumber(Math.abs(num));
    } */
  }
});

// numberBtn(decimal);
decimal.addEventListener("click", function () {
  if (num === "" || num === "-" || num === "+" || num === "*" || num === "/") {
    display.textContent = "0.";
    num += "0.";
  } else if (num.includes(".")) {
  } else {
    num += ".";
    display.textContent = `${formatNumber(num)}.`;
  }
});

const calculate = function () {
  if (!num) return;
  console.log(`BEFORE CALC | num: ${num.length}, storedNum: ${storedNum}`);
  let answer;

  if (num === "+" || num === "-" || num === "*") return;
  if (num[0] === "-")
    answer = formatNumber(Number(storedNum) - Number(num.slice(1)));
  if (num[0] === "*")
    answer = formatNumber(Number(storedNum) * Number(num.slice(1)));
  if (num[0] === "+")
    answer = formatNumber(Number(storedNum) + Number(num.slice(1)));
  if (num[0] !== "+" && num[0] !== "-" && num[0] !== "*") answer = num;

  display.textContent = answer;
  storedNum = answer;
  num = "";
  console.log(
    `AFTER CALC | num: ${num}, storedNum: ${storedNum}, answer: ${answer}`
  );
};

// todo
// Plus button operations
plus.addEventListener("click", () => {
  if (!num) {
  } else if (num[0] !== "+" && storedNum === "0") {
    storedNum = num;
  } else if (num === "+") {
    return;
  } else {
    calculate();
  }
  num = "+";
});

// Minus button operations
minus.addEventListener("click", () => {
  if (!num) {
  } else if (num[0] !== "-" && storedNum === "0") {
    storedNum = num;
  } else if (num === "-") {
    return;
  } else {
    calculate();
  }
  num = "-";
});

// Multiplication button operations
times.addEventListener("click", () => {
  if (!num) {
  } else if (num[0] !== "*" && storedNum === "0") {
    storedNum = num;
    console.log(`storedNum = ${num}`);
  } else if (num === "*") {
    return;
  } else {
    calculate();
  }
  num = "*";
});

// Equals
equals.addEventListener(`click`, calculate);

document.addEventListener(`keydown`, function (e) {
  if (e.key === "Enter") {
    calculate();
  }
});

// Change bg color
document.querySelector(".change-bg").addEventListener("click", function () {
  document.body.style.backgroundColor = "darkorange";
});

// Reset to 0 (also clear bg color)
const clearCalc = () => {
  num = "";
  storedNum = "0";
  display.textContent = 0;
  numArr.length = 0;
  document.body.style.backgroundColor = "seashell";
};

document.querySelector(".clear").addEventListener("click", clearCalc);

document.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    clearCalc();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    num = num.slice(0, -1);
    display.textContent = formatNumber(Math.abs(num));
  }
});

// document.addEventListener("keydown", function (e) {
//   console.log(e.key);
// });

/* Note 

1. Add theme/color switcher
2. Highlight operator key in use 
2. Highlight buttons when typed

*/

// bug CHECK IF FIXED: Oscillating between operators sets stored num to undefined
// fixme CHECK IF FIXED: Pressing times operator then equals returns 0 (instead of previous storedNum)
// todo Work on decimal logic
// todo Work out formatting issues with decimals
// alert need to sort out the logic and make reuseable functions.
