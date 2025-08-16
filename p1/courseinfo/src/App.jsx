import './App.css';
import Content from './Content';
import Header from './Header';
import Total from './Total';

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        count: 10
      },
      {
        name: 'Using props to pass data',
        count: 7
      },
      {
        name: 'State of a component',
        count: 14
      }
    ]
  };

  let total = 0;
  for (let part of course.parts){
    total += part.count;
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={total}/>
    </div>
  );
}

export default App
