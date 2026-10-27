import { useState } from "react";

export default function Results({ score, total, history, onRetry, onNew }) {
  const [onlyWrong, setOnlyWrong] = useState(false);
  const pct = Math.round((score / total) * 100);
  const shown = onlyWrong ? history.filter((h) => !h.correct) : history;

  const label = (q, key) => {
    const idx = q.options.findIndex((o) => o.key === key);
    return `${String.fromCharCode(65 + idx)}. ${q.options[idx].text}`;
  };

  return (
    <>
      <section className="card center">
        <h2>Quiz complete</h2>
        <p className="big">{score} / {total}</p>
        <p>{pct}%</p>
        <button className="primary" onClick={onRetry}>New quiz, same settings</button>
        <button onClick={onNew}>Change settings</button>
      </section>

      <section className="card review">
        <div className="top">
          <h2>Review your answers</h2>
          <label className="check">
            <input type="checkbox" checked={onlyWrong}
                   onChange={(e) => setOnlyWrong(e.target.checked)} />
            Only incorrect
          </label>
        </div>
        {shown.length === 0 && <p>No incorrect answers. Nice work!</p>}
        {shown.map((h, i) => (
          <div key={h.q.id} className={h.correct ? "item ok" : "item bad"}>
            <p className="qtext">
              <b>{h.correct ? "✓" : "✗"} #{h.q.id}</b> {h.q.question}
            </p>
            {h.q.code && <pre>{h.q.code}</pre>}
            <p>
              <b>Your answer:</b>{" "}
              {[...h.selected].sort().map((k) => (
                <span key={k} className="ans">{label(h.q, k)}</span>
              ))}
            </p>
            {!h.correct && (
              <p>
                <b>Correct answer:</b>{" "}
                {h.q.answers.map((k) => (
                  <span key={k} className="ans right">{label(h.q, k)}</span>
                ))}
              </p>
            )}
            {h.q.inferred && <small>This answer wasn't marked in the PDF (best guess).</small>}
          </div>
        ))}
      </section>
    </>
  );
}
