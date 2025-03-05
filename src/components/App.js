import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./finishedScreen";
import Timer from "./Timer";

// -------------------------------------------------

const initialState = {
  questions: [],
  // status diff states : loading, error , ready , finished , active
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 400,
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
      // grabing the current question using the index state

      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  // --------------------------- State ---------------------------------------

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // ------------------------- UseEFFECT -------------------------------------

  useEffect(() => {
    fetch("http://localhost:40000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const maxQuestions = questions.reduce((prev, curr) => curr.points + prev, 0);

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
          <>
            <Progress
              numQuestion={numQuestions}
              maxQuestions={maxQuestions}
              index={index}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestions}
              />
            </footer>
          </>
        )}
        {
          //finish screen
          status === "finished" && (
            <FinishedScreen
              points={points}
              maxQuestions={maxQuestions}
              highscore={highscore}
              dispatch={dispatch}
            />
          )
        }
      </Main>
    </div>
  );
}

export default App;
