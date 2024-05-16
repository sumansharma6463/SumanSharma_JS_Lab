class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    answerQuestion(answer) {
        if (this.currentQuestion.isCorrect(answer)) {
            this.score++;
        }
        this.moveToNextQuestion();
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    isEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    getScore() {
        return this.score;
    }

    getPercentage() {
        return (this.score / this.questions.length) * 100;
    }
}

class Question {
    constructor(text, options, correctOptionIndex) {
        this.text = text;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
    }

    isCorrect(answerIndex) {
        return answerIndex === this.correctOptionIndex;
    }
}

class QuizUI {
    constructor(quiz) {
        this.quiz = quiz;
        this.quizElem = document.getElementById("quiz");
        this.questionElem = document.getElementById("question");
        this.progressElem = document.getElementById("progress");
        this.attachButtonListeners();
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.quiz.isEnded()) {
            this.showScores();
        } else {
            const question = this.quiz.currentQuestion;
            this.questionElem.innerText = question.text;
            this.displayOptions(question.options);
            this.showProgress();
        }
    }

    displayOptions(options) {
        const choices = Array.from(this.quizElem.querySelectorAll(".buttons button span"));
        choices.forEach((choiceElem, index) => {
            choiceElem.innerText = options[index];
        });
    }

    showProgress() {
        this.progressElem.innerText = `Question ${this.quiz.currentQuestionIndex + 1} of ${this.quiz.questions.length}`;
    }

    attachButtonListeners() {
        const buttons = Array.from(this.quizElem.querySelectorAll(".buttons button"));
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.quiz.answerQuestion(index);
                this.displayQuestion();
            });
        });
    }

    showScores() {
        const result = `
            <h1>Result</h1>
            <h2 id="score">Thank you! Here are your results: <br>
            Score: ${this.quiz.getScore()}/${this.quiz.questions.length} <br>
            Marks percentage: ${this.quiz.getPercentage()}%
            </h2>`;
        this.quizElem.innerHTML = result;
    }
}

const questions = [
    new Question("Which type of JavaScript language is ________",
                ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
                1),
    new Question("What is the purpose of JavaScript in web development?",
                ["To structure web pages", "To style web pages", "To add interactivity and dynamic content to web pages", "To store data on the server"],
                2),
    new Question("Which keyword is used for declaring a variable in JavaScript that can be reassigned?",
                ["const", "var", "let", "static"],
                2),
    new Question("Which data type in JavaScript is used to represent logical values?",
                ["String", "Boolean", "Number", "Undefined"],
                1),
    new Question("Which operator is used to check both the value and the type of a variable in JavaScript?",
                ["==", "===", "!=", "!=="],
                1)

];

const quiz = new Quiz(questions);
const quizUI = new QuizUI(quiz);