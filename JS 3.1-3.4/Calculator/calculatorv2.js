/* Filename: calculatorv2.js
   Complete calculator written using functions. */

/* Call the main function. */
main();

/* Where it all happens */
function main() {
  /* Declare and set variables for first use. */
  var result, operation;

  result = 0;
  operation = "";

  /* Ask the user if he/she wants to add or subtract. */
  operation = prompt(
    "Do you want to: 1. Add 2. Subtract 3. Multiply 4. Divide?",
    ""
  );

  /* Perform the operation chosen by the user. */
  if (operation == "1") {
    result = adder();
    alert("The result of the addition is: " + result);
  } else if (operation == "2") {
    result = subtractor();
    alert("The result of the subtraction is: " + result);
  } else if (operation == "3") {
    result = multiplier();
    alert("The result of the multiplication is: " + result);
  } else if (operation == "4") {
    result = dividor();
    alert("The result of the division is: " + result);
  } else {
    alert("Invalid choice.");
  }
}

/* Adder function: adds two numbers together and returns the result. */
function adder() {
  var num1, num2, finalresult;

  num1 = prompt("Enter the first number to add: ", "");
  num2 = prompt("Enter the second number to add: ", "");

  finalresult = parseFloat(num1) + parseFloat(num2);
  return finalresult;
}

/* Subtractor function */
function subtractor() {
  var num1, num2, finalresult;

  num1 = prompt("Enter the first number to subtract: ", "");
  num2 = prompt("Enter the second number to subtract: ", "");

  finalresult = parseFloat(num1) - parseFloat(num2);
  return finalresult;
}

/* Multiplier function */
function multiplier() {
  var num1, num2, finalresult;

  num1 = prompt("Enter the first number to multiply: ", "");
  num2 = prompt("Enter the second number to multiply: ", "");

  finalresult = parseFloat(num1) * parseFloat(num2);
  return finalresult;
}

/* Dividor function */
function dividor() {
  var num1, num2, finalresult;

  num1 = prompt("Enter the first number to divide: ", "");
  num2 = prompt("Enter the second number to divide: ", "");

  finalresult = parseFloat(num1) / parseFloat(num2);
  return finalresult;
}
