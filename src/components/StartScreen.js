const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to QuizHub! 🎉</h2>
      <h4>
        {numQuestions} Questions to test your knowledge and challenge your mind
        🌟
      </h4>
      <p className="qizz">Click "Start Quiz" to begin your journey.</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "displayQuestions" })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
