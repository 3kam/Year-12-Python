/* Filename: divide.js

   A simple divider with zero check. */

var first, second, result;

first = 0;
second = 0;
result = 0;

first = prompt("Enter the first number to divide:", "");
second = prompt("Enter the second number to divide:", "");

// check for division by zero
if (parseFloat(second) === 0) {
  alert("You can't divide by zero.");
} else {
  result = parseFloat(first) / parseFloat(second);
  alert(first + " ÷ " + second + " = " + result);
}
