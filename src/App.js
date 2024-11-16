import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 45;
const initialState = {
  // state for questions array
  questions: [],
  // statuses
  status: "loading",
  // INITIAL STATE FOR INDEX
  index: 0,
  //initial state
  answer: null,
  // points state
  points: 0,
  // highscore
  highscore: 0,
  // timer state
  timeRemaining: 10,
};

// reducer function
function reducer(state, action) {
  // switch statement
  switch (action.type) {
    // data received case
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    // case for failed data
    case "dataFailed":
      return {
        ...state,
        status: "failed",
      };

    // displaying question case
    case "displayQuestions":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    // answer case
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    // Case for next question
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    //case for finish
    case "Finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    // restart case
    case "Restart":
      return {
        ...state,
        points: 0,
        highscore: 0,
        status: "ready",
        answer: null,
        index: 0,
        timeRemaining: null,
      };

    // timer case
    // timer case
    case "timer":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
        message: "Time's up! Better luck next time!", // Add a timeout message
      };
    default:
  }
}

const App = () => {
  // Using useEffect load out questions from fake Api
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  // define the state using useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // destruction the state from the initial state
  const { questions, status, index, answer, points, highscore, timeRemaining } =
    state;

  const numQuestions = questions.length;

  // get the maximum points
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      {/* Header begins */}
      <Header />

      {/* Main component */}
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
