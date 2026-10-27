import { useState } from "react";

export default function Quiz({ quiz, onFinish, onQuit }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [history, setHistory] = useState([]);

  const q = quiz[i];
  const isCorrect = (sel) =>
    sel.length === q.answers.length && q.answers.every((a) => sel.includes(a));

  const submit = (sel) => {
    setSelected(sel);
    setChecked(true);
    const ok = isCorrect(sel);
    if (ok) setScore((s) => s + 1);
    setHistory((h) => [...h, { q, selected: sel, correct: ok }]);
  };

  const choose = (key) => {
    if (checked) return;
    if (!q.multi) return submit([key]);
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  };

  const next = () => {
    if (i + 1 >= quiz.length) return onFinish(score, history);
    setI(i + 1);
    setSelected([]);
    setChecked(false);
  };

  const letter = (idx) => String.fromCharCode(65 + idx);
  const correctLetters = q.options
    .map((o, idx) => (q.answers.includes(o.key) ? letter(idx) : null))
    .filter(Boolean)
    .join(", ");

  const cls = (key) => {
    const picked = selected.includes(key);
    if (!checked) return picked ? "option selected" : "option";
    if (q.answers.includes(key)) return "option correct";
    return picked ? "option wrong" : "option dim";
  };

  return (
    <section className="card">
      <div className="top">
        <span>Question {i + 1} of {quiz.length} · #{q.id} in PDF</span>
        <span>Score: {score}</span>
        <button className="link" onClick={onQuit}>Quit</button>
      </div>
      <div className="bar"><div style={{ width: `${(i / quiz.length) * 100}%` }} /></div>

      <h3 className="question">{q.question}</h3>
      {q.code && <pre>{q.code}</pre>}
      {q.multi && <p className="hint">Select {q.pick} answers{!checked && `, then press Check`}.</p>}

      <div className="options">
        {q.options.map((o, idx) => (
          <button key={o.key} className={cls(o.key)} onClick={() => choose(o.key)}>
            <b>{letter(idx)}.</b> {o.text}
          </button>
        ))}
      </div>

      {q.multi && !checked && (
        <button className="primary" disabled={selected.length === 0} onClick={() => submit(selected)}>
          Check answer
        </button>
      )}

      {checked && (
        <div className={isCorrect(selected) ? "feedback ok" : "feedback bad"}>
          {isCorrect(selected) ? "✓ Correct!" : `✗ Incorrect. Correct answer: ${correctLetters}`}
          {q.inferred && (
            <small>This answer wasn't marked in the PDF; it is a best-guess answer, so double-check it.</small>
          )}
          <button className="primary" onClick={next}>
            {i + 1 >= quiz.length ? "See results" : "Next question"}
          </button>
        </div>
      )}
    </section>
  );
}
