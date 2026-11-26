# How to work on Syllabus Slayer (without breaking things)

**Golden rule: never work directly on `main`.** `main` is the version that works. All changes go through a branch and a Pull Request (PR).

---

## One-time setup

```bash
git clone <repo-url>
cd SST-Slayer
npm install
npx expo start      # scan the QR code with Expo Go to check it runs
```

---

## Every time you work on something

**1. Get the latest code**
```bash
git checkout main
git pull
```

**2. Make your own branch** (name it after the task)
```bash
git checkout -b add-level-2-questions
```

**3. Make your changes, then save them**
```bash
git status                 # see what you changed
git add .
git commit -m "Add 10 questions for level 2"
```

**4. Push your branch**
```bash
git push -u origin add-level-2-questions
```

**5. Open a Pull Request on GitHub**
After pushing, GitHub shows a green "Compare & pull request" button. Click it, write one or two lines about what you changed, and submit. Wait for someone to review it, then it gets merged into `main`.

**6. After it is merged, update your computer**
```bash
git checkout main
git pull
```
Then start the next task from step 2.

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Run `git pull` on `main` before starting anything new | Push directly to `main` |
| One branch per task | Do five unrelated things on one branch |
| Write clear commit messages ("Fix hearts display") | Write "stuff", "changes", "asdf" |
| Test the app (`npx expo start`) before opening a PR | Open a PR for code you haven't run |
| Commit small and often | Work for 3 days and commit once |
| Tell the team which file you are editing, especially `App.js` | Both edit the same lines at the same time |

**Never commit:** `node_modules/`, `.env` files, passwords, API keys, or `.apk` files. The `.gitignore` already blocks most of these, so do not delete it.

---

## If something goes wrong

- **"I'm not sure which branch I'm on"** → `git status` (the first line tells you).
- **"I edited files while on `main` by mistake"** → don't commit. Run `git checkout -b my-new-branch`. Your changes come with you to the new branch.
- **"Merge conflict"** → don't panic and don't delete things. Ask for help, or open the conflicted file, look for the `<<<<<<<` markers, keep the right version, remove the markers, then `git add .` and `git commit`.
- **"I pushed something I shouldn't have"** (especially a password or key) → tell the repo owner immediately. The key must be changed; deleting the file is not enough.
- **Stuck on anything** → ask before running commands you don't understand, especially anything with `--force` or `reset --hard`.
