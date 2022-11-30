/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';
import { useGetQuestionsQuery } from '../../features/dashboard/getQuizInfoApi';
import { useSubmitQuizMutation } from '../../features/quiz/quizPageApi';
import UpperButton from './UpperButton';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function LeftSideQuestions() {
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [checkBox, setCheckBox] = useState([]);

    const { id } = useParams();
    const { email } = useSelector((state) => state.auth);

    const { data } = useGetQuestionsQuery(id);
    const [submitQuiz, { data: submitRes }] = useSubmitQuizMutation();

    const navigate = useNavigate();

    const isSelected = (value, id2) => {
        for (let i = 0; i < answer.length; i += 1) {
            if (answer[i].userAnswer === value && answer[i].id === id2) return true;
        }
        return false;
    };

    const isChanged = (value, id2) => {
        for (let i = 0; i < checkBox.length; i += 1) {
            if (Array.isArray(checkBox[i]?.userAnswer)) {
                let temp = [];
                temp = temp.concat(checkBox[i].userAnswer);
                const index = temp.indexOf(value);
                if (index >= 0 && checkBox[i].id === id2) {
                    return true;
                }
            }
        }

        return false;
    };

    const handleChange = (eVal, correctAns, userAnswerr, mark, id1, type, indexx) => {
        if (type === 'choice') {
            if (eVal) {
                let check = false;
                for (let i = 0; i < answer.length; i += 1) {
                    if (answer[i].id === id1) {
                        check = true;
                        break;
                    }
                }

                if (!check) {
                    const updatedData = [...answer];
                    updatedData.push({
                        id: id1,
                        index: indexx,
                        mainAnswer: correctAns,
                        type,
                        userAnswer: userAnswerr,
                        mark,
                    });

                    setAnswer(updatedData);
                } else {
                    let temp = [];
                    temp = answer.map((elem) => {
                        if (elem.id === id1) {
                            return {
                                id: id1,
                                index: indexx,
                                type,
                                mainAnswer: correctAns,
                                userAnswer: userAnswerr,
                                mark,
                            };
                        }

                        return elem;
                    });

                    setAnswer(temp);
                }
            } else {
                const temp = answer.filter((elem) => elem?.id !== id1);
                setAnswer(temp);
            }
        } else if (type === 'checkbox') {
            if (eVal) {
                let check = false;
                for (let i = 0; i < checkBox.length; i += 1) {
                    if (checkBox[i].id === id1) {
                        check = true;
                        break;
                    }
                }

                if (!check) {
                    const updatedData = [...checkBox];
                    const temp = [];
                    temp.push(userAnswerr);

                    updatedData.push({
                        id: id1,
                        index: indexx,
                        mainAnswer: correctAns,
                        type,
                        userAnswer: temp,
                        mark,
                    });
                    setCheckBox(updatedData);
                } else {
                    let temp = [];
                    temp = checkBox.map((elem) => {
                        if (elem.id === id1) {
                            return {
                                id: id1,
                                index: indexx,
                                type,
                                mainAnswer: correctAns,
                                userAnswer: [...elem.userAnswer, userAnswerr],
                                mark,
                            };
                        }

                        return elem;
                    });

                    setCheckBox(temp);
                }
            } else {
                const temp = checkBox.filter((elem) => {
                    if (elem.id === id1) {
                        const index = elem.userAnswer.indexOf(userAnswerr);
                        if (index >= 0) {
                            elem.userAnswer.splice(index, 1);
                        }
                        return elem;
                    }
                    return elem;
                });
                setCheckBox(temp);
            }
        }
    };

    useEffect(() => {
        if (submitRes) {
            if (submitRes?.success) {
                swal({
                    title: 'Good job!',
                    text: submitRes?.message,
                    icon: 'success',
                    button: 'Ok',
                });
            } else {
                swal({
                    title: 'Oops',
                    text: submitRes?.message,
                    icon: 'warning',
                    dangerMode: true,
                });
            }
        }

        if (data?.success) {
            setQuestions(data?.message?.questions);
        }

        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', unloadCallback);
        return () => window.removeEventListener('beforeunload', unloadCallback);
    }, [data, submitRes]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const allData = [...answer, ...checkBox];

        allData.sort((a, b) => a.index < b.index);

        let totalMarks = 0;

        for (let i = 0; i < allData.length; i += 1) {
            if (allData[i].type === 'choice') {
                const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer);
                if (index >= 0) {
                    totalMarks += parseInt(allData[i].mark, 10);
                }
            } else if (allData[i].type === 'checkbox') {
                if (allData[i].userAnswer?.length === allData[i].mainAnswer?.length) {
                    let check = true;

                    for (let j = 0; j < allData[i].userAnswer.length; j += 1) {
                        const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer[j]);
                        if (index < 0) {
                            check = false;
                            break;
                        }
                    }

                    if (check) totalMarks += parseInt(allData[i].mark, 10);
                }
            }
        }

        const requestData = {
            email,
            quizId: id,
            marks: totalMarks,
            submitTime: Date.now(),
            submittedResult: [...allData],
        };

        console.log(requestData);

        submitQuiz(requestData);
    };

    const handleResult = () => {
        navigate(`/result/${id}`);
    };

    return (
        <div className="container overflow-hidden" id="quiz-page-leftSide">
            <UpperButton handleResult={handleResult} />

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
                                              name={`checkbox-${ques?._id}-${index1}`}
                                              value={opt}
                                              id={`checkbox${ques._id}-${index1}`}
                                              checked={isChanged(opt, ques._id)}
                                              onChange={(e) => {
                                                  handleChange(
                                                      e.target.checked,
                                                      ques?.answer,
                                                      e.target.value,
                                                      ques?.mark,
                                                      ques?._id,
                                                      ques.type,
                                                      index
                                                  );
                                              }}
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
                                              name={`${ques?._id}-${index1}`}
                                              id={`${ques?._id}-${index1}`}
                                              checked={isSelected(opt1, ques._id)}
                                              onChange={(e) => {
                                                  handleChange(
                                                      e.target.checked,
                                                      ques?.answer,
                                                      e.target.value,
                                                      ques?.mark,
                                                      ques?._id,
                                                      ques.type,
                                                      index
                                                  );
                                              }}
                                              value={opt1}
                                          />
                                          <label
                                              className="form-check-label"
                                              htmlFor={`${ques?._id}-${index1}`}
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
                <button type="submit" className="btn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
