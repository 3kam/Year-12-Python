/* Filename: multiply.js

   A simple multiplier. */

var first, second, result;

first = 0;
second = 0;
result = 0;

first = prompt("Enter the first number to multiply:", "");
second = prompt("Enter the second number to multiply:", "");
result = parseFloat(first) * parseFloat(second);

alert(first + " × " + second + " = " + result);
