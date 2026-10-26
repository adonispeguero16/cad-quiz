import { useState } from "react";
import questions from "./questions.json";
import Setup from "./Setup.jsx";
import Quiz from "./Quiz.jsx";
import Results from "./Results.jsx";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [config, setConfig] = useState(null);

  const start = (cfg) => {
    const pool = cfg.mode === "range"
      ? questions.filter((q) => q.id >= cfg.from && q.id <= cfg.to)
      : questions;
    const picked = shuffle(pool).slice(0, cfg.count);
    setQuiz(cfg.mode === "range" && !cfg.randomOrder
      ? picked.sort((a, b) => a.id - b.id) : picked);
    setConfig(cfg);
    setScore(0);
    setScreen("quiz");
  };

  return (
    <main className="app">
      <h1>ServiceNow CAD Quiz</h1>
      {screen === "setup" && <Setup total={questions.length} onStart={start} />}
      {screen === "quiz" && (
        <Quiz quiz={quiz} onFinish={(s) => { setScore(s); setScreen("results"); }}
              onQuit={() => setScreen("setup")} />
      )}
      {screen === "results" && (
        <Results score={score} total={quiz.length}
                 onRetry={() => start(config)} onNew={() => setScreen("setup")} />
      )}
    </main>
  );
}
