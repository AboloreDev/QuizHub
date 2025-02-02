import React from "react";

const Progress = ({
  numQuestions,
  index,
  answer,
  points,
  maxPossiblePoints,
}) => {
  const answeredQuestion = answer !== null;
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={answeredQuestion ? index + 1 : index}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
