const Question = ({ questions, answer, dispatch }) => {
  const answeredQuestion = answer !== null;
  return (
    <div>
      <h3>{questions.question}</h3>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answeredQuestion
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={answeredQuestion}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
