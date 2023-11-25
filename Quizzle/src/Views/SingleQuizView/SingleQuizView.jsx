import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import './SingleQuizView.css'
import Timer from "../../components/Timer/Timer";


const SingleQuizView = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0)
  const [timerFinished, setTimerFinished] = useState(false);
  const activeQuestionIndex = userAnswers.length;

  useEffect(() => {
    getQuizById(id)
      .then((fetchedQuiz) => {
        setQuiz(fetchedQuiz);
      })
      .catch((error) => {
        console.error("Error fetching quiz details:", error);
        setQuiz(null);
      });
  }, [id]);
  const quizIsComplete = activeQuestionIndex === quiz?.questions.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
  useEffect(() => {
    if (userAnswers[activeQuestionIndex - 1]?.isCorrect) {
      setScore((score) => score + 1);
    }
  }, [userAnswers, activeQuestionIndex]);

  const handleTimerFinish = () => {
    setTimerFinished(true);
  };

  if (quizIsComplete || timerFinished) {
    const scorePoints = Math.ceil(score / quiz?.questions.length * 100)
    return (
      <div id="summary">
        <h2>Quiz Completed!</h2>
        <h2>You score {scorePoints}</h2>
      </div>
    );
  }

  return (
    <>
      <div id="quiz">
        <div id="question">
          <div className="flex justify-between items-center">
            <p >{quiz?.title}</p>
            <Timer onTimerFinish={handleTimerFinish}></Timer>
          </div>
          <h2>{quiz?.questions[activeQuestionIndex].question}</h2>
          <ul id="answers" className="grid grid-cols-1 divide-y">
            {quiz?.questions[activeQuestionIndex].answers.map((answer) => (
              <div key={answer.text} >
                <button className="border-2 rounded-md border-black place-content-stretch"
                  onClick={() => handleSelectAnswer(answer)}>
                  {answer.text}
                </button>
              </div>
            ))}
          </ul>
          <p className="text-right">Max points available 100</p>
        </div>
      </div>
    </>
  )
}

export default SingleQuizView
