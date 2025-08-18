const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(item => (<Part key={item.id} part={item}/>))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
    const totalVal = parts.reduce((accum, current) => accum += current.exercises, 0);
    return (<p>Number of exercises {totalVal}</p>);
};

const Course = function({course}){
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </div>
    );
};

export default Course;