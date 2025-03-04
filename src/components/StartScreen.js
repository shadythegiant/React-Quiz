export default function StartScreen({ questions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{questions} questions to test your react knowledge </h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        {" "}
        Let's start{" "}
      </button>
    </div>
  );
}
