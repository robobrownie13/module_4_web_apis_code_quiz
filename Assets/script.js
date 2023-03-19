var questions = [
  {
    question:"1",
    answer:"1",
    options:["1","2","3","4"]
  },
  {
    question:"2",
    answer:"2",
    options:["1","2","3","4"]
  },
  {
    question:"3",
    answer:"1",
    options:["1","2","3","4"]
  },
  {
    question:"4",
    answer:"2",
    options:["1","2","3","4"]
  },
  {
    question:"5",
    answer:"1",
    options:["1","2","3","4"]
  }
]
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer");
var quizContainer = document.querySelector(".quiz-container");
var quizForm = document.querySelector(".quiz-form");
var questionNumber = document.querySelector(".question-number")
var resultContainer = document.querySelector(".result-container");
var scoreInputForm = document.querySelector(".score-input");
var questionElement = document.querySelector(".quiz-question");
var answersElement = document.querySelectorAll(".quiz-answer");
var answerInput = document.querySelectorAll(".answer-input")
var scoreBoardElement = document.querySelector(".score-board");
var userNameInput = document.querySelector(".player-name");
var scoreDisplay = document.querySelector(".score-display");
var submitButton = document.querySelector(".submit-score");
var score = 0;
var questionIndex = 0;
var countdown;
var timerInterval;

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
quizForm.addEventListener("change", checkAnswer);

function startQuiz () {
  startButton.style.display = 'none';
  quizContainer.style.display = 'block';
  timerElement.style.display = 'inline';
  countdown = 30;
  timerElement.textContent = `Time left: ${countdown} seconds`;
  nextQuestion();
  startTimer();
};

function startTimer() {
  timerInterval = setInterval(() => {
    if (countdown <= 0) {
      endQuiz();
    } else if (countdown > 1) {
      countdown--;
      timerElement.innerText = `Time left: ${countdown} seconds`;
    } else {
      countdown--;
      timerElement.innerText = `Time left: ${countdown} second`;
    }
  }, 1000);
};

function nextQuestion() {
  questionNumber = questionIndex + 1;
  questionElement.textContent = questions[questionIndex].question;
  for(let i = 0; i < 4; i++){
    answersElement[i].textContent = questions[questionIndex].options[i];
    answerInput[i].value = questions[questionIndex].options[i];
    //value needs to change with options for each question
  }
};

function checkAnswer(event){
if(event.target.value === questions[questionIndex].answer) {
  score += 10
} else{
  countdown -= 10
  timerElement.innerText = `Time left: ${countdown} seconds`;
}
document.querySelector('input[type="radio"]:checked').checked = false;
//found this line of code from the internet to clear the property checked
questionIndex++;
if(questionIndex < questions.length){
  nextQuestion();
} else {
  endQuiz();
}

};
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  scoreDisplay.innerHTML = `Your score is ${score}!`;
  userNameInput.style.display = 'block';
  submitButton.style.display = 'block';

  if(countdown <= 0) {
    countdown = 0;
    timerElement.textContent = `Time left: ${countdown} seconds`;
  }
};

function submitScore() {
  // localStorage.setItem("", JSON.stringify());
  // var  = JSON.parse(localStorage.getItem(""));
}


  


