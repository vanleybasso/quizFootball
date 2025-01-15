// declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// perguntas sobre futebol americano
const questions = [
  {
    "question": "Qual é o atual campeão da NFL?",
    "answers": [
      {
        "answer": "New England Patriots",
        "correct": false
      },
      {
        "answer": "San Francisco 49ers",
        "correct": false
      },
      {
        "answer": "Kansas City Chiefs",
        "correct": true
      },
      {
        "answer": "Philadelphia Eagles",
        "correct": false
      },
    ]
  },
  {
    "question": "Quantos pontos vale um touchdown?",
    "answers": [
      {
        "answer": "6 pontos",
        "correct": true
      },
      {
        "answer": "3 pontos",
        "correct": false
      },
      {
        "answer": "7 pontos",
        "correct": false
      },
      {
        "answer": "1 ponto",
        "correct": false
      },
    ]
  },
  {
    "question": "Como se chama a final da NFL?",
    "answers": [
      {
        "answer": "World Cup",
        "correct": false
      },
      {
        "answer": "Super Bowl",
        "correct": true
      },
      {
        "answer": "Final Four",
        "correct": false
      },
      {
        "answer": "Championship Bowl",
        "correct": false
      },
    ]
  },
];


// substitui o layout pela primeira questão
function init() {
  createQuestion(0);
}

// criar questão
function createQuestion(i) {

  // limpar questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // altera o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // adicionar alternativas
  questions[i].answers.forEach(function(answer, i) {
    
    // altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);

  });

  // cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  // adiciona o número atual de questões
  actualQuestion++;

}

// verificando se resposta está correta
function checkAnswer(btn, buttons) {
  
  // exibir respostas erradas e a certa
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      // checa se o usuário acertou
      if(btn === button) {
        // adicona os pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

// exibe a próxima pergunta
function nextQuestion() {

  // timer para ver se acertou ou errou
  setTimeout(function() {

    // verifica se ainda há mais perguntas
    if(actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  }, 1000);

}

// tela final
function showSuccessMessage() {

  hideOrShowQuizz();

  // calcular pontos
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // alterar número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// mostra ou exibe o quiz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// inicialização
init();
