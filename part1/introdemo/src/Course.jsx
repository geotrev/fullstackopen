const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((part) => <Part {...part} key={part.id} />);
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>Number of {total} exercises</strong>
    </p>
  );
};

export const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};
