var quizQuestion = document.querySelector('.quiz-question');
var quizRadioWrap = document.querySelector('.quiz-radio__wrap');
var quizRadio = document.querySelectorAll('.quiz-radio');

var quizControlPrev = document.querySelector('#questionPrev');
var quizControlNext = document.querySelector('#questionNext');

var quizPop = document.querySelector('.quiz-popup');
var quizPopText = document.querySelector('.quiz-popup-text');
var quizPopExit = document.querySelector('.quiz-popup-exit');

var selectedRadio;

class QuizFormat {
    constructor(question, option, answer, point) {
        this.question = question;
        this.option = option;
        this.answer = answer;
        this.point = point;
    }
}

class Quiz {

    constructor(list) {
        this.list = list || [];
        this.initialPosition = 0;
        this.answerValue = null;
        this.totalPoints = 0;
    }

    addQuiz(question, option, answer, point) {
        var quizList = new QuizFormat(question, option, answer, point);
        this.list.push(quizList);

        // localStorage.setItem(LOCALKEY, JSON.stringify(this.list));
    }

    currentQuestion() {
        return this.list[this.initialPosition];
    }

    setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    resultDisplay() {
        var title = document.createElement('h1');
        var text = document.createElement('p');
        var passMarks = this.list.length * 0.3;

        if (this.totalPoints > passMarks) {
            title.innerText = 'Congratulations!!!';
            text.innerText = 'You Passed the Quiz';
        } else {
            title.innerText = 'OH N0!!!';
            text.innerText = 'You Failed the Quiz';
        }

        var score = document.createElement('p');
        score.innerHTML = `With ${this.totalPoints}/${this.list.length} points`;
        quizPopText.innerHTML = '';
        quizPopText.append(title, text, score);
    }

    nextQuiz() {
        if (this.answerValue == null) {
            alert('Choose An Option To Proceed!');
            return;
        }

        if (this.answerValue == true) {
            this.totalPoints++;
        }

        if (this.initialPosition < this.list.length - 1) {
            this.initialPosition++;
            this.createHtml();

        } else {
            quizPop.classList.add('open');

            // setTimeout(function () {
            //     quizPop.classList.remove('open');
            // }, 2000);
            // alert(`Total Score is ${this.totalPoints}`);
            this.resultDisplay();
            this.initialPosition = 0;
            this.createHtml();
            this.totalPoints = 0;
        }

        this.answerValue = null;


    }
    prevQuiz() {
        if (this.initialPosition < 1) {
            alert('This is the first question DUMBO');
            return;
        }

        this.totalPoints--;
        this.initialPosition--;
        this.createHtml();
    }

    resetQuiz() {
        this.initialPosition = 0;
        this.createHtml();
    }

    checkAnswer(num) {
        if (this.list[this.initialPosition].answer == num) {
            this.answerValue = true;
        } else {
            this.answerValue = false;
        }
        // console.log(this.answerValue);
    }

    createHtml() {
        quizQuestion.innerHTML = '';
        quizRadioWrap.innerHTML = '';

        var question = document.createElement('h1');
        question.innerHTML = this.list[this.initialPosition].question;
        quizQuestion.append(question);

        for (var i = 0; i < 4; i++) {
            var option = document.createElement('input');

            var label = document.createElement('label');

            label.innerHTML = this.list[this.initialPosition].option[i];

            this.setAttributes(option, {
                'type': 'radio',
                'name': `radio${this.initialPosition}`,
                'id': `radio${i+1}`,
                'value': this.list[this.initialPosition].option[i],
                'onclick': `checkAnswer(${i})`
            });

            this.setAttributes(label, {
                'for': `radio${i+1}`
            });

            var optionWrap = document.createElement('div');
            optionWrap.classList.add('quiz-radio');

            optionWrap.append(option, label);

            quizRadioWrap.append(optionWrap);
            // console.log(this.list.length);
        }
    }

}

var quizList = new Quiz();

quizList.addQuiz('What the capital city of Nepal?', ['Lalitpur', 'Kathmandu', 'Bhaktapur', 'Pokhara'], 1, 1);
quizList.addQuiz('What the capital city of China?', ['Beijing', 'New York', 'Shanghai', 'Guangzhou'], 0, 1);
quizList.addQuiz('What the capital city of Japan?', ['Osawa', 'Kyoto', 'Tokyo', 'Toyota'], 2, 1);
quizList.createHtml();

function checkAnswer(num) {
    // console.log(num);
    quizList.checkAnswer(num);
}

function nextQuiz(e) {

    if (quizList.initialPosition === quizList.list.length - 2) {
        e.srcElement.innerText = 'Finish';
    } else {
        e.srcElement.innerText = 'Next Question';
    }
    quizList.nextQuiz();
}

function prevQuiz() {
    quizList.prevQuiz();
}

function popExit() {
    quizPop.classList.remove('open');
    quizList.resetQuiz();
}

quizControlPrev.onclick = prevQuiz;
quizControlNext.onclick = nextQuiz;
quizPopExit.onclick = popExit;

var radioLists = document.querySelectorAll('.quiz-radio input');
var labelLists = document.querySelectorAll('.quiz-radio label');