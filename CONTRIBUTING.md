# 🌿 Git Workflow & Contributing Guide

> Group 13 — Quiz Application Version Control

This document defines the branching strategy and Git workflow for the project.

---

## 🌳 Branch Structure

```
main
└── develop
    ├── feature/question-bank       (Vanshika / Vineet)
    ├── feature/quiz-ui             (Vinayak)
    ├── feature/timer-logic         (Vedant)
    ├── feature/leaderboard         (Vihaan)
    └── feature/results-screen      (Vinayak / Vihaan)
```

| Branch              | Purpose                                  |
|---------------------|------------------------------------------|
| `main`              | Stable, production-ready code only       |
| `develop`           | Integration branch — all features merge here first |
| `feature/*`         | One branch per feature / task            |
| `hotfix/*`          | Emergency fixes applied directly to main |

---

## 🔁 Workflow Step by Step

### 1. Clone the repo (first time only)
```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

### 2. Always pull latest changes before starting work
```bash
git checkout develop
git pull origin develop
```

### 3. Create your feature branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make your changes, then stage and commit
```bash
git add .
git commit -m "feat: short description of what you did"
```

### 5. Push your branch to GitHub
```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request on GitHub
- Base branch: `develop`
- Compare: your feature branch
- Add a description of what you changed
- Request a review from the GitHub Manager (Vedant)

### 7. After review, merge into `develop`

### 8. Periodic merges from `develop` → `main` for stable releases

---

## ✍️ Commit Message Convention

Use the following prefixes:

| Prefix     | When to use                              |
|------------|------------------------------------------|
| `feat:`    | Adding a new feature                     |
| `fix:`     | Fixing a bug                             |
| `style:`   | CSS / UI changes only                    |
| `docs:`    | Updating README or documentation         |
| `test:`    | Adding or updating tests                 |
| `refactor:`| Code cleanup, no functional change       |
| `chore:`   | Dependency updates, config changes       |

**Examples:**
```
feat: add 20-second countdown timer
fix: correct answer index off-by-one error
style: improve option button hover animation
docs: update README with run instructions
```

---

## 🔀 Feature → Develop PR Checklist

Before opening a Pull Request:
- [ ] Code runs without errors
- [ ] Feature works as expected
- [ ] No console errors in the browser
- [ ] Commit messages follow the convention above
- [ ] Branch is up to date with `develop`

---

## 🏷️ Release Tags

When merging `develop` → `main`, the GitHub Manager tags the release:

```bash
git tag -a v1.0.0 -m "Initial release with all core features"
git push origin v1.0.0
```

Version format: `vMAJOR.MINOR.PATCH`

| Increment | When                                    |
|-----------|-----------------------------------------|
| MAJOR     | Complete rewrite / breaking change      |
| MINOR     | New feature added                       |
| PATCH     | Bug fix or small improvement            |

---

## ⚠️ Rules

1. **Never commit directly to `main`** — always go through `develop`
2. **Never force-push** to `main` or `develop`
3. **Resolve merge conflicts locally** before pushing
4. Each team member is responsible for their own feature branch
5. If stuck, open an issue on GitHub — don't leave broken code on `develop`
