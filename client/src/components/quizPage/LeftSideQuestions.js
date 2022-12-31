/* eslint-disable no-nested-ternary */
/* eslint-disable no-unreachable */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useGetQuestionsQuery } from '../../features/dashboard/getQuizInfoApi';
import { useSubmitQuizMutation } from '../../features/quiz/quizPageApi';
import UpperButton from './UpperButton';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function LeftSideQuestions() {
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [checkBox, setCheckBox] = useState([]);
    const [blankAns, setBlankAns] = useState([]);
    const [allFiles, setAllFiles] = useState({});

    const { id } = useParams();
    const { email } = useSelector((state) => state.auth);

    const { data } = useGetQuestionsQuery(id);
    const [submitQuiz, { data: submitRes }] = useSubmitQuizMutation();

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
        // console.log(eVal, correctAns, JSON.stringify(userAnswerr), mark, id1, type, indexx);
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
                        mainAnswer: [...correctAns],
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
                                mainAnswer: [...correctAns],
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
        } else if (type === 'check') {
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
                        mainAnswer: [...correctAns],
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
                                mainAnswer: [...correctAns],
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

    const customIndexOf = (mainAnswer, val) => {
        for (let i = 0; i < mainAnswer?.length; i += 1) {
            if (mainAnswer[i]?.input === val) return i;
        }

        return -1;
    };

    const anotherSubmission = (allData) => {
        allData.sort((a, b) => a.index < b.index);
        // return;

        let totalMarks = 0;

        for (let i = 0; i < allData.length; i += 1) {
            if (allData[i].type === 'choice') {
                // const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer);
                const index = customIndexOf(allData[i].mainAnswer, allData[i].userAnswer);
                if (index >= 0) {
                    totalMarks += parseInt(allData[i].mark, 10);
                }
            } else if (allData[i].type === 'check') {
                if (allData[i].userAnswer?.length === allData[i].mainAnswer?.length) {
                    let check = true;

                    for (let j = 0; j < allData[i].userAnswer.length; j += 1) {
                        // const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer[j]);
                        const index = customIndexOf(
                            allData[i].mainAnswer,
                            allData[i].userAnswer[j]
                        );
                        if (index < 0) {
                            check = false;
                            break;
                        }
                    }

                    if (check) totalMarks += parseInt(allData[i].mark, 10);
                }
            } else if (allData[i].type === 'blank') {
                const index = customIndexOf(allData[i].mainAnswer, allData[i].userAnswer);
                if (index >= 0) {
                    totalMarks += parseInt(allData[i].mark, 10);
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

        submitQuiz(requestData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allData = [...answer, ...checkBox, ...blankAns];

        if (allFiles?.files) {
            const baseUrl = 'https://api.upload.io';
            const accountId = '12a1xuc';
            const apiKey = 'public_12a1xucERSoBGJ5kodYvotGCNiUe';

            const path = `/v2/accounts/${accountId}/uploads/form_data`;
            const entries = (obj) =>
                Object.entries(obj).filter(([, val]) => (val ?? null) !== null);

            const formData = new FormData();
            formData.append('file', allFiles?.files[0]);

            fetch(`${baseUrl}${path}`, {
                method: 'POST',
                body: formData,
                headers: Object.fromEntries(
                    entries({
                        Authorization: `Bearer ${apiKey}`,
                    })
                ),
            })
                .then((res) => {
                    res.json().then((upRes) => {
                        const obj = {
                            id: allFiles.id,
                            index: allFiles.index,
                            userAnswer: [upRes?.files[0]?.fileUrl],
                            mark: allFiles.mark,
                            type: allFiles.type,
                            mainAnswer: [{ id: '', input: '' }],
                        };
                        allData.push(obj);
                        anotherSubmission(allData);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            return;
        }

        allData.sort((a, b) => a.index < b.index);

        console.log(allData);
        // return;

        let totalMarks = 0;

        for (let i = 0; i < allData.length; i += 1) {
            if (allData[i].type === 'choice') {
                // const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer);
                const index = customIndexOf(allData[i].mainAnswer, allData[i].userAnswer);
                if (index >= 0) {
                    totalMarks += parseInt(allData[i].mark, 10);
                }
            } else if (allData[i].type === 'check') {
                if (allData[i].userAnswer?.length === allData[i].mainAnswer?.length) {
                    let check = true;

                    for (let j = 0; j < allData[i].userAnswer.length; j += 1) {
                        // const index = allData[i].mainAnswer.indexOf(allData[i].userAnswer[j]);
                        const index = customIndexOf(
                            allData[i].mainAnswer,
                            allData[i].userAnswer[j]
                        );
                        if (index < 0) {
                            check = false;
                            break;
                        }
                    }

                    if (check) totalMarks += parseInt(allData[i].mark, 10);
                }
            } else if (allData[i].type === 'blank') {
                const index = customIndexOf(allData[i].mainAnswer, allData[i].userAnswer);
                if (index >= 0) {
                    totalMarks += parseInt(allData[i].mark, 10);
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

        submitQuiz(requestData);
    };

    // const handleResult = () => {
    //     if (role === 'teacher') navigate(`/quiz-details/${id}`);
    //     else navigate(`/result/${id}`);

    //     return null;
    // };

    const handleBlankAnswer = (id1, userAnswer, index, mainAnswer, type, mark) => {
        let check = false;

        for (let i = 0; i < blankAns.length; i += 1) {
            if (blankAns[i].id === id1) {
                check = true;
                break;
            }
        }

        if (!check) {
            const updatedData = [...blankAns];
            updatedData.push({
                id: id1,
                index,
                mainAnswer: [...mainAnswer],
                type,
                userAnswer,
                mark,
            });

            setBlankAns(updatedData);
        } else {
            let temp = [];
            temp = blankAns.map((elem) => {
                if (elem.id === id1) {
                    return {
                        id: id1,
                        index,
                        type,
                        mainAnswer: [...mainAnswer],
                        userAnswer,
                        mark,
                    };
                }

                return elem;
            });

            setBlankAns(temp);
        }
    };

    const onFileChange = (e, index, id1, type, mark) => {
        const { files } = e.target;
        const filesArr = Array.prototype.slice.call(files);

        const obj = {
            id: id1,
            index,
            type,
            files: [...filesArr],
            mark,
        };

        setAllFiles(obj);
    };

    const removeFile = () => {
        setAllFiles({});
    };

    const getFileName = (id1) => {
        if (allFiles?.id === id1) return allFiles?.files[0]?.name;
        return '';
    };

    return (
        <div className="container min-vh-100 overflow-hidden" id="quiz-page-leftSide">
            <UpperButton />

            <div className="container" id="page-all-questions">
                {questions.map((ques, index) => (
                    <div className="container-fluid single-question" key={ques._id}>
                        <p className="question-no">Question {index + 1}</p>
                        <div className="container p-0 single-main-question">
                            {parse(ques.questions)}
                            <span className="question-marks">Mark: {ques.mark}</span>
                        </div>

                        {ques?.imgLink && (
                            <div className="container question-img-style ms-0 ps-0">
                                <PhotoProvider>
                                    <PhotoView src={ques?.imgLink}>
                                        <img
                                            src={ques?.imgLink}
                                            alt="qimage"
                                            className="img-fluid"
                                        />
                                    </PhotoView>
                                </PhotoProvider>
                            </div>
                        )}

                        {/* <!-- Options --> */}
                        <div
                            className={`container p-0 ${
                                ques?.type === 'files'
                                    ? 'question-page-file-option'
                                    : 'question-page-options'
                            }`}
                        >
                            {ques?.type === 'check' ? (
                                ques?.options.map((opt, index1) => (
                                    <div
                                        className="form-check form-check-custom-style"
                                        key={opt?._id}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name={`check-${ques?._id}-${index1}`}
                                            value={opt?.input}
                                            id={`check${ques._id}-${index1}`}
                                            checked={isChanged(opt.input, ques._id)}
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
                                            htmlFor={`check${ques._id}-${index1}`}
                                        >
                                            {opt?.input}
                                        </label>
                                    </div>
                                ))
                            ) : ques?.type === 'choice' ? (
                                ques?.options.map((opt1, index1) => (
                                    <div
                                        className="form-check form-check-custom-style form-radio-custom-style"
                                        key={opt1?.id}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`${ques?._id}-${index1}`}
                                            id={`${ques?._id}-${index1}`}
                                            value={opt1?.input}
                                            checked={isSelected(opt1?.input, ques._id)}
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
                                            htmlFor={`${ques?._id}-${index1}`}
                                        >
                                            {opt1?.input}
                                        </label>
                                    </div>
                                ))
                            ) : ques?.type === 'blank' ? (
                                ques?.options.map((opt) => (
                                    <div className="form-blank-custom-style" key={opt?._id}>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={
                                                blankAns[index]?.userAnswer
                                                    ? blankAns[index]?.userAnswer
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                handleBlankAnswer(
                                                    ques?._id,
                                                    e.target.value,
                                                    index,
                                                    ques?.answer,
                                                    ques?.type,
                                                    ques?.mark
                                                )
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="container ms-0 me-0 d-flex align-items-center file-upload">
                                    <label className="filelabel">
                                        <BsFillFileEarmarkPdfFill
                                            size={70}
                                            className="pdf-icon m-auto"
                                        />
                                        <span className="title">Upload File</span>
                                        <input
                                            className="FileUpload1"
                                            id="FileInput"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                                onFileChange(
                                                    e,
                                                    index,
                                                    ques?._id,
                                                    ques?.type,
                                                    ques?.mark
                                                )
                                            }
                                        />
                                    </label>
                                    <div className="file-preview ms-3 d-flex" role="presentation">
                                        {getFileName(ques?._id) && (
                                            <>
                                                <p className="m-0">{allFiles?.files[0]?.name}</p>
                                                <p className="mb-0 ms-3 ">
                                                    <FaTrashAlt
                                                        role="presentation"
                                                        className="file-delete"
                                                        onClick={removeFile}
                                                    />
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
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
