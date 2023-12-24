var startQuizDiv = document.querySelector(".start-quiz-div");
// Target button to trigger quiz to start
var startBtn = document.querySelector(".startBtn");

// TIMER VARIABLES
// Target time-left text to be able to chnage it with function
var timeText = document.querySelector("#time-left")
// Seconds on timer
var time = 60;
var timer;
// *QUESTION VARIABLES
// Variable for quiz answers
var quizAnswersDiv = document.querySelector(".answers")
// Variable for question text 
var quizQuestions = document.querySelector(".quiz-question-text");
// Variable for which question the user is on
var quizIndex = 0;

var quizWrap = document.querySelector(".quiz-wrap")
var answerAlert = document.querySelector(".answer-alert")
var scoreWrap = document.querySelector(".score-wrap")
var scoreSubBtn = document.querySelector(".submit-score-button")
var saveBtn = document.querySelector(".submit-score-button")
var clicked = false;

function endQuiz() {
    clearInterval(timer)
    timeText.innerText = "Time: 0"
    quizWrap.classList.add("hide")
    scoreWrap.classList.remove("hide")
    var userScore = document.querySelector(".user-score")
    userScore.innerText = "Score: " + (time >= 0 ? time : 0)
    quizIndex = 0;
    console.log("Game Over! Enter your initials and submit your score!")
}

function timerCountdown() {
    timeText.innerText = "Time: " + time
    // Set a timer with setInterval and decrease time by 1
    timer = setInterval(function () {
        time--;
        // Change innerText to how much time is left using time variable, being decreased by 1
        timeText.innerText = "Time: " + (time)
        // Timer ends at 0 triggers endQuiz function
        if (time <= 0) {
            endQuiz()
        }
    }, 1000)
}

function startQuiz() {
    console.log("You started the quiz!");
    startQuizDiv.classList.add("hide")
    // Start starts counting down
    timerCountdown()
    // Make first question appear and hide start page
    displayQuestion()
}

function displayQuestion() {
    // Display current question users are on
    var currentQuestion = questions[quizIndex];
    // Question text is put on screen
    quizQuestions.innerText = currentQuestion.questionText;
    // Select answer div to make buttons for answers
    var quizAnswersDiv = document.querySelector(".answers")
    quizAnswersDiv.innerHTML = ""

    // for loop every answer possible that can output an answer choice
    for (var answerIndex = 0; answerIndex < currentQuestion.answers.length; answerIndex++) {
        //Make variable for button
        var answerBtns = document.createElement("button")
        // Inject a button in quizAnswersDiv div
        quizAnswersDiv.append(answerBtns)
        // Insert answer text into button we made 
        answerBtns.innerText = currentQuestion.answers[answerIndex]
        // loop is done go do it again for next answer string (answerIndex++)
    }
}

function checkAnswer(eventObj) {
    eventObj.stopPropagation();

    if (clicked) {
        return;
    }
    
    var currentQuestionObj = questions[quizIndex];
    var el = eventObj.target;

    if (el.tagName === "BUTTON") {
        var userAnswer = el.innerText;
        var currentQuestion = questions[quizIndex];
        correctAnswer = currentQuestion.correctAnswer

        if (userAnswer === correctAnswer) {
            answerAlert.innerText = "Correct!"
            answerAlert.classList.add("show")
            console.log(correctAnswer + " is correct!")

        } else {
            answerAlert.innerText = "WRONG!"
            answerAlert.classList.add("show")
            console.log(userAnswer + " is not correct!")
            time -= 10; }

            clicked = true ; 

            setTimeout(function () {
                answerAlert.classList.remove("show")
                quizIndex++;

                if (quizIndex === questions.length) {
                    endQuiz()
                } else {
                    displayQuestion()
                    clicked = false;
                }
            }, 1250)
        }
    }



function saveHighscore() {
    var initialsInput = document.querySelector("#initials-input")

    initialVal = initialsInput.value;

    var scoreData = localStorage.getItem("highscores")
    var highscores = JSON.parse(scoreData) || []

    highscores.push({
        initials: initialVal,
        score: time
    })

    localStorage.setItem("highscores", JSON.stringify(highscores))

    window.location = "./highscores.html"
}

// "start quiz" button should start the quiz with first question and begin coundown timer
startBtn.addEventListener("click", startQuiz)
quizAnswersDiv.addEventListener("click", checkAnswer)
saveBtn.addEventListener("click", saveHighscore)

console.log("Coding Quiz Challenge!")