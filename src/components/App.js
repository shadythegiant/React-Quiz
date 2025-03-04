import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";

// -------------------------------------------------

const initialState = {
  questions: [],
  // status diff states : loading, error , ready , finished , active
  status: "loading",
  index: 0,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    // fetched data state
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    // quiz status
    case "start":
      return {
        ...state,
        status: "active",
      };
    // answer
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  // --------------------------- State ---------------------------------------

  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // ------------------------- UseEFFECT -------------------------------------

  useEffect(() => {
    fetch("http://localhost:40000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  // ---------------------------- JSX ------------------------
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
