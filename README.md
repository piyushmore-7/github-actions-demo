# 🎓 GitHub Actions - Hands-On Demo

Learn GitHub Actions step by step with 5 interactive lessons!

---

## 🚀 Quick Start (5 minutes)

### Step 1: Create a GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `github-actions-demo`
3. Keep it **Public** (Actions are free for public repos)
4. **DON'T** check "Add a README" (we already have one)
5. Click **Create repository**

### Step 2: Push This Code

```bash
# Navigate to the project folder
cd github-actions-demo

# Initialize git
git init
git add .
git commit -m "initial commit: GitHub Actions demo"

# Connect to your repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/github-actions-demo.git
git branch -M main
git push -u origin main
```

### Step 3: Watch It Run!

1. Go to your repo on GitHub
2. Click the **Actions** tab
3. You'll see workflows running! 🎉

---

## 📚 Lessons

### Lesson 1: Hello World (`1-hello-world.yml`)
**Concept:** Basic workflow structure
- Triggers on every push
- Prints system info and GitHub context
- ✅ Should pass immediately

### Lesson 2: Run Tests (`2-run-tests.yml`)
**Concept:** Checkout code, run npm scripts
- Uses `actions/checkout` and `actions/setup-node`
- Runs your test suite
- ✅ Should pass (all tests pass)

### Lesson 3: Pipeline (`3-pipeline.yml`)
**Concept:** Multi-job pipeline with dependencies
- 4 jobs: lint → test → build → deploy
- Uses `needs` for job ordering
- Uses artifacts to pass files between jobs
- ✅ Should pass (watch the pipeline in Actions tab)

### Lesson 4: Manual Trigger (`4-manual-trigger.yml`)
**Concept:** workflow_dispatch, inputs, secrets
- Won't run automatically
- Go to Actions → select this workflow → click "Run workflow"
- Fill in the form fields and click Run
- Try adding a secret in Settings → Secrets

### Lesson 5: Debug Challenge (`5-debug-challenge.yml`)
**Concept:** Debugging failed workflows
- ❌ This workflow has an **intentional bug**!
- Go to Actions tab → click the failed run → read the error log
- Fix the bug in the YAML file
- Push again and watch it turn green ✅

---

## 🧪 Try These Exercises

After going through the lessons, try these:

### Exercise 1: Break a Test
1. Open `src/index.js`
2. In `addClient()`, remove the validation (delete the if/throw)
3. Push → Watch the test workflow **fail**
4. Fix it → Push → Watch it **pass** again

### Exercise 2: Add a New Test
1. Open `tests/run-tests.js`
2. Add a new test at the bottom
3. Push → Check if your test shows up in the Actions log

### Exercise 3: Add a Scheduled Workflow
Create `.github/workflows/6-scheduled.yml`:
```yaml
name: "6️⃣ Scheduled Job"
on:
  schedule:
    - cron: '0 9 * * 1'    # Every Monday at 9 AM UTC
  workflow_dispatch:         # Also allow manual trigger

jobs:
  weekly-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
      - name: Report
        run: echo "Weekly health check passed!"
```

### Exercise 4: Fix Lesson 5
1. Go to Actions tab → find the failed Lesson 5 run
2. Click it → read the error message
3. Open `.github/workflows/5-debug-challenge.yml`
4. Fix line 38 (`node src/missing-file.js` → `node src/index.js`)
5. Push and verify it passes!

---

## 📁 Project Structure

```
github-actions-demo/
├── .github/
│   └── workflows/
│       ├── 1-hello-world.yml      # Lesson 1: Basics
│       ├── 2-run-tests.yml        # Lesson 2: Testing
│       ├── 3-pipeline.yml         # Lesson 3: Multi-job
│       ├── 4-manual-trigger.yml   # Lesson 4: Manual + Secrets
│       └── 5-debug-challenge.yml  # Lesson 5: Debugging
├── src/
│   └── index.js                   # CRM utility functions
├── tests/
│   └── run-tests.js               # Test suite
├── scripts/
│   ├── lint-check.js              # Linter
│   └── build.js                   # Build script
├── package.json
└── README.md
```

---

## 💡 Key Concepts Cheat Sheet

| Concept | Syntax |
|---------|--------|
| Run on push | `on: push` |
| Run on PR | `on: pull_request` |
| Manual trigger | `on: workflow_dispatch` |
| Schedule | `on: schedule: [{cron: '...'}]` |
| Use an action | `uses: actions/checkout@v4` |
| Run a command | `run: npm test` |
| Job depends on another | `needs: test` |
| Only on main branch | `if: github.ref == 'refs/heads/main'` |
| Access secret | `${{ secrets.MY_SECRET }}` |
| Always run step | `if: always()` |
| Continue on error | `continue-on-error: true` |
| Save files | `uses: actions/upload-artifact@v4` |
| Get saved files | `uses: actions/download-artifact@v4` |

---

## ❓ Common Issues

**Workflow not running?**
- Check the file is in `.github/workflows/`
- Check the trigger matches what you did (push to correct branch?)
- YAML is indent-sensitive — use 2 spaces, not tabs

**Tests pass locally but fail in Actions?**
- Different Node version? Check `actions/setup-node` version
- Missing files? Make sure everything is committed to git

**Want to skip a workflow run?**
- Add `[skip ci]` to your commit message

---

Happy learning! 🎉
