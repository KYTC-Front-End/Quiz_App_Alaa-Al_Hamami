let userName = document.querySelector("#userName");
let errorMessage = document.getElementById("errorMessage");
let startBtn = document.querySelector("#startgame-btn");
let quizAppPage = document.querySelector(".quiz-App");
let quizQuestionsPage = document.querySelector(".quiz-questions");
let nextBtn = document.getElementById("next-question-btn");
let questionTitle = document.getElementById("que-title");
let answersOfQuestion = document.querySelectorAll(".radio-choice");
let ans1 = document.querySelector("#ans1");
let ans2 = document.querySelector("#ans2");
let ans3 = document.querySelector("#ans3");
let numberOfQuestion = document.getElementById("number-question");
let leaderBoardPage = document.getElementById("leaderboard");
let scores = document.getElementById("scores");
let leaderBtn = document.getElementById("loadleader-btn");

let questionCounter = 0;
let score = 0;

// Set the question in local Storage

window.localStorage.setItem("data", JSON.stringify(data));
let questionData = JSON.parse(window.localStorage.getItem("data"));
//let randomIndex = Math.floor(Math.random() * questionData.length);

// check leaderBoard in localStorage

let leadBoard = window.localStorage.getItem("leaderBoard");
if (leadBoard) {
  leadBoard = JSON.parse(leadBoard);
} else {
  leadBoard = [];
}

// Event for StartBtn
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (userName.value === "") {
    errorMessage.textContent = "Please Enter Your name";
    errorMessage.style.color = "red";
  } else {
    quizAppPage.style.display = "none";
    quizQuestionsPage.style.display = "block";
    getQuestion();
  }
});

// Function GetQuestion

function getQuestion() {
  unCheckedRadioButton();
  questionTitle.textContent = questionData[questionCounter].question;
  ans1.textContent = questionData[questionCounter].answers[0];
  ans2.textContent = questionData[questionCounter].answers[1];
  ans3.textContent = questionData[questionCounter].answers[2];
}

// Function to unabel of radio Button initially

function unCheckedRadioButton() {
  answersOfQuestion.forEach((item) => (item.checked = false));
}

// Function Answer and return the answer  (to check if answer correct or not)
function selectAnswer() {
  let answerSelected;
  answersOfQuestion.forEach((item) => {
    if (item.checked) {
      answerSelected = item.value;
    }
  });
  return answerSelected;
}

// click the nextBtn
nextBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let answer = selectAnswer();
  console.log(answer);
  console.log(questionData[questionCounter].correctAnswer);
  if (answer === questionData[questionCounter].correctAnswer) {
    score++;
  }
  questionCounter++;
  numberOfQuestion.textContent = `${questionCounter + 1}`;

  if (questionCounter < questionData.length) {
    getQuestion();
  } else {
    quizAppPage.style.display = "none";
    quizQuestionsPage.style.display = "none";
    leaderBoardPage.style.display = "block";
    let Scores = {
      name: userName.value,
      score: score,
    };
    leadBoard.push(Scores);
    localStorage.setItem("leaderBoard", JSON.stringify(leadBoard));
    console.log(Scores);
    displayLeaderboard();
  }
});

//Function displayLeaderBorder from localStorage
function displayLeaderboard() {
  leadBoard.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.score}`;
    console.log(li);
    scores.appendChild(li);
    leadBoard.sort((a, b) => b.score - a.score);
  });
}

leaderBtn.addEventListener("click", () => {
  quizAppPage.style.display = "none";
  leaderBoardPage.style.display = "block";
  displayLeaderboard();
});
