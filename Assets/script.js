var questions = [
  {
    question:"Which operator is used to assign a value to a variable?",
    answer:"=",
    options:["+","===","=","-"]
  },
  {
    question:"What is the default value for function parameters?",
    answer:"undefined",
    options:["undefined","string","0","unknown"]
  },
  {
    question:"Using the Day.js Library, what is the correct format for a four-digit year?",
    answer:"YYYY",
    options:["Y","Y4","year.four","YYYY"]
  },
  {
    question:"How do you get information from localStorage?",
    answer:".getItem()",
    options:[".setItem()",".getInfo()",".getProject()",".getItem()"]
  },
  {
    question:"What does window.confirm() return?",
    answer:"boolean",
    options:["string","alert","boolean","target"]
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
var scoreBoardElement = document.querySelector("#score-board");
var userNameInput = document.querySelector("#player-name");
var scoreDisplay = document.querySelector(".score-display");
var submitButton = document.querySelector(".submit-score");
var scoreList = document.querySelector("#score-list");
var score = 0;
var questionIndex = 0;
var countdown;
var timerInterval;

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
quizForm.addEventListener("change", checkAnswer);

/*Starts game on click and clears out previous displays
Also implements question display function and timer*/
function startQuiz () {
  startButton.style.display = 'none';
  scoreDisplay.style.display  = 'none';
  userNameInput.style.display = 'none';
  scoreBoardElement.style.display = 'none';
  while(scoreList.firstChild) {
    scoreList.removeChild(scoreList.firstChild);
  }
  quizContainer.style.display = 'block';
  timerElement.style.display = 'inline';
  countdown = 30;
  timerElement.textContent = `Time left: ${countdown} seconds`;
  nextQuestion();
  startTimer();
};
/*Simple timer function that accounts for different time text displays
and negative number situations*/
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
/*For loop displays options in each label of the quiz-form
Additionally changes input value of radio buttons*/
function nextQuestion() {
  questionNumber.textContent = `Question #${questionIndex + 1}`;
  questionElement.textContent = questions[questionIndex].question;
  for(let i = 0; i < 4; i++){
    answersElement[i].textContent = questions[questionIndex].options[i];
    answerInput[i].value = questions[questionIndex].options[i];
    //value needs to change with options for each question
  }
};
/*check answer adds points based on number of questions out of 100 points
so that the questions array can grow in number if the developer chooses too
add more*/
function checkAnswer(event){
if(event.target.value === questions[questionIndex].answer) {
  score += 100/questions.length
} else{
  countdown -= 10
  timerElement.innerText = `Time left: ${countdown} seconds`;
}
document.querySelector('input[type="radio"]:checked').checked = false;
//^found this line of code from the internet to clear the "checked" property 
questionIndex++;
/*continues logic until question Index reaches questions length
then implements endQuiz*/
if(questionIndex < questions.length){
  nextQuestion();
} else {
  endQuiz();
}
};

/*stops timerInterval function and brings up second form for the user
to input there name along with their displayed score*/
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = 'none';
  scoreDisplay.style.display = 'block';
  scoreDisplay.innerHTML = `Your score is ${score}!`;
  if(countdown <= 0) {
    countdown = 0;
    timerElement.textContent = `Time left: ${countdown} seconds`;
  }
/*I decided that if the user doesn't get any questions correct they can't 
get on the score board. The start button changes to restart and both score
and questionIndex are reset*/
  if(score <= 0) {
    resultContainer.style.display = 'none';
    questionIndex = 0;
    score = 0;
    startButton.style.display = 'block';
    startButton.textContent = "Restart";
  } else {
    resultContainer.style.display = 'block';
    userNameInput.style.display = 'block';
    submitButton.style.display = 'block';
  }
};
/*This was most challenging function for me. The first if statement checks
if there is any scores in local storage already. Otherwise recorded scores 
starts as an empty array*/
function submitScore(event) {
  event.preventDefault();
  var recordedScore;
  if(localStorage.getItem("recordedScore")) {
    recordedScore = JSON.parse(localStorage.getItem("recordedScore"));
  } else {
    recordedScore = []
  }
/*The user must put in a name, otherwise the placeholder text warns them
and the submit button won't move the user forward*/
  if(!userNameInput.value){
   userNameInput.setAttribute("placeholder", "Must enter name before you submit")
   return;
  } else{
    recordedScore.push({
    name: userNameInput.value,
    result: score
    })
/*Sorts the scores in descending order and cuts off at 15 scores. Then it sets
recorded scores as a string and sends to local storage*/
    recordedScore.sort( (a,b) => b.result - a.result)
    recordedScore = recordedScore.slice(0,15)
    localStorage.setItem("recordedScore", JSON.stringify(recordedScore))
  };
/*Score display statement disappears and scoreboard retrieves stored scores
from local storage. For loop then creates list items and appends it to the ul
in the HTML document*/
  scoreDisplay.style.display = 'none';
  scoreBoardElement.style.display = 'block';
  for(let i = 0; i < recordedScore.length; i++) {
    var createListItem = document.createElement("li")
    var highScore = `${recordedScore[i].name}   ${recordedScore[i].result}`
    createListItem.textContent = highScore;
    scoreList.appendChild(createListItem)
  }
  resultContainer.style.display = 'none';


  questionIndex = 0;
  score = 0;
  startButton.style.display = 'block';
  startButton.textContent = "Restart";
}


  


