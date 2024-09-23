let progressBar = document.getElementById("progress-bar");
let questionElement = document.getElementById("question");
let answerElement = document.getElementById("answer");

let interval;
let countdown;
let timeLeft;
const thinkingTime = 10;
const answerTime = 5;

const modeEnum = {
  thinking: 0,
  answer: 1,
};

let mode = modeEnum.thinking;

function startThinkingCountdown() {
  timeLeft = thinkingTime;
  countdown = setInterval(updateProgressBar, 1000);
}

function startAnswerCountdown() {
  timeLeft = answerTime;
  countdown = setInterval(updateProgressBar, 1000);
}

function updateProgressBar() {
  timeLeft--;
  progressBar.style.width =
    (timeLeft / (mode === modeEnum.thinking ? thinkingTime : answerTime)) *
      100 +
    "%";

  if (timeLeft === 0) {
    if (mode === modeEnum.thinking) {
      showAnswer();
      mode = modeEnum.answer;
      clearInterval(countdown);
      startAnswerCountdown();
    } else if (mode === modeEnum.answer) {
      clearInterval(countdown);
      mode = modeEnum.thinking;
      nextQuestion();
    }
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (98 - 10 + 1)) + 11;
}

function nextQuestion() {
  answerElement.textContent = ""; // 答えをリセット
  let num1 = generateRandomNumber();
  let num2 = generateRandomNumber();
  questionElement.textContent = `${num1} × ${num2}`;
  questionElement.dataset.answer = num1 * num2; // 答えを保存
  startThinkingCountdown();
}

function showAnswer() {
  let answer = questionElement.dataset.answer;
  answerElement.textContent = `答え: ${answer}`;
}

// 最初の問題を表示
nextQuestion();
