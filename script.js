`use strict`;

const display = document.querySelector(`.display`);
const equals = document.querySelector(`.equals`);
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const zero = document.querySelector('.zero');
const one = document.querySelector(`.one`);
const two = document.querySelector(`.two`);
const three = document.querySelector(`.three`);
const four = document.querySelector(`.four`);
const five = document.querySelector(`.five`);
const six = document.querySelector(`.six`);
const seven = document.querySelector(`.seven`);
const eight = document.querySelector(`.eight`);
const nine = document.querySelector(`.nine`);
const decimal = document.querySelector(`.decimal`);

const numArr = [];
let num = '';

// Diplay clicked number(s) and stores to 'num' variable
const numberBtn = function (numberClick) {
  numberClick.addEventListener('click', function () {
    num += numberClick.textContent;
    console.log(num);
    if (num[0] === '.') {
      display.textContent = `0${num}`;
    } /* else if (num.includes(".") && num[num.length - 1] === "0") {
      if (num[0] === "-") {
        display.textContent = num.slice(1);
      } else {
        display.textContent = num;
      }
    }  */ else {
      display.textContent = new Intl.NumberFormat(navigator.locale, {
        minimumSignificantDigits: 2,
      }).format(Math.abs(num));
    }
  });
};

// Add event event listener and display clicked numbers
numberBtn(zero);
numberBtn(one);
numberBtn(two);
numberBtn(three);
numberBtn(four);
numberBtn(five);
numberBtn(six);
numberBtn(seven);
numberBtn(eight);
numberBtn(nine);

// numberBtn(decimal);
decimal.addEventListener('click', function () {
  if (num === '' || num === '-') {
    display.textContent = '0.';
    num += '.';
  } else if (num === '-.' || num.includes('.')) {
  } else {
    console.log(num.at(-1));
    num += '.';
    display.textContent = `${Math.abs(num)}.`;
  }
});

// fixme This does not round but doesn't format number
// const addedUp = function () {
//   display.textContent = numArr.reduce((a, b) => a + b);
// };

// fixme Intl.NumberFormat rounds decimals? Why?
const addedUp = function () {
  display.textContent = new Intl.NumberFormat(navigator.locale).format(
    numArr.reduce((a, b) => a + b)
  );
  console.log(numArr);
};

const doMath = function () {
  if (num === '-' || num === '') {
  } else {
    numArr.push(Number(num));
    num = '';
    console.log(numArr);
    addedUp();
  }
};

// Plus button operations
plus.addEventListener('click', doMath);

// Minus button operations
minus.addEventListener('click', function () {
  if (num === '-') {
  } else {
    numArr.push(Number(num));
    num = '-';
    addedUp();
  }
});

// Add all numbers in numArr
equals.addEventListener(`click`, doMath);

// Change bg color
document.querySelector('.change-bg').addEventListener('click', function () {
  document.body.style.backgroundColor = 'darkorange';
});

// Reset to 0 (also clear bg color)
document.querySelector('.clear').addEventListener('click', function () {
  num = '';
  display.textContent = 0;
  numArr.length = 0;
  document.body.style.backgroundColor = 'seashell';
});

/* Note 

1. Add multiply/divide
2. Highlight operator key in use
3. Add keyboard support

*/

// bug Oscillating between '-' and '+' always appends '-'
// bug Decimal disappears when number left of decimal (eg. x.0 will show x)

console.log('hi');
