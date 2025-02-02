import React, { useEffect } from "react";

const Timer = ({ dispatch, timeRemaining }) => {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      // clean up function
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
};

export default Timer;
