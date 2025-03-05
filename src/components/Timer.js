import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const min = Math.floor(secondsRemaining / 60);
  const sec = Math.floor(secondsRemaining % 60);
  //
  useEffect(
    function () {
      function quizTimer() {
        dispatch({ type: "timer" });
      }
      const id = setInterval(quizTimer, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  //
  return (
    <div className="timer">
      {min < 10 ? "0" + min : min}: {sec < 10 ? "0" + sec : sec}
    </div>
  );
}
