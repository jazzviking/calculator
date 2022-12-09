`use strict`;

// Selectors
const display = document.querySelector(`.display`);
const equals = document.querySelector(`.equals`);
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const times = document.querySelector('.times');
const divide = document.querySelector('.divide');
const decimal = document.querySelector(`.decimal`);
const clear = document.querySelector('.clearcalc');
const numCell = document.querySelectorAll('.num_cell');
const plusMinus = document.querySelector('.plusminus');

const formatNumber = (passedNum) =>
  new Intl.NumberFormat(navigator.locale, { maximumFractionDigits: 10 }).format(
    passedNum
  );

// Logic variables
let num = '';
let storedNum = '0';
let operator;

// Number buttons
const enterNumbers = (enteredNumber) => {
  if (num === '0') {
    num = enteredNumber;
  } else if (
    (num === '-' || num === '+' || num === '*' || num === '/') &&
    enteredNumber === '0'
  ) {
    return;
  } else {
    num += enteredNumber;
  }
  display.textContent = num;
};

numCell.forEach((numCell) =>
  numCell.addEventListener('click', function () {
    // console.log(num);
    // num === '0' ? (num = numCell.textContent) : (num += numCell.textContent);
    // display.textContent = num;

    enterNumbers(numCell.textContent);
  })
);

document.addEventListener('keydown', function (e) {
  if (e.key >= 0 && e.key <= 9) {
    // num === '0' ? (num = e.key) : (num += e.key);
    // display.textContent = num;
    // console.log(num);

    enterNumbers(e.key);
  }
});

// Decimal logic
const pressDecimal = () => {
  if (num === '' || num === '-' || num === '+' || num === '*' || num === '/') {
    display.textContent = '0.';
    num += '0.';
  } else if (num.includes('.')) {
  } else {
    num += '.';
    display.textContent = `${formatNumber(num)}.`;
  }
};

decimal.addEventListener('click', pressDecimal);
document.addEventListener('keydown', (e) => {
  if (e.key === '.') pressDecimal();
});

// Equals logic
const clearActiveOperator = () => {
  [plus, minus, times, divide].forEach((operator) =>
    operator.classList.remove('active-cell')
  );
};

const calculate = function () {
  if (!num) return;

  let answer;

  if (num === '+' || num === '-' || num === '*' || num === '/') return;
  if (num[0] === '-') answer = Number(storedNum) - Number(num.slice(1));
  if (num[0] === '*') answer = Number(storedNum) * Number(num.slice(1));
  if (num[0] === '+') answer = Number(storedNum) + Number(num.slice(1));
  if (num[0] === '/') answer = Number(storedNum) / Number(num.slice(1));
  if (num[0] !== '+' && num[0] !== '-' && num[0] !== '*' && num[0] !== '/')
    answer = num;

  storedNum = answer;
  display.textContent = formatNumber(answer);
  num = '';
  clearActiveOperator();
  // console.log(
  //   `AFTER CALC | num: ${num}, storedNum: ${storedNum}, answer: ${answer}`
  // );
};

// Plus button operations
const pressPlus = () => {
  clearActiveOperator();

  if (!num) {
  } else if (num[0] !== '+' && storedNum === '0') {
    storedNum = num;
  } else if (num === '+') {
    return;
  } else {
    calculate();
  }
  plus.classList.add('active-cell');
  num = '+';
  console.log(`press plus num = ${num} | storedNum = ${storedNum}`);
};

plus.addEventListener('click', pressPlus);
document.addEventListener('keydown', (e) => {
  if (e.key === '+') pressPlus();
});

// Minus button operations
const pressMinus = () => {
  clearActiveOperator();

  if (!num) {
  } else if (num[0] !== '-' && storedNum === '0') {
    storedNum = num;
  } else if (num === '-') {
    return;
  } else {
    calculate();
  }
  minus.classList.add('active-cell');
  num = '-';
};

minus.addEventListener('click', pressMinus);
document.addEventListener('keydown', (e) => {
  if (e.key === '-') pressMinus();
});

// Multiplication button operations
const pressTimes = () => {
  clearActiveOperator();

  if (!num) {
  } else if (num[0] !== '*' && storedNum === '0') {
    storedNum = num;
    console.log(`storedNum = ${num}`);
  } else if (num === '*') {
    return;
  } else {
    calculate();
  }
  times.classList.add('active-cell');
  num = '*';
};

times.addEventListener('click', pressTimes);
document.addEventListener('keydown', (e) => {
  if (e.key === '*' || e.key === 'x') pressTimes();
});

// Division button operations
const pressDivide = () => {
  clearActiveOperator();

  if (!num) {
  } else if (num[0] !== '/' && storedNum === '0') {
    storedNum = num;
    console.log(`storedNum = ${num}`);
  } else if (num === '/') {
    return;
  } else {
    calculate();
  }
  divide.classList.add('active-cell');
  num = '/';
};

divide.addEventListener('click', pressDivide);
document.addEventListener('keydown', (e) => {
  if (e.key === '/') pressDivide();
});

// Equals
equals.addEventListener(`click`, calculate);
document.addEventListener(`keydown`, function (e) {
  if (e.key === 'Enter') {
    calculate();
  }
});

// Change bg color
document.querySelector('.change-bg').addEventListener('click', function () {
  document.body.style.backgroundColor = 'darkorange';
});

// Reset/Clear Calculator (also clear bg color)
const clearCalc = () => {
  num = '';
  storedNum = '0';
  display.textContent = 0;

  clearActiveOperator();

  document.body.style.backgroundColor = 'seashell';
};

clear.addEventListener('click', clearCalc);

document.addEventListener('keydown', (e) => {
  if (e.key === 'c') {
    clearCalc();
  }
});

// FIXME Maybe fixed? Requires further testing
// Delete last number
document.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace') {
    if (!num || num === '+' || num === '-' || num === '*' || num === '/')
      return;
    if (num.length === 1) {
      num = 0;
    } else {
      num = num.slice(0, -1);
    }
    display.textContent = num;
  }
});

/* Note 

1. Add theme/color switcher
2. Highlight operator key in use 
3. Create operator variable? 
4. Highlight buttons when typed
5. Probably should get rid of operator in front of number (after completing #3) **This will fix the decimal problem where the operator shows up on pressing the number after the decimal. 

*/

// todo Work on decimal logic
// todo Work out formatting issues with decimals
// todo Figure out +/- key logic and column width
// todo Need to fix zero so that a number can be added, subtracted, mult, div by zero.
// **Fixed** something is wrong with the negative decimal logic. Figure out why NaN appears. Maybe an issue the the 10 digit formatting limit? || Using the formatNumber() function inside of the calculations for each operator caused storedNum to have commas, creating the NaN issue. Solved by only formatting the number on output to calc display.
