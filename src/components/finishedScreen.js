export default function FinishedScreen({
  points,
  maxQuestions,
  highscore,
  dispatch,
}) {
  const precent = (points / maxQuestions) * 100;
  return (
    <>
      <p className="result">
        you scored <strong>{points}</strong> out of{" "}
        <strong>{maxQuestions}</strong> {Math.floor(precent)}%
      </p>
      <p className="highscore">(HighScore : {highscore} points )</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
