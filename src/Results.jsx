export default function Results({ score, total, onRetry, onNew }) {
  const pct = Math.round((score / total) * 100);
  return (
    <section className="card center">
      <h2>Quiz complete</h2>
      <p className="big">{score} / {total}</p>
      <p>{pct}%</p>
      <button className="primary" onClick={onRetry}>New quiz, same settings</button>
      <button onClick={onNew}>Change settings</button>
    </section>
  );
}
