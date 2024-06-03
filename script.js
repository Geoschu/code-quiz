// Define the questions
var questions = [
  {
    prompt: "What does var mean in JavaScript?",
    options: ["Variable", "Variant", "Very Large"],
    answer: "Variable",
  },
];

// Initialize current question index and remaining time
var currentQuestionIndex = 0;
var timeRemaining = 60;
var timerId;

// Start the quiz when the start button is clicked
document.getElementById("start").addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  // Set an interval to decrease the time every second
  timerId = setInterval(function () {
    timeRemaining--;
    // Update the time display
    document.getElementById("time").textContent = timeRemaining;
    // End the quiz if time runs out or all questions have been answered
    if (timeRemaining <= 0) {
      endQuiz();
    } else {
      getQuestion();
    }
  }, 1000);
}

// Function to display a question
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  // Display the question
  document.getElementById("question-display").textContent =
    currentQuestion.prompt;
  var optionsDiv = document.getElementById("option-display");
  optionsDiv.innerHTML = "";
  // Create buttons for each option
  currentQuestion.options.forEach(function (option, index) {
    var optionButton = document.createElement("button");
    optionButton.textContent = option;
    // Handle click event for each option
    optionButton.addEventListener("click", function () {
      checkAnswer(option);
    });
    optionsDiv.appendChild(optionButton);
  });
}

// Function to check the answer
function checkAnswer(selectedOption) {
  var currentQuestion = questions[currentQuestionIndex];
  // If the selected option is correct, move to the next question
  if (selectedOption === currentQuestion.answer) {
    document.getElementById("feedback-display").textContent = "Correct!";
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
  } else {
    // If the selected option is incorrect, deduct time
    document.getElementById("feedback-display").textContent = "Wrong!";
    timeRemaining -= 10;
    document.getElementById("time").textContent = timeRemaining;
  }
}

// Function to end the quiz
function endQuiz() {
  // Clear the interval
  clearInterval(timerId);
  // Display the final score
  document.getElementById("final-score-display").textContent =
    "Your final score is: " + timeRemaining;
}
// Code to handle end of quiz goes here...

// Handle user score submission
document.getElementById("submit").addEventListener("click", function () {
  var initials = document.getElementById("initials").value;
  var score = timeRemaining;
  var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  // Save the score to local storage
  highScores.push({ initials: initials, score: score });
  window.localStorage.setItem("highscores", JSON.stringify(highScores));
});

// Display high scores
document
  .getElementById("view-high-scores")
  .addEventListener("click", function () {
    var highScores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var scoresDisplay = document.getElementById("scores-display");
    scoresDisplay.innerHTML = "";
    // Create a list item for each score
    highScores.forEach(function (score) {
      var li = document.createElement("li");
      li.textContent = `${score.initials}: ${score.score}`;
      scoresDisplay.appendChild(li);
    });
  });