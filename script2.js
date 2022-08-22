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
const formatNumber = (num) =>
  new Intl.NumberFormat(navigator.locale, { maximumFractionDigits: 10 }).format(
    num
  );

// Logic variables
const numArr = [];
let num = '';
let storedNum = '0';

// Number buttons
numCell.forEach((numCell) =>
  numCell.addEventListener('click', function () {
    num === '0' ? (num = numCell.textContent) : (num += numCell.textContent);
    display.textContent = num;
    console.log(num);
  })
);

document.addEventListener('keydown', function (e) {
  if (e.key >= 0 && e.key <= 9) {
    num === '0' ? (num = e.key) : (num += e.key);
    display.textContent = num;
    console.log(num);
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
const calculate = function () {
  if (!num) return;
  console.log(`BEFORE CALC | num: ${num.length}, storedNum: ${storedNum}`);
  let answer;

  if (num === '+' || num === '-' || num === '*' || num === '/') return;
  if (num[0] === '-')
    answer = formatNumber(Number(storedNum) - Number(num.slice(1)));
  if (num[0] === '*')
    answer = formatNumber(Number(storedNum) * Number(num.slice(1)));
  if (num[0] === '+')
    answer = formatNumber(Number(storedNum) + Number(num.slice(1)));
  if (num[0] === '/')
    answer = formatNumber(Number(storedNum) / Number(num.slice(1)));
  if (num[0] !== '+' && num[0] !== '-' && num[0] !== '*' && num[0] !== '/')
    answer = num;

  display.textContent = answer;
  storedNum = answer;
  num = '';
  console.log(
    `AFTER CALC | num: ${num}, storedNum: ${storedNum}, answer: ${answer}`
  );
};

// Plus button operations
const pressPlus = () => {
  if (!num) {
  } else if (num[0] !== '+' && storedNum === '0') {
    storedNum = num;
  } else if (num === '+') {
    return;
  } else {
    calculate();
  }
  num = '+';
};

plus.addEventListener('click', pressPlus);
document.addEventListener('keydown', (e) => {
  if (e.key === '+') pressPlus();
});

// Minus button operations
const pressMinus = () => {
  if (!num) {
  } else if (num[0] !== '-' && storedNum === '0') {
    storedNum = num;
  } else if (num === '-') {
    return;
  } else {
    calculate();
  }
  num = '-';
};

minus.addEventListener('click', pressMinus);
document.addEventListener('keydown', (e) => {
  if (e.key === '-') pressMinus();
});

// Multiplication button operations
const pressTimes = () => {
  if (!num) {
  } else if (num[0] !== '*' && storedNum === '0') {
    storedNum = num;
    console.log(`storedNum = ${num}`);
  } else if (num === '*') {
    return;
  } else {
    calculate();
  }
  num = '*';
};

times.addEventListener('click', pressTimes);
document.addEventListener('keydown', (e) => {
  if (e.key === '*' || e.key === 'x') pressTimes();
});

// TODO ADD DIVIDE OPERATOR
const pressDivide = () => {
  if (!num) {
  } else if (num[0] !== '/' && storedNum === '0') {
    storedNum = num;
    console.log(`storedNum = ${num}`);
  } else if (num === '/') {
    return;
  } else {
    calculate();
  }
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
  numArr.length = 0;
  document.body.style.backgroundColor = 'seashell';
};

clear.addEventListener('click', clearCalc);

document.addEventListener('keydown', (e) => {
  if (e.key === 'c') {
    clearCalc();
  }
});

// FIXME This doesn't work
// Delete last number
document.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace') {
    num = num.slice(0, -1);
    display.textContent = num;
  }
});

/* Note 

1. Add theme/color switcher
2. Highlight operator key in use 
3. Highlight buttons when typed
4. Probably should get rid of operator in front of number (after completing #3)

*/

// todo Work on decimal logic
// todo Work out formatting issues with decimals
// todo Figure out +/- key (currently # to keep column widths even)
// BUG something is wrong with the negative decimal logic. Figure out why NaN appears. Maybe an issue the the 10 digit formatting limit?
