/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useCreateQuizMutation } from '../../features/createQuiz/createQuizApi';
import { clearQuestion, setQuestion } from '../../features/createQuiz/createQuizSlice';
import TextEditorHelper, { formats } from './TextEditorHelper';

export default function SingleQuestions({
    moduleId = '',
    handleDeleting,
    delId,
    data,
    handleAdding,
    show,
}) {
    const inputArray = [
        {
            type: 'text',
            id: uuidv4(),
            value: '',
        },
    ];

    const modules = {
        toolbar: {
            container: `#ques-toolbar${moduleId}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
    };

    const [singleInput, setInput] = useState(inputArray);
    const [content, setContent] = React.useState({ value: null });
    const [mark, setMark] = useState(0);
    const [type, setType] = useState('checkbox');
    const [options, setOptions] = useState([]);
    const [ans, setAnswer] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [questionError, setQuestionError] = useState('');
    const [markError, setMarkError] = useState('');

    const { questions } = useSelector((state) => state.quesData);
    const { email } = useSelector((state) => state.auth);

    const [createQuiz, { data: res }] = useCreateQuizMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddingInput = () => {
        setInput((prev) => [
            ...prev,
            {
                type: 'text',
                id: uuidv4(),
                value: '',
            },
        ]);
    };

    const handleDelete = (id) => {
        const findIndex = singleInput.findIndex((e) => e.id === id);

        if (findIndex !== -1) {
            const newArray = [...singleInput];
            const newOptions = [...options];

            // delete from answer if the option is present in the answer
            const findAnswerIndex = ans.findIndex((e) => e === options[findIndex]);
            if (findAnswerIndex !== -1) {
                const newAns = [...ans];
                newAns.splice(findAnswerIndex, 1);
                setAnswer(newAns);
            }
            // delete from answer if the option is present in the answer

            newOptions.splice(findIndex, 1);
            newArray.splice(findIndex, 1);
            setInput(newArray);
            setOptions(newOptions);
        }
    };

    const handleChange = (value) => {
        setContent({ value });
    };

    const handleOption = (e, i) => {
        const array = [...options];
        if (array.length === i) {
            array.push(e);
        } else array[i] = e;

        // console.log(array);
        setOptions(array);
    };

    const handleAnswer = (index, check) => {
        if (check) {
            const ara = [];
            ara.push(options[index]);
            setAnswer(ara);
            return;
        }

        let array = ans.filter((d) => options[index] !== d);

        if (array.length !== ans.length) {
            setAnswer(array);
            return;
        }

        array = [...ans];
        array.push(options[index]);
        setAnswer(array);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        data.setTitleError('');
        data.setTimeError('');
        data.setDurationError('');

        if (data?.title?.length === 0) {
            data?.setTitleError('Enter title');
            return;
        }
        if (!data?.startTime) {
            data?.setTimeError('Select Time');
            return;
        }
        if (!data?.duration) {
            data?.setDurationError('Enter duration');
            return;
        }

        const allData = {
            author: email,
            title: data?.title,
            subjectId: data?.subject,
            subjectName: data?.subjectName,
            date: data?.date,
            startTime: data?.startTime,
            duration: data?.duration,
            status: data?.status,
            questionData: allQuestions,
        };

        createQuiz(allData);
        dispatch(clearQuestion());
    };

    const handleSave = () => {
        setQuestionError('');
        setMarkError('');

        if (!content.value) {
            setQuestionError('Enter Questions!');
            return;
        }
        if (mark <= 0) {
            setMarkError('Enter marks!');
            return;
        }

        const allData = {
            question: content.value,
            options,
            mark,
            answer: ans,
            type,
        };

        toast.success('Saved!', {
            position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(setQuestion({ data: allData, index: show?.index }));
    };

    useEffect(() => {
        setAllQuestions(questions);
        if (res?.success) {
            toast.success(res?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        }
    }, [questions, res, navigate]);

    return (
        <>
            <div className="container" id="single-question">
                {/* <!-- Question Contents --> */}
                <div className="container single-question-contents">
                    <p className="create-question-placeholder">
                        Question: <span className="required-warning">*</span>
                    </p>

                    <div className="container p-0 m-0" id="question-upper">
                        <div
                            className="container p-0 m-0 ques-text-editor"
                            id="create-questions-textEditor"
                        >
                            <TextEditorHelper moduleId={moduleId} />
                            <ReactQuill
                                theme="snow"
                                value={content.value}
                                onChange={handleChange}
                                placeholder="Write questions..."
                                modules={modules}
                                formats={formats}
                                bounds=".ques-text-editor"
                            />
                        </div>

                        <div className="container m-0 question-type-selector">
                            <select
                                className="form-select"
                                id="question-type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option hidden defaultValue>
                                    Type
                                </option>
                                <option value="choice">Multiple Choice</option>
                                <option value="checkbox">Checkbox</option>
                            </select>
                        </div>
                    </div>
                    {questionError && <p className="m-0 error">{questionError}</p>}

                    <div className="container question-create-mark">
                        <label htmlFor="create-mark" className="form-label">
                            Mark <span className="required-warning">*</span>
                        </label>
                        <input
                            type="text"
                            id="create-mark"
                            className="form-control"
                            value={mark}
                            onChange={(e) => setMark(e.target.value)}
                        />
                    </div>
                    {markError && <p className="m-0 error">{markError}</p>}

                    <div className="container p-0 m-0 create-options">
                        <label htmlFor={`question-options${moduleId}`}>
                            Options <span className="required-warning">*</span>
                        </label>

                        {type === 'checkbox'
                            ? singleInput.map((item, index) => (
                                  <div
                                      key={item.id}
                                      className="form-check ps-0 d-flex align-items-center single-option"
                                  >
                                      <input
                                          className="form-check-input check-input-option"
                                          type="checkbox"
                                          onChange={() => handleAnswer(index, false)}
                                      />
                                      <input
                                          type="text"
                                          className="form-control user-options"
                                          onChange={(e, i = index) =>
                                              handleOption(e.target.value, i)
                                          }
                                      />
                                      <span
                                          className="quiz-option-delete"
                                          role="presentation"
                                          id={item.id}
                                          onClick={(e) => handleDelete(e.currentTarget.id)}
                                      >
                                          <FaTrash />
                                      </span>
                                  </div>
                              ))
                            : singleInput.map((item, index) => (
                                  <div
                                      key={item.id}
                                      className="form-check ps-0 d-flex align-items-center single-option"
                                  >
                                      <input
                                          className="form-check-input radio-input-option"
                                          type="radio"
                                          name={`uestion-options${moduleId}`}
                                          onChange={() => handleAnswer(index, true)}
                                      />
                                      <input
                                          type="text"
                                          className="form-control user-options"
                                          onChange={(e, i = index) =>
                                              handleOption(e.target.value, i)
                                          }
                                      />
                                      <span
                                          className="quiz-option-delete"
                                          role="presentation"
                                          id={item.id}
                                          onClick={(e) => handleDelete(e.currentTarget.id)}
                                      >
                                          <FaTrash />
                                      </span>
                                  </div>
                              ))}

                        <button
                            type="button"
                            className="btn custom-add-option-btn"
                            onClick={handleAddingInput}
                        >
                            <i className="fa-solid fa-circle-plus" /> Add Option
                        </button>
                    </div>

                    <div className="container question-delete-section gap-2 d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn custom-question-save-btn"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="btn custom-question-dlt-btn"
                            onClick={() => handleDeleting(delId, show.index)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {show.index + 1 === show.len && (
                <div className="container p-0 add-new-question-section d-flex align-items-center justify-content-between mt-5">
                    <button
                        type="button"
                        className="btn custom-add-option-btn"
                        onClick={handleAdding}
                    >
                        <i className="fa-solid fa-circle-plus" /> Add Question
                    </button>
                    <button
                        type="submit"
                        className="btn custom-ques-create-btn"
                        onClick={handleOnSubmit}
                    >
                        Create
                    </button>
                </div>
            )}
        </>
    );
}
