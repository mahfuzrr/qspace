/* eslint-disable no-underscore-dangle */
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGetQuestionsQuery } from '../../features/dashboard/getQuizInfoApi';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function LeftSideQuestions() {
    const [questions, setQuestions] = useState([]);

    const { id } = useParams();

    const { data } = useGetQuestionsQuery(id);

    useEffect(() => {
        // console.log(data);
        if (data?.success) {
            setQuestions(data?.message?.questions);
        }
    }, [data]);

    return (
        <div className="container overflow-hidden" id="quiz-page-leftSide">
            <div
                className="container d-flex justify-content-end mt-3 gap-3"
                id="quiz-page-upper-btn"
            >
                <button type="button" className="btn">
                    Standings
                </button>
                <button type="button" className="btn">
                    Result
                </button>
            </div>

            <div className="container" id="page-all-questions">
                {questions.map((ques, index) => (
                    <div className="container-fluid single-question" key={ques._id}>
                        <p className="question-no">Question {index + 1}</p>
                        <div className="container p-0 single-main-question">
                            {parse(ques.question)}
                            <span className="question-marks">Mark: {ques.mark}</span>
                        </div>

                        {/* <!-- Options --> */}
                        <div className="container p-0 question-page-options">
                            {ques?.type === 'checkbox'
                                ? ques?.options.map((opt, index1) => (
                                      <div
                                          className="form-check form-check-custom-style"
                                          key={uuidv4()}
                                      >
                                          <input
                                              className="form-check-input"
                                              type="checkbox"
                                              value={opt}
                                              id={`checkbox${ques._id}-${index1}`}
                                          />
                                          <label
                                              className="form-check-label"
                                              htmlFor={`checkbox${ques._id}-${index1}`}
                                          >
                                              {opt}
                                          </label>
                                      </div>
                                  ))
                                : ques?.options.map((opt1, index1) => (
                                      <div
                                          className="form-check form-check-custom-style form-radio-custom-style"
                                          key={uuidv4()}
                                      >
                                          <input
                                              className="form-check-input"
                                              type="radio"
                                              name={`options${ques?._id}${index}`}
                                              id={`${ques?._id}${index1}`}
                                              value={opt1}
                                          />
                                          <label
                                              className="form-check-label"
                                              htmlFor={`${ques?._id}${index1}`}
                                          >
                                              {opt1}
                                          </label>
                                      </div>
                                  ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="container" id="submit-answer">
                <button type="submit" className="btn">
                    Submit
                </button>
            </div>
        </div>
    );
}
