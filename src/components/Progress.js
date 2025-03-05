export default function Progress({
  index,
  numQuestion,
  maxQuestions,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestion}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question {index + 1} / {numQuestion}{" "}
      </p>

      <p>
        {points} / {maxQuestions}
      </p>
    </header>
  );
}
