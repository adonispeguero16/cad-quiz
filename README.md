# ServiceNow CAD Quiz

React + Vite quiz app built from your PDF.

## Run in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Open the terminal (Ctrl+`) and run:
   ```
   npm install
   npm run dev
   ```
3. Open the URL it prints (usually http://localhost:5173).

## Notes
- Questions live in `src/questions.json` (219 questions).
- 132 correct answers were read from the "Most Voted" markers in the PDF.
- 87 questions had no marker, so their answers were filled in as best guesses
  (they show a warning after answering and have `"inferred": true` in the JSON).
  Fix any in `scripts/answers_manual.json`, then re-run `scripts/build.py`
  or edit `src/questions.json` directly.
- Questions 18, 117 and 118 were images in the PDF; their content was re-typed.
