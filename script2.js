`use strict`;

const display = document.querySelector(`.display`);
const equals = document.querySelector(`.equals`);
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const decimal = document.querySelector(`.decimal`);
const numCell = document.querySelectorAll(".num_cell");
const test = (num) =>
  new Intl.NumberFormat(navigator.locale, { maximumFractionDigits: 10 }).format(
    num
  );

const numArr = [];
let num = "";

numCell.forEach((numCell) =>
  numCell.addEventListener("click", function () {
    num += numCell.textContent;
    console.log(num);

    // fixme this is garbage logic
    if (num[0] === "-" && num[1] === ".") {
      display.textContent = `0${num.slice(1)}`;
    } else if (num[0] === ".") {
      display.textContent = `0${num}`;
    } else if (num.slice(-2) === ".0") {
      display.textContent = `${test(Math.abs(num))}.0`;
    } else if (num.at(-1) === "0") {
      console.log("hi");
      display.textContent = `${test(num)}`;
    } else {
      display.textContent = test(Math.abs(num));
    }
  })
);

document.addEventListener("keydown", function (e) {
  if (e.key >= 0 && e.key <= 9) {
    num += e.key;
    console.log(num);

    // fixme this is garbage logic
    if (num[0] === "-" && num[1] === ".") {
      display.textContent = `0${num.slice(1)}`;
    } else if (num[0] === ".") {
      display.textContent = `0${num}`;
    } else if (num[num.length - 1] === "0") {
      display.textContent = `${test(Math.abs(num))}.0`;
    } else {
      display.textContent = test(Math.abs(num));
    }
  }
});

// numberBtn(decimal);
decimal.addEventListener("click", function () {
  if (num === "" || num === "-") {
    display.textContent = "0.";
    num += ".";
  } else if (num.includes(".")) {
  } else {
    num += ".";
    display.textContent = `${test(Math.abs(num))}.`;
  }
});

// fixme This does not round but also doesn't format number
// const addedUp = function () {
//   display.textContent = numArr.reduce((a, b) => a + b);
// };

const addedUp = function () {
  display.textContent = test(numArr.reduce((a, b) => a + b));
  console.log(numArr);
};

const doMath = function () {
  if (num === "-" || num === "") {
  } else {
    numArr.push(Number(num));
    num = "";
    console.log(numArr);
    addedUp();
  }
};

// Plus button operations
plus.addEventListener("click", doMath);

// Minus button operations
minus.addEventListener("click", function () {
  if (num === "-") {
  } else {
    numArr.push(Number(num));
    num = "-";
    addedUp();
  }
});

// Add all numbers in numArr
equals.addEventListener(`click`, doMath);
document.addEventListener(`keydown`, function (e) {
  if (e.key === "Enter") {
    doMath();
  }
});

// Change bg color
document.querySelector(".change-bg").addEventListener("click", function () {
  document.body.style.backgroundColor = "darkorange";
});

// Reset to 0 (also clear bg color)
document.querySelector(".clear").addEventListener("click", function () {
  num = "";
  display.textContent = 0;
  numArr.length = 0;
  document.body.style.backgroundColor = "seashell";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "c") {
    num = "";
    display.textContent = 0;
    numArr.length = 0;
    document.body.style.backgroundColor = "seashell";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    num = num.slice(0, -1);
    display.textContent = test(Math.abs(num));
  }
});

// document.addEventListener("keydown", function (e) {
//   console.log(e.key);
// });

/* Note 

1. Add multiply/divide
2. Highlight operator key in use
3. Add keyboard support

*/

// bug Oscillating between '-' and '+' always appends '-'
// bug Decimal disappears when number left of decimal (eg. x.0 will show x)
// alert need to sort out the logic and make reuseable functions. Probably should rethink num variable and numArr for the mult/div update.
