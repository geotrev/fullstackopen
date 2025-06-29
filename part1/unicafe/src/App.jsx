import { useState } from "react";

function calculateAverage(good, neutral, bad) {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return (good * 1 + neutral * 0 + bad * -1) / total;
}

function positivePercentage(good, neutral, bad) {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return (good / total) * 100;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button type="button" onClick={() => setGood(good + 1)}>
          good
        </button>
        <button type="button" onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button type="button" onClick={() => setBad(bad + 1)}>
          bad
        </button>
      </div>
      <h2>statistics</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>all {good + neutral + bad}</li>
        <li>average {calculateAverage(good, neutral, bad)}</li>
        <li>positive {positivePercentage(good, neutral, bad)}%</li>
      </ul>
    </div>
  );
};

export default App;
