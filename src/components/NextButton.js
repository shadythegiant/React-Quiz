export default function NextButton({ answer, dispatch, index, numQuestion }) {
  const noAnswer = answer === null;
  if (noAnswer) return;

  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "nextQuestion",
          })
        }
      >
        Next
      </button>
    );

  if (index === numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "finish",
          })
        }
      >
        finish
      </button>
    );
}
