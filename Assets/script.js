var questions = [
  {
    question:"",
    answer:"",
    options:["","","",""]
  },
  {
    question:"",
    answer:"",
    options:["","","",""]
  },
  {
    question:"",
    answer:"",
    options:["","","",""]
  },
  {
    question:"",
    answer:"",
    options:["","","",""]
  },
  {
    question:"",
    answer:"",
    options:["","","",""]
  }
]
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer");
var quizContainer = document.querySelector(".quiz-container");
var resultContainer = document.querySelector(".results-container");
var questionElement = document.querySelector("#quiz-question");
var answersElement = document.querySelectorAll("#quiz-answer");
var scoreBoardElement = document.querySelector(".score-board");
var userNameInput = document.querySelector(".player-name");
var scoreDisplay = document.querySelector(".score-display");
var submitButton = document.querySelector(".submit-score");
var gameOn = false;
var score = 0;
var questionIndex = 0;
var countdown;
var timerInterval;

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);

function startQuiz () {
  startButton.style.display = 'none';
  countdown = 60;
  startTimer;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (countdown === 0) {
      clearInterval(timerInterval);
      endQuiz();
    } else if (countdown > 1) {
      timeLeft--;
      timerElement.innerText = `Time left: ${timeLeft} seconds`;
    } else {
      timeLeft--;
      timerElement.innerText = `Time left: ${timeLeft} second`;
    }
  }, 1000);
}

function endQuiz(gameOn) {
  showResults();
}

function submitScore() {
  localStorage.setItem("", JSON.stringify());
  var  = JSON.parse(localStorage.getItem(""));
}

function showResults() {
  resultContainer.style.display = 'block';
  scoreDisplay.innerHTML = `Your score is ${score}!`;
  userNameInput.style.display = 'block';
  submitButton.style.display = 'block';
  submitScore();
}

function nextQuestion(){
  questionIndex = questions[0]
  for(let i = 0; i < questions.length; i++){
    questionElement.textContent = questionIndex.question[i]
  }
}
function checkAnswer(){}