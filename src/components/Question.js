function Question({ question, dispatch, answer }) {
  const isSelected = answer !== null;
  console.log(question.correctOption);
  return (
    <div>
      <h3>{question.question}</h3>
      <div className="options ">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer " : ""} ${
              isSelected
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={option}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index });
            }}
            disabled={isSelected}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Question;
