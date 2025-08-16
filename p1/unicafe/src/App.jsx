import { useState } from 'react'
import './App.css'
import Button from './Button';
import Statistics from './Statistics';

function App() {
  const feedbacks = [
    {
      category: "good",
      count: 0,
      value: 1,
    },
    {
      category: "neutral",
      count: 0,
      value: 0
    },
    {
      category: "bad",
      count: 0,
      value: -1
    }
  ];

  const [feedbacksState, updateFeedbacks] = useState(feedbacks);
  const [statistics, updateStatistics] = useState({
    totalCount: 0,
    totalValue: 0,
    positiveCount: 0
  });
  const updateFunctions = feedbacks.map((item, index) => {
    // Create a copy of original feedback state and update state with that
    return () => {
      const feedbacksCopy = [...feedbacksState];
      feedbacksCopy[index].count += 1;
      updateFeedbacks(feedbacksCopy);

      // Update statistics
      const statisticsCopy = {...statistics};
      statisticsCopy.totalCount += 1;
      statisticsCopy.totalValue += item.value;
      statisticsCopy.positiveCount += item.value === 1 ? 1 : 0;
      updateStatistics(statisticsCopy);
    }
  });

  return (
    <>
      <p>give feedback</p>
      {feedbacksState.map((item, index) => {
        return <Button key={index} onClick={updateFunctions[index]} category={item.category}/>;;
      })}
      <p>statistics</p>
      <Statistics feedbacksState={feedbacksState} statistics={statistics}/>
    </>
  )
}

export default App
