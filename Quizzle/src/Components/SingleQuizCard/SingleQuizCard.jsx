import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { ROLE_CHECK, dateNow } from "../../common/constants";
import RemainingTime from "../RemainingTime/RemainingTime";

const SingleCard = ({ image, quiz }) => {

  const { userData } = useContext(AuthContext);
  const isEducator = userData?.role === ROLE_CHECK.educator;

  const showTimer = userData?.assignedQuizzes ? Object.keys(userData?.assignedQuizzes).includes(quiz?.id) : false;
  let timeLimit = 0;
  let score = 0;
  if (showTimer) {
    timeLimit = Math.floor((userData?.assignedQuizzes[quiz?.id][1] - dateNow) / 1000)
  }
  const showScore = userData?.score ? Object.keys(userData?.score).includes(quiz?.title) : false;
  if (showScore) {
    score = userData?.score[quiz?.title].score
  }

  const rejectQuiz = () => { }

  const showSummary = userData?.score ? Object.keys(userData?.score).includes(quiz?.title) : false

  return (
    <>
      {quiz && <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="relative">
          <img src={image} alt="" className="w-full" />
          <div className="absolute top-0 right-0 z-10">
            {showTimer
              ? <RemainingTime
                timeLimit={timeLimit}
                username={userData?.username}
                id={quiz?.id}
                title={quiz?.title}
                score={0}
                category={quiz?.category} />
              : <div className="text-right mr-4 mt-2 text-lg">You score {score}</div>}
          </div>
        </div>
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <Link
              to={`/singleQuizView/${quiz?.id}`}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-black sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
              {quiz?.title}
            </Link>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {quiz?.description}
          </p>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {`In this quiz you have ${quiz?.timeLimit} seconds to resolve ${quiz?.question?.length} questions`}
          </p>
          <Link
            to={`/singleQuizView/${quiz?.id}`}
            className="inline-block mx-1 px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
          >
            Enroll quiz
          </Link>
          {isEducator && <Link
            to={`/assign-quiz/${quiz?.id}`}
            className="inline-block mx-1 px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
          >
            Assign quiz
          </Link>}
          {showTimer && <button
            className="inline-block mx-1 px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
            onClick={rejectQuiz}
          >
            Reject Quiz
          </button>}
          {showSummary && <Link
            to={`/summary/${quiz?.id}`}
            className="inline-block mx-1 px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
          >
            Summary
          </Link>}
        </div>
      </div>}
    </>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  quiz: PropTypes.object.isRequired || undefined,
};

export default SingleCard;