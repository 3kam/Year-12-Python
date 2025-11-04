/* Filename: paperscissorsrockarray.js
   Paper-Scissors-Rock game that prompts for number of rounds (2 or 3) */

main();

function main() {
  var i, available, choice, rounds, wins, inputRounds;
  available = ["paper", "scissors", "rock"];
  wins = 0;

  // Ask and validate number of rounds (must be 2 or 3)
  inputRounds = prompt(
    "How many rounds would you like to play? (Enter 2 or 3):",
    "3"
  );
  if (inputRounds === null) {
    // Cancel pressed -> default to 3
    rounds = 3;
  } else {
    rounds = parseInt(inputRounds, 10);
    while (isNaN(rounds) || rounds < 2 || rounds > 3) {
      inputRounds = prompt(
        "Invalid. Please enter 2 or 3 (or Cancel to use 3):",
        "3"
      );
      if (inputRounds === null) {
        rounds = 3;
        break;
      }
      rounds = parseInt(inputRounds, 10);
    }
  }

  // Play the chosen number of rounds
  for (var roundIndex = 0; roundIndex < rounds; roundIndex++) {
    i = Math.floor(Math.random() * 3);

    choice = prompt(
      "Round " +
        (roundIndex + 1) +
        " — Paper (p), scissors (s), rock (r). Type Q to quit:",
      ""
    );

    if (choice === null) {
      alert("You cancelled. Game ends.");
      break;
    }

    // Normalise input so P/S/R or q works
    choice = choice.toLowerCase().trim();

    if (choice === "q") {
      alert("You quit the game.");
      break;
    }

    if (choice === "p") {
      if (available[i] === "scissors") {
        alert("You lose. Computer chose " + available[i]);
      } else if (available[i] === "rock") {
        alert("You win! Computer chose " + available[i]);
        wins++;
      } else {
        alert("Draw. Computer also chose paper.");
      }
    } else if (choice === "s") {
      if (available[i] === "rock") {
        alert("You lose. Computer chose " + available[i]);
      } else if (available[i] === "paper") {
        alert("You win! Computer chose " + available[i]);
        wins++;
      } else {
        alert("Draw. Computer also chose scissors.");
      }
    } else if (choice === "r") {
      if (available[i] === "paper") {
        alert("You lose. Computer chose " + available[i]);
      } else if (available[i] === "scissors") {
        alert("You win! Computer chose " + available[i]);
        wins++;
      } else {
        alert("Draw. Computer also chose rock.");
      }
    } else {
      alert("Invalid input. Please type p, s, r or Q.");
      roundIndex--; // Repeat this round
    }
  }

  alert("Game over! You won " + wins + " time(s).");
}
