import { useState } from 'react'

function App() {
  const anecdotes = [
    {
      anecdote: 'If it hurts, do it more often.',
      count: 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      count: 0
    },
    {
      anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      count: 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      count: 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      count: 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      count: 0
    },
    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      count: 0
    },
    {
      anecdote: 'The only way to go fast, is to go well.',
      count: 0
    },
  ];

  const [selected, setSelected] = useState(0);
  const [anecdoteState, updateAnecdotes] = useState(anecdotes);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <>
     <div>{anecdoteState[selected].anecdote}</div>
     <p>has {anecdoteState[selected].count} votes</p>
     <button onClick={() => {
        const copy = [...anecdoteState];
        copy[selected].count += 1;
        updateAnecdotes(copy);
     }}>Vote
     </button>
     <button onClick={() => {setSelected(getRandom(0, anecdotes.length))}}>Next anecdote</button>
     <MostPopularAnecdote anecdoteState={anecdoteState} />
    </>
  )
}

const MostPopularAnecdote = ({anecdoteState}) => {
  // Find most popular anecdote
  let bestAnecdote = anecdoteState[0];
  for (let anecdote of anecdoteState){
    if (anecdote.count > bestAnecdote.count){
      bestAnecdote = anecdote;
    }
  }

  return (
    <>
      <p>Anecdote with most votes</p>
      <p>{bestAnecdote.anecdote}</p>
      <p>has {bestAnecdote.count} votes</p>
    </>
  );
};

export default App
