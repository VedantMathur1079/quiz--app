// =============================================
//  Quiz Application — Main Logic
//  Group 13 | Version Control System Project
// =============================================

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 20; // seconds

// ── State ────────────────────────────────────
let state = {
  playerName: "",
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  timer: null,
  timeLeft: TIME_PER_QUESTION,
  answered: false,
};

// ── Helpers ───────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickQuestions() {
  return shuffle(QUESTIONS).slice(0, TOTAL_QUESTIONS);
}

function saveScore(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
  leaderboard.push({ name, score, total: TOTAL_QUESTIONS, date: new Date().toLocaleDateString() });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard.slice(0, 10)));
}

function getLeaderboard() {
  return JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
}

// ── Screen Management ─────────────────────────
const screens = {
  welcome: document.getElementById("screen-welcome"),
  quiz: document.getElementById("screen-quiz"),
  results: document.getElementById("screen-results"),
  leaderboard: document.getElementById("screen-leaderboard"),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ── Welcome Screen ────────────────────────────
const nameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const nameError = document.getElementById("name-error");

startBtn.addEventListener("click", startGame);
nameInput.addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });

function startGame() {
  const name = nameInput.value.trim();
  if (!name) {
    nameError.textContent = "Please enter your name to continue.";
    nameInput.classList.add("shake");
    setTimeout(() => nameInput.classList.remove("shake"), 500);
    return;
  }
  nameError.textContent = "";
  state.playerName = name;
  state.questions = pickQuestions();
  state.currentIndex = 0;
  state.score = 0;
  state.answers = [];
  showScreen("quiz");
  loadQuestion();
}

// ── Quiz Screen ───────────────────────────────
const questionNumber  = document.getElementById("question-number");
const questionCategory = document.getElementById("question-category");
const questionText    = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn         = document.getElementById("next-btn");
const timerFill       = document.getElementById("timer-fill");
const timerCount      = document.getElementById("timer-count");
const progressFill    = document.getElementById("progress-fill");
const scoreDisplay    = document.getElementById("score-display");

function loadQuestion() {
  const q = state.questions[state.currentIndex];
  state.answered = false;
  state.timeLeft = TIME_PER_QUESTION;

  // Update header
  questionNumber.textContent = `Question ${state.currentIndex + 1} / ${TOTAL_QUESTIONS}`;
  questionCategory.textContent = q.category;
  questionText.textContent = q.question;
  scoreDisplay.textContent = `Score: ${state.score}`;

  // Progress bar
  progressFill.style.width = `${(state.currentIndex / TOTAL_QUESTIONS) * 100}%`;

  // Shuffle options display but track correct answer
  const shuffledIndexes = shuffle([0, 1, 2, 3]);
  const correctDisplay = shuffledIndexes.indexOf(q.answer);

  optionsContainer.innerHTML = "";
  shuffledIndexes.forEach((origIdx, displayIdx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[origIdx];
    btn.dataset.correct = displayIdx === correctDisplay ? "true" : "false";
    btn.addEventListener("click", () => selectAnswer(btn, displayIdx === correctDisplay));
    optionsContainer.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
  nextBtn.textContent = state.currentIndex === TOTAL_QUESTIONS - 1 ? "See Results →" : "Next Question →";

  // Stagger option animations
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.style.animationDelay = `${i * 80}ms`;
    btn.classList.add("slide-in");
  });

  startTimer();
}

function selectAnswer(btn, isCorrect) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  // Visual feedback
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.classList.add("correct");
  });

  if (isCorrect) {
    btn.classList.add("correct");
    state.score++;
    scoreDisplay.textContent = `Score: ${state.score}`;
    showFeedback("✓ Correct!", "correct");
  } else {
    btn.classList.add("wrong");
    showFeedback("✗ Incorrect!", "wrong");
  }

  state.answers.push({ question: state.questions[state.currentIndex].question, correct: isCorrect });
  nextBtn.classList.remove("hidden");
}

function showFeedback(msg, type) {
  const fb = document.getElementById("feedback");
  fb.textContent = msg;
  fb.className = `feedback ${type}`;
  fb.classList.remove("hidden");
  setTimeout(() => fb.classList.add("hidden"), 1500);
}

function startTimer() {
  timerFill.style.transition = "none";
  timerFill.style.width = "100%";
  timerCount.textContent = TIME_PER_QUESTION;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      timerFill.style.transition = `width ${TIME_PER_QUESTION}s linear`;
      timerFill.style.width = "0%";
    });
  });

  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.timeLeft--;
    timerCount.textContent = state.timeLeft;
    if (state.timeLeft <= 5) timerFill.classList.add("danger");
    else timerFill.classList.remove("danger");

    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      if (!state.answered) {
        state.answered = true;
        document.querySelectorAll(".option-btn").forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === "true") b.classList.add("correct");
        });
        state.answers.push({ question: state.questions[state.currentIndex].question, correct: false });
        showFeedback("⏱ Time's up!", "wrong");
        nextBtn.classList.remove("hidden");
      }
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  state.currentIndex++;
  if (state.currentIndex >= TOTAL_QUESTIONS) {
    endGame();
  } else {
    loadQuestion();
  }
});

// ── Results Screen ────────────────────────────
function endGame() {
  clearInterval(state.timer);
  saveScore(state.playerName, state.score);
  progressFill.style.width = "100%";
  showScreen("results");

  const percentage = Math.round((state.score / TOTAL_QUESTIONS) * 100);
  document.getElementById("result-name").textContent = state.playerName;
  document.getElementById("result-score").textContent = `${state.score} / ${TOTAL_QUESTIONS}`;
  document.getElementById("result-percentage").textContent = `${percentage}%`;

  let emoji, msg;
  if (percentage >= 90)      { emoji = "🏆"; msg = "Outstanding! You're a genius!"; }
  else if (percentage >= 70) { emoji = "🎉"; msg = "Great job! Well done!"; }
  else if (percentage >= 50) { emoji = "👍"; msg = "Not bad! Keep practising!"; }
  else                       { emoji = "📚"; msg = "Keep learning, you'll get there!"; }

  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-message").textContent = msg;

  // Animate score counter
  let display = 0;
  const target = state.score;
  const interval = setInterval(() => {
    if (display >= target) { clearInterval(interval); return; }
    display++;
    document.getElementById("result-score").textContent = `${display} / ${TOTAL_QUESTIONS}`;
  }, 100);

  // Answer breakdown
  const breakdown = document.getElementById("answer-breakdown");
  breakdown.innerHTML = state.answers.map((a, i) =>
    `<div class="breakdown-item ${a.correct ? 'correct' : 'wrong'}">
      <span class="breakdown-icon">${a.correct ? "✓" : "✗"}</span>
      <span class="breakdown-q">Q${i + 1}: ${a.question.substring(0, 45)}${a.question.length > 45 ? "…" : ""}</span>
    </div>`
  ).join("");
}

document.getElementById("retry-btn").addEventListener("click", () => {
  showScreen("welcome");
  nameInput.value = "";
});

document.getElementById("leaderboard-btn").addEventListener("click", showLeaderboard);

// ── Leaderboard Screen ────────────────────────
function showLeaderboard() {
  const data = getLeaderboard();
  const tbody = document.getElementById("leaderboard-body");

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;opacity:0.5;padding:2rem">No scores yet. Play to get on the board!</td></tr>`;
  } else {
    tbody.innerHTML = data.map((entry, i) =>
      `<tr class="${i < 3 ? 'top-' + (i + 1) : ''}">
        <td><span class="rank-badge">${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span></td>
        <td>${entry.name}</td>
        <td>${entry.score} / ${entry.total}</td>
        <td>${entry.date}</td>
      </tr>`
    ).join("");
  }

  showScreen("leaderboard");
}

document.getElementById("back-from-lb").addEventListener("click", () => showScreen("welcome"));
document.getElementById("view-lb-btn").addEventListener("click", showLeaderboard);
