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

const Button = ({ onClick, children, ...props }) => {
  return (
    <button onClick={onClick} {...props} type="button">
      {children}
    </button>
  );
};

const StatisticLine = ({ value, children }) => {
  return (
    <>
      <td>{children}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticLine value={good}>good</StatisticLine>
          </tr>
          <tr>
            <StatisticLine value={neutral}>neutral</StatisticLine>
          </tr>
          <tr>
            <StatisticLine value={bad}>bad</StatisticLine>
          </tr>
          <tr>
            <StatisticLine value={good + neutral + bad}>all</StatisticLine>
          </tr>
          <tr>
            <StatisticLine value={calculateAverage(good, neutral, bad)}>
              average
            </StatisticLine>
          </tr>
          <tr>
            <StatisticLine value={positivePercentage(good, neutral, bad)}>
              % positive
            </StatisticLine>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)}>good</Button>
        <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
        <Button onClick={() => setBad(bad + 1)}>bad</Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
