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
  new Intl.NumberFormat(navigator.locale, {
    signDisplay: 'negative',
    maximumFractionDigits: 10,
  }).format(passedNum);

// Logic variables
let num = '';
let storedNum = '0';
let operator;

// Number buttons
const enterNumbers = (enteredNumber) => {
  if (num === '0') {
    num = enteredNumber;
  } else {
    num += enteredNumber;
  }

  // bug ideally this would be: display.textContent = formatNumber(num);
  // however this introduces the issue of 0.0xxxx numbers being shown as 0
  // Formatting ignores zeroes after the decimal until another integer is input
  display.textContent = num;
};

numCell.forEach((numCell) =>
  numCell.addEventListener('click', function () {
    enterNumbers(numCell.textContent);
  })
);

document.addEventListener('keydown', function (e) {
  if (e.key >= 0 && e.key <= 9) {
    enterNumbers(e.key);
    highlightButtonsTimeout(e.code);
  }
});

function highlightButtonsTimeout(eCode) {
  document.querySelector(`.${eCode}`).classList.add('active-cell');
  setTimeout(() => {
    document.querySelector(`.${eCode}`).classList.remove('active-cell');
  }, 100);
}

// Decimal logic
const pressDecimal = (eCode) => {
  if (num === '') {
    num += '0.';
    display.textContent = '0.';
  } else if (num.includes('.')) {
  } else {
    num += '.';
    display.textContent = `${formatNumber(num)}.`;
  }

  highlightButtonsTimeout(eCode);
};

decimal.addEventListener('click', pressDecimal);
document.addEventListener('keydown', (e) => {
  if (e.key === '.') pressDecimal(e.code);
});

// Equals logic
const clearActiveOperator = () => {
  [plus, minus, times, divide].forEach((operatorButton) =>
    operatorButton.classList.remove('active-cell')
  );
};

const calculate = function () {
  let answer;

  if (!num) {
    clearActiveOperator();
    return;
  }

  if (operator === '+') answer = Number(storedNum) + Number(num);
  if (operator === '-') answer = Number(storedNum) - Number(num);
  if (operator === '*') answer = Number(storedNum) * Number(num);
  if (operator === '/') answer = Number(storedNum) / Number(num);
  if (!operator) answer = num;

  storedNum = answer;
  display.textContent = formatNumber(answer);
  num = '';
  clearActiveOperator();
};

// Plus button operations
const pressPlus = () => {
  clearActiveOperator();

  if (num) {
    calculate();
  }

  operator = '+';

  plus.classList.add('active-cell');
};

plus.addEventListener('click', pressPlus);
document.addEventListener('keydown', (e) => {
  if (e.key === '+') pressPlus();
});

// Minus button operations
const pressMinus = () => {
  clearActiveOperator();

  if (num) {
    calculate();
  }

  operator = '-';

  minus.classList.add('active-cell');
};

minus.addEventListener('click', pressMinus);
document.addEventListener('keydown', (e) => {
  if (e.key === '-') pressMinus();
});

// Multiplication button operations
const pressTimes = () => {
  clearActiveOperator();

  if (num) {
    calculate();
  }

  operator = '*';

  times.classList.add('active-cell');
};

times.addEventListener('click', pressTimes);
document.addEventListener('keydown', (e) => {
  if (e.key === '*' || e.key === 'x') pressTimes();
});

// Division button operations
const pressDivide = () => {
  clearActiveOperator();

  if (num) {
    calculate();
  }

  operator = '/';

  divide.classList.add('active-cell');
};

divide.addEventListener('click', pressDivide);
document.addEventListener('keydown', (e) => {
  if (e.key === '/') pressDivide();
});

// Equals
equals.addEventListener(`click`, () => {
  calculate();
  operator = '';
});
document.addEventListener(`keydown`, function (e) {
  if (e.key === 'Enter' || e.key === '=') {
    calculate();
    operator = '';
    highlightButtonsTimeout('equals');
  }
});

// Plus-Minus
const pressPlusMinus = () => {
  num
    ? (display.textContent = num *= -1)
    : (display.textContent = storedNum *= -1);
};

plusMinus.addEventListener('click', pressPlusMinus);
document.addEventListener('keydown', (e) => {
  if (e.key === 's') {
    pressPlusMinus();
    highlightButtonsTimeout(e.code);
  }
});

// Change BG color
document.querySelector('.change-bg').addEventListener('click', function () {
  document.body.style.backgroundColor = 'darkorange';
});

// Reset/Clear Calculator (also clear bg color)
const clearCalc = () => {
  num = '';
  storedNum = '0';
  operator = '';
  display.textContent = 0;

  clearActiveOperator();

  document.body.style.backgroundColor = 'seashell';
};

clear.addEventListener('click', clearCalc);

document.addEventListener('keydown', (e) => {
  if (e.key === 'c' || e.key === 'Clear') {
    clearCalc();
    highlightButtonsTimeout(e.code);
  }
});

// FIXME **FIXED?** Needs more testing
// Delete last number
document.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace') {
    if (!num) return;
    if (num.length === 1) {
      num = '0';
    } else {
      num = num.slice(0, -1);
    }
    display.textContent = num;
  }
});

/* Note 

1. Add theme/color switcher
2. ***DONE*** Highlight operator key in use 
3. ***DONE*** Create operator variable? 
4. ***DONE?*** Highlight buttons when typed ***Used timeout to remove 'active-cell' from class list. Is there a better way?
5. ***DONE*** Probably should get rid of operator in front of number (after completing #3) **This will fix the decimal problem where the operator shows up on pressing the number after the decimal. 
6. Figure out maximum realistic display digits and truncate Intl.NumberFormat
    6a. Use box size to determine max display digits?
    6b. Use if statement to split number format into scientific notation if over max digits?
7. Use grid instead of table/rows?
8. Modernize appearance (flat UI?)


*/

// todo ***FIXED?*** Work on decimal logic
// todo Work out formatting issues with decimals
// todo ***DONE*** Figure out +/- key logic
// TODO ***FIXED?*** column width
// todo ***FIXED*** Need to fix zero so that a number can be added, subtracted, mult, div by zero.
// **Fixed** something is wrong with the negative decimal logic. Figure out why NaN appears. Maybe an issue the the 10 digit formatting limit? || Using the formatNumber() function inside of the calculations for each operator caused storedNum to have commas, creating the NaN issue. Solved by only formatting the number on output to calc display.
