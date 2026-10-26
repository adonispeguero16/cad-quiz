import { useState } from "react";

export default function Setup({ total, onStart }) {
  const [mode, setMode] = useState("random");
  const [count, setCount] = useState(20);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(20);
  const [randomOrder, setRandomOrder] = useState(false);

  const lo = Math.max(1, Math.min(from, to));
  const hi = Math.min(total, Math.max(from, to));
  const available = mode === "range" ? hi - lo + 1 : total;
  const n = Math.max(1, Math.min(count, available));

  return (
    <section className="card">
      <h2>Create a quiz</h2>

      <div className="tabs">
        <button className={mode === "random" ? "tab active" : "tab"} onClick={() => setMode("random")}>
          Random from all
        </button>
        <button className={mode === "range" ? "tab active" : "tab"} onClick={() => setMode("range")}>
          Pick a range
        </button>
      </div>

      {mode === "range" && (
        <div className="row">
          <label>From question
            <input type="number" min="1" max={total} value={from}
                   onChange={(e) => setFrom(+e.target.value || 1)} />
          </label>
          <label>To question
            <input type="number" min="1" max={total} value={to}
                   onChange={(e) => setTo(+e.target.value || 1)} />
          </label>
        </div>
      )}

      <label>Number of questions (max {available})
        <input type="number" min="1" max={available} value={count}
               onChange={(e) => setCount(+e.target.value || 1)} />
      </label>

      {mode === "range" && (
        <label className="check">
          <input type="checkbox" checked={randomOrder}
                 onChange={(e) => setRandomOrder(e.target.checked)} />
          Shuffle the order within the range
        </label>
      )}

      <button className="primary"
              onClick={() => onStart({ mode, count: n, from: lo, to: hi, randomOrder })}>
        Start quiz ({n} question{n > 1 ? "s" : ""})
      </button>
    </section>
  );
}
