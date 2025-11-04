/* Filename: subtract.js

   A simple subtractor. */

var first, second, result;

first = 0;
second = 0;
result = 0;

first = prompt("Enter the first number to subtract:", "");
second = prompt("Enter the second number to subtract:", "");
result = parseFloat(first) - parseFloat(second);

alert(first + " - " + second + " = " + result);
