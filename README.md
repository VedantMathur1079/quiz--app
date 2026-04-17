# ⚡ QuizApp — Version Control System Project

**Group 13 | Quiz Application with Version Control**

A browser-based quiz application built with HTML, CSS, and JavaScript. Supports multiple categories, timed questions, score tracking, and a local leaderboard.

---

## 👥 Team Members & Roles

| Enrollment | Name             | Role                            |
|------------|------------------|---------------------------------|
| 2481129    | Vanshika Vats    | Project Manager + Documentation |
| 2481228    | Vedant Mathur    | Developer + GitHub Manager      |
| 2481193    | Vihaan Yadav     | Tester + Documentation          |
| 2481183    | Vinayak Chibber  | UI Developer + Tester           |
| 2481008    | Vineet Kashyap   | Support Developer               |

---

## 🚀 Features

- 🎯 **10 random questions** per session from a 20-question bank
- ⏱️ **20-second timer** per question with visual countdown
- 📚 **5 categories**: Science, Technology, Mathematics, History, General Knowledge
- 🏆 **Leaderboard** with top 10 scores (persists via `localStorage`)
- 📊 **Answer breakdown** after every game
- 📱 **Fully responsive** — works on mobile and desktop

---

## 📁 Project Structure

```
quiz-app/
│
├── index.html       # App shell & all screen templates
├── style.css        # Styling (dark theme, animations)
├── script.js        # Game logic, state, timer, scoring
├── questions.js     # Question bank (20 questions)
│
├── README.md        # This file
├── CONTRIBUTING.md  # Git workflow & branching guide
└── .gitignore       # Files to ignore in version control
```

---

## 🛠️ How to Run

No build tools or server required.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Open `index.html` in your browser:
   - Double-click the file, **or**
   - Use VS Code with Live Server extension

That's it! The app runs entirely in the browser.

---

## 🎮 How to Play

1. Enter your name on the welcome screen
2. Hit **Start Quiz**
3. Answer 10 randomised questions — you have 20 seconds per question
4. Selecting an option locks it in; the correct answer is highlighted
5. Click **Next Question** to advance
6. View your score, answer breakdown, and leaderboard at the end

---

## 📖 Technical Details

| Detail           | Value                          |
|------------------|--------------------------------|
| Language         | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Data Storage     | Browser `localStorage`         |
| External Deps    | Google Fonts (Sora, JetBrains Mono) |
| Browser Support  | All modern browsers            |
| Accessibility    | Keyboard navigation supported  |

---

## 🧩 Adding More Questions

Open `questions.js` and add an object to the `QUESTIONS` array:

```js
{
  category: "Your Category",
  question: "Your question text?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 0  // index of the correct option (0-based)
}
```

---

## 📜 License

Academic project — Group 13, Version Control System Subject.
