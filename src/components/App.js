import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";

// -------------------------------------------------

const initialState = {
  questions: [],
  // status diff states : loading, error , ready , finished , active
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    //
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

    default:
      throw new Error("unknown action");
  }
}

function App() {
  // --------------------------- State ---------------------------------------

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  // ------------------------- UseEFFECT -------------------------------------

  useEffect(() => {
    fetch("http://localhost:40000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  // ---------------------------- JSX ------------------------
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
