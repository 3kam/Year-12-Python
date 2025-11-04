/* Filename: adder.js

   A simple adder. */

/* Declare and set variables for first use. */
var first, second, result;

first = 0;
second = 0;
result = 0;

/* Prompt and add the two numbers together. */
first = prompt("Enter the first number to add:", "");
second = prompt("Enter the second number to add:", "");
result = parseFloat(first) + parseFloat(second);

/* Display the result. */
alert(first + " + " + second + " = " + result);
