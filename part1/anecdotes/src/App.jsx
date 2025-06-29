import { useState, useCallback, useMemo, memo } from "react";

const HighestVotedAnecdote = memo(({ anecdotes, votes }) => {
  const highestVote = Math.max(...votes);

  if (highestVote === 0) {
    return <p>No votes yet</p>;
  }

  const anecdote = anecdotes[votes.indexOf(highestVote)];

  return <p>{anecdote}</p>;
});

const App = () => {
  const anecdotes = useMemo(
    () => [
      "If it hurts, do it more often.",
      "Adding manpower to a late software project makes it later!",
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "Premature optimization is the root of all evil.",
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      "The only way to go fast, is to go well.",
    ],
    []
  );

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVoteClick = useCallback(() => {
    setVotes((prevVotes) => {
      const newVotes = [...prevVotes];
      newVotes[selected] += 1;
      return newVotes;
    });
  }, [selected]);

  const handleNextClick = useCallback(() => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }, [anecdotes.length]);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button type="button" onClick={handleVoteClick}>
        vote
      </button>
      <button type="button" onClick={handleNextClick}>
        next anecdote
      </button>
      <h2>Highest voted anecdote</h2>
      <HighestVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  );
};

export default App;
