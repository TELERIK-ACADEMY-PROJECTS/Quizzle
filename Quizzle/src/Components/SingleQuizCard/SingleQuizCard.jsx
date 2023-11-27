import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SingleCard = ({ image, quiz }) => {

  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-black sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {quiz?.title}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {quiz?.description}
          </p>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {`In this quiz you have ${quiz?.timeLimit} seconds to resolve ${quiz?.question?.length} questions`}
          </p>
          <Link
            to={`/singleQuizView/${quiz?.id}`}
            className="inline-block px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
          >
            Enroll quiz
          </Link>
        </div>
      </div>
      {/*  */}
    </>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  quiz: PropTypes.object.isRequired || undefined,
};

export default SingleCard;