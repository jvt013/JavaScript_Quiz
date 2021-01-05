const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const finishButton = document.getElementById('finish-btn')
const quizName = document.getElementById('quiz-name')
const scoreCounter = document.getElementById('score-counter')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const quizPhoto = document.getElementById('quiz-picture')
const finalScoreElement = document.getElementById('final-score-container')
const finalScoreHeader = document.getElementById('final-score-counter')
const finalScoreCaption = document.getElementById('final-score-header')

let currentScore = 0
let shuffledQuestions, currentQuestionIndex



startButton.addEventListener('click', startGame)
finishButton.addEventListener('click', showFinalScorePage)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function showScore(currentScore) {
    scoreCounter.innerText = "Score: " + currentScore
}

function startGame() {
    currentScore = 0;
    showScore(currentScore)
    document.getElementById('quiz-picture').style.display = 'none'
    document.getElementById('nameLogo').style.display = 'inline-block'
    startButton.classList.add('hide')
    quizName.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    finalScoreElement.classList.add('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }) 
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)

    }
}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (correct) {
        currentScore++
    }

    showScore(currentScore)

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart'
        finishButton.classList.remove('hide')
        nextButton.classList.add('hide')

    }
}

function showFinalScorePage() {
    finalScoreElement.classList.remove('hide')
    finishButton.classList.add('hide')
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    finalScoreHeader.innerText = 'Final Score: ' + currentScore +'/3'
    if (currentScore > 1) {
       finalScoreCaption.innerText = 'Earl and his team should consider you. You sound like you have potential!'
    }
    else {
        finalScoreCaption.innerText = 'Better luck next time!'
    }
   

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'How is your interview going?',
        answers: [
            { text: 'A) Great!', correct: true },
            { text: 'B) I hope they do not notice how nervous I am', correct: false },
            { text: 'C) I am having so much fun getting to know everyone!', correct: true },
            { text: 'D) Terrible, they hate me', correct: false }
        ] 
    },
    {
        question: 'Do you have the minimum qualifications?',
        answers: [
            { text: 'A) 2 Quarters of completed CS courses and willingness to learn new skills & technology', correct: true },
            { text: 'B) Knowledge & Understanding of JS, HTML, CSS', correct: false },
            { text: 'C) Ability to work within a team and have strong problem solving abilities', correct: true },
            { text: 'D) A & C, but excited to learn and grow!', correct: true }
        ] 
    },
    {
        question: 'Will you get along with the team?',
        answers: [
            { text: 'A) Yes, if I am invited to Among Us and game nights', correct: true },
            { text: 'B) Nope', correct: false },
            { text: 'C) Yes, I love team settings!', correct: true },
            { text: 'D) Yes, I am ready to contribute, learn, and grow with the team', correct: true }
        ] 
    },
]