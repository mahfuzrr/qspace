/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import parse from 'html-react-parser';
import mathquill4quill from 'mathquill4quill';
import 'mathquill4quill/mathquill4quill.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, Toaster } from 'react-hot-toast';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { IoCloseCircle } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useCreateQuizMutation, useGetCoursesQuery } from '../../features/createQuiz/createQuizApi';
// eslint-disable-next-line import/no-named-as-default
import QuillToolbar, { formats, modules } from '../textEditor/QuilBar';

window.Quill = Quill;

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function QuizInfo() {
    const optionArray = [
        {
            id: v4(),
            input: '',
        },
    ];

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('public');
    const [subjectId, setSubjectId] = useState('public');
    const [status, setStatus] = useState('active');
    const [courses, setCourses] = useState([]);
    // const [titleError, setTitleError] = useState('');
    // const [timeError, setTimeError] = useState('');
    // const [durationError, setDurationError] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [questions, setQuestions] = useState([1]);
    const [showModal, setShowModal] = useState(false);

    // single input
    const [content, setContent] = React.useState({ value: null });
    const [type, setType] = useState('check');
    const [options, setOptions] = useState(optionArray);
    const [ans, setAnswer] = useState([]);
    const [mark, setMark] = useState('1');
    const [imgLink, setImgLink] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    // single input
    const [finalInput, setFinalInput] = useState([]);

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetCoursesQuery(email);
    const [createQuiz, { data: resData }] = useCreateQuizMutation();

    const reactQuill = React.createRef();

    const handleChange = (value) => {
        setContent({ value });
    };

    const enableMathQuillFormulaAuthoring = mathquill4quill(Quill);

    useEffect(() => {
        if (data?.success) {
            setCourses(data?.message);
            enableMathQuillFormulaAuthoring(reactQuill.current?.editor, {
                operators: [
                    ['\\sqrt[n]{x}', '\\nthroot'],
                    ['\\frac{x}{y}', '\\frac'],
                    ['\\int_{x}^{y}', '\\int'],
                    ['\\sum_{x}^{y}', '\\sum'],
                ],
            });
        }
        if (resData?.success) {
            toast.success(resData?.message, {
                position: 'top-right',
            });
        }
    }, [data, reactQuill, enableMathQuillFormulaAuthoring, resData]);

    const handleAddingInput = () => {
        setOptions((prev) => [
            ...prev,
            {
                id: v4(),
                input: '',
            },
        ]);
    };

    const handleOption = (e, i) => {
        const array = [...options];
        if (array.length === i) {
            array.push({
                id: v4(),
                input: e,
            });
        } else array[i].input = e;

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

    const handleBlankAnswer = (e, i) => {
        const array = [...options];

        if (array.length === i) {
            array.push({
                id: v4(),
                input: e,
            });
        } else array[i].input = e;

        // console.log(array);
        setOptions(array);
        setAnswer(array);
    };

    const handleDelete = (id) => {
        const findIndex = options.findIndex((e) => e.id === id);

        if (findIndex !== -1) {
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
            setOptions(newOptions);
        }
    };

    const handleSingleSubmit = () => {
        if (editMode) {
            const updateData = {
                questions: content.value,
                options,
                mark,
                answer: ans,
                type,
                imgLink,
            };

            finalInput[editIndex] = updateData;
            setEditMode(false);
            setShowModal(false);
            setContent({ value: null });
            setOptions([]);
            setAnswer([]);
            return;
        }

        const allData = {
            questions: content.value,
            options,
            mark,
            answer: ans,
            type,
            imgLink,
        };

        console.log(allData);

        finalInput.push(allData);

        setShowModal(false);
        setContent({ value: null });
        setOptions([]);
        setAnswer([]);
        setMark(1);
    };

    /* prettier-ignore */
    /*eslint-disable */
    const handleFileSelected = (e : React.ChangeEvent<HTMLInputElement>): void => {
         const files = Array.from(e.target.files);

         const imgData = files[0];
         const formData = new FormData();
         formData.append('image', imgData);

         if (formData.get('image') === 'undefined') {
             return;
         }

         const imageHostKey = process.env.REACT_APP_imgbb_key;
         const imgbbUrl = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHostKey}`;

         fetch(imgbbUrl, {
             method: 'POST',
             body: formData,
         })
             .then((result) => {
                 result.json().then((upRes) => {
                     if (upRes?.success) {
                         setImgLink(upRes?.data?.url);
                     }
                 });
             })
             .catch((err) => {
                 console.log(err.message);
             });
     };

    const isCorrectAns = (inputIndex, opt) => {
        for (let i = 0; i < finalInput[inputIndex].answer?.length; i += 1) {
            if (opt === finalInput[inputIndex].answer[i].input) return true;
        }

        return false;
    };

    const handleFinalInputDelete = (index) => {
        const temp = [...finalInput];
        temp.splice(index, 1);
        setFinalInput(temp);
    };

    const handleEditSingleInput = (index) => {
        setShowModal(true);
        setEditMode(true);
        setEditIndex(index);
        setOptions(finalInput[index].options);
        setContent({ value: finalInput[index].questions });
        setType(finalInput[index].type);
        setMark(finalInput[index].mark);
    };

    const handleCloseModal = () => {
        if (editMode) setEditMode(false);
        setShowModal(false);
        setShowModal(false);
        setContent({ value: null });
        setOptions([]);
        setAnswer([]);
        setMark(1);
    };

    const handleFinalSubmit = () => {
        if (title.length === 0) {
            toast.error('Add title!', {
                position: 'top-right',
            });

            return;
        }
        if (!startDate) {
            toast.error('Add date!', {
                position: 'top-right',
            });

            return;
        }
        if (!startTime) {
            toast.error('Add Start Time!', {
                position: 'top-right',
            });

            return;
        }
        if (!endTime) {
            toast.error('Add End Time!', {
                position: 'top-right',
            });

            return;
        }
        if (startTime === endTime) {
            toast.error('Start and End Time cant be same!', {
                position: 'top-right,',
            });
            return;
        }
        if (finalInput.length === 0) {
            toast.error('Add questions!', {
                position: 'top-right',
            });

            return;
        }

        const allData = {
            author: email,
            title,
            subjectName: subject,
            subjectId,
            date: startDate,
            startTime,
            endTime,
            status,
            questionData: finalInput,
        };

        createQuiz(allData);
        setMark(1);
        setFinalInput([]);
        setTitle('');
        setStartDate(null);
        setStartTime(null);
        setSubject('public');
    };

    return (
        <div className="container-fluid pb-5 overflow-hidden min-vh-100" id="full-create-contents">
            <Toaster />
            <div className="container mt-4" id="full-create-wrapper">
                <div className="container-fluid d-flex align-items-center justify-content-end">
                    {/* <p className="create-title">Create Quiz</p> */}
                    <button
                        type="button"
                        className="btn"
                        id="save-exit-btn"
                        onClick={handleFinalSubmit}
                    >
                        Save
                    </button>
                </div>
                <div className="container-fluid upper-create">
                    <div className="container upper-upper-create">
                        <input
                            className="form-control me-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Title"
                        />
                        <select
                            className="form-select me-3"
                            onChange={(e) => {
                                setSubjectId(e.target.value);
                                const index = e.nativeEvent.target.selectedIndex;
                                setSubject(e.nativeEvent.target[index].text);
                            }}
                        >
                            <option>Subject</option>
                            <option value="public">Public</option>
                            {courses.map((d) => (
                                <option key={d?._id} value={d?._id}>
                                    {d?.title}
                                </option>
                            ))}
                        </select>
                        <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                            <option>Status</option>
                            <option value="active">Active</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>

                    <div className="container upper-lower-create">
                        <DatePicker
                            className="form-control"
                            minDate={new Date()}
                            selected={startDate}
                            onChange={(date1) => setStartDate(date1)}
                            placeholderText="Select a date between today and 5 days in the future"
                        />
                        <DatePicker
                            className="form-control ms-3"
                            onChange={(date2) => setStartTime(date2)}
                            selected={startTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            placeholderText="Start Time"
                        />
                        <DatePicker
                            className="form-control ms-4"
                            onChange={(date3) => setEndTime(date3)}
                            showTimeSelect
                            selected={endTime}
                            placeholderText="End Time"
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </div>
                </div>

                <div className="container-fluid lower-create">
                    {/* here question will be added */}

                    {finalInput.map((qData, index) => (
                        <div key={v4()} className="container ps-0 pe-0 lower-single-question">
                            {/* <!-- upper --> */}
                            <div className="container-fluid d-flex lower-single-question-upper">
                                <div className="container d-flex align-items-center">
                                    Question {index + 1}
                                </div>
                                <div className="container d-flex justify-content-end lower-single-question-control">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => handleEditSingleInput(index)}
                                    >
                                        <MdEdit size={16} /> Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn ms-2"
                                        onClick={() => handleFinalInputDelete(index)}
                                    >
                                        <FaTrashAlt
                                            size={14}
                                            style={{ verticalAlign: 'text-top' }}
                                        />{' '}
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {/* <!-- upper --> */}
                            {/* <!-- mid --> */}
                            <div className="container-fluid lower-single-question-mid">
                                <p className="question-main">{parse(qData.questions)}</p>
                                {qData.imgLink && (
                                    <img
                                        src={imgLink}
                                        alt="sample"
                                        className="img-fluid custom-q-img"
                                    />
                                )}
                                <p className="divider-question">
                                    {qData.type === 'check' || qData.type === 'choice'
                                        ? 'choices'
                                        : 'answer'}
                                </p>
                                <div className="container row d-flex lower-single-question-option">
                                    {/* <!-- single option --> */}
                                    {qData.type === 'check' || qData.type === 'choice'
                                        ? qData.options?.map((opt, index1) => (
                                              <div
                                                  key={v4()}
                                                  className="container mt-2 col-6 d-flex align-items-center justify-content-start me-0 ms-0 single-option"
                                              >
                                                  <div
                                                      className={`container m-0 option-circle ${
                                                          isCorrectAns(index, opt.input)
                                                              ? 'option-green'
                                                              : 'option-red'
                                                      }`}
                                                  />
                                                  <p className="ms-3 me-0 mt-0 mb-0">{opt.input}</p>
                                              </div>
                                          ))
                                        : qData.answer?.map((dt) => (
                                              <div
                                                  key={v4()}
                                                  className="container mt-2 col-6 d-flex align-items-center justify-content-start me-0 ms-0 single-option"
                                              >
                                                  <p className="ms-3 me-0 mt-0 mb-0">{dt.input}</p>
                                              </div>
                                          ))}
                                </div>
                            </div>
                            {/* <!-- lower --> */}
                            <div className="container-fluid lower-single-question-lower">
                                <button type="button" className="btn">
                                    {qData.mark} marks
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        id="create-new-question-btn"
                        type="button"
                        className="btn ms-auto me-auto mt-4 d-block"
                        onClick={() => setShowModal(true)}
                    >
                        <BsPlusCircleFill size={18} /> New Question
                    </button>
                </div>
            </div>

            {/* <!-- question modal --> */}
            {/* <!-- Button trigger modal --> */}

            {/* <!-- Modal --> */}
            <div
                className={`container-fluid ${showModal ? 'show-modal' : 'hid-modal'}`}
                id="create-quizModal"
            >
                <div id="custom-modal">
                    <div id="custom-modal-content">
                        <div id="custom-modal-header">
                            <div className="container d-flex justify-content-between p-3 align-items-center">
                                <h5 className="modal-title" id="create-quizModalLabel">
                                    Question Info
                                </h5>
                                <span
                                    id="close-modal-create"
                                    role="presentation"
                                    onClick={handleCloseModal}
                                >
                                    <IoCloseCircle size={30} />
                                </span>
                            </div>
                        </div>
                        <div className="modal-body container mt-4" id="main-create-quiz-tools">
                            <div className="container d-flex" id="create-quiz-tool-box">
                                <div
                                    className="container w-25 d-flex align-items-center"
                                    id="left-tool-box"
                                >
                                    <label className="filelabel">
                                        <i className="fa-regular fa-image" />
                                        <span className="title">Add Image</span>
                                        <input
                                            className="FileUpload1"
                                            id="FileInput"
                                            name="inputimg"
                                            type="file"
                                            onChange={handleFileSelected}
                                        />
                                    </label>
                                    {/* <input type='reset' onClick={handleFileSelected} /> */}
                                </div>
                                <div className="container w-75" id="right-tool-box">
                                    <div
                                        className="container d-flex justify-content-end m-0"
                                        id="upper-control-box"
                                    >
                                        <div className="container m-0 type-control w-25">
                                            <select
                                                className="form-select"
                                                onChange={(e) => setType(e.target.value)}
                                            >
                                                <option value="check">Checkbox</option>
                                                <option value="choice">Multiple Choice</option>
                                                <option value="blank">Fill in the blank</option>
                                                <option value="files">File submission</option>
                                            </select>
                                        </div>
                                        <div className="container m-0 marks-control w-25">
                                            <select
                                                className="form-select"
                                                onChange={(e) => setMark(e.target.value)}
                                            >
                                                <option value="1">1 mark</option>
                                                <option value="2">2 mark</option>
                                                <option value="3">3 mark</option>
                                                <option value="4">4 mark</option>
                                                <option value="5">5 mark</option>
                                                <option value="6">6 mark</option>
                                                <option value="7">7 mark</option>
                                                <option value="8">8 mark</option>
                                                <option value="9">9 mark</option>
                                                <option value="10">10 mark</option>
                                                <option value="11">11 mark</option>
                                                <option value="12">12 mark</option>
                                                <option value="13">13 mark</option>
                                                <option value="14">14 mark</option>
                                                <option value="15">15 mark</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="container-fluid mt-4" id="right-text-editor">
                                        <QuillToolbar />
                                        <ReactQuill
                                            ref={reactQuill}
                                            theme="snow"
                                            value={content.value}
                                            onChange={handleChange}
                                            placeholder="Create something new..."
                                            modules={modules}
                                            formats={formats}
                                            bounds="#right-text-editor"
                                        />
                                    </div>
                                    {/* <!-- options --> */}
                                    <div className="container-fluid mt-1" id="right-options">
                                        {type === 'check'
                                            ? options.map((item, index) => (
                                                  <div
                                                      key={item.id}
                                                      className="form-check ps-0 mt-3 d-flex align-items-center single-option"
                                                  >
                                                      <input
                                                          className="form-check-input check-input-option"
                                                          type="checkbox"
                                                          onChange={() =>
                                                              handleAnswer(index, false)
                                                          }
                                                      />
                                                      <input
                                                          type="text"
                                                          className="form-control user-options"
                                                          value={item.input}
                                                          onChange={(e, i = index) =>
                                                              handleOption(e.target.value, i)
                                                          }
                                                      />
                                                      <span
                                                          className="quiz-option-delete"
                                                          role="presentation"
                                                          id={item.id}
                                                          onClick={(e) =>
                                                              handleDelete(e.currentTarget.id)
                                                          }
                                                      >
                                                          <FaTrashAlt size={18} />
                                                      </span>
                                                  </div>
                                              ))
                                            : type === 'choice'
                                            ? options.map((item, index) => (
                                                  <div
                                                      key={item.id}
                                                      className="form-check ps-0 mt-3 d-flex align-items-center single-option"
                                                  >
                                                      <input
                                                          className="form-check-input radio-input-option"
                                                          type="radio"
                                                          name="unique"
                                                          onChange={() => handleAnswer(index, true)}
                                                      />
                                                      <input
                                                          type="text"
                                                          className="form-control user-options"
                                                          value={item.input}
                                                          onChange={(e, i = index) =>
                                                              handleOption(e.target.value, i)
                                                          }
                                                      />
                                                      <span
                                                          className="quiz-option-delete"
                                                          role="presentation"
                                                          id={item.id}
                                                          onClick={(e) =>
                                                              handleDelete(e.currentTarget.id)
                                                          }
                                                      >
                                                          <FaTrashAlt size={18} />
                                                      </span>
                                                  </div>
                                              ))
                                            : options.map((item, index) => (
                                                  <div
                                                      key={item.id}
                                                      className="form-check ps-0 mt-3 d-flex align-items-center single-option"
                                                  >
                                                      <input
                                                          type="text"
                                                          className="form-control user-options ms-2 user-answer"
                                                          value={item.input}
                                                          onChange={(e, i = index) =>
                                                              handleBlankAnswer(e.target.value, i)
                                                          }
                                                      />
                                                      <span
                                                          className="quiz-option-delete"
                                                          role="presentation"
                                                          id={item.id}
                                                          onClick={(e) =>
                                                              handleDelete(e.currentTarget.id)
                                                          }
                                                      >
                                                          <FaTrashAlt size={18} />
                                                      </span>
                                                  </div>
                                              ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn mt-3"
                                        id="add-option-btn"
                                        onClick={handleAddingInput}
                                    >
                                        <BsPlusCircleFill size={18} className="me-1 d-inline" />
                                        Add answer
                                    </button>
                                    {/* <!-- options --> */}
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid custom-modal-footer">
                            <div className="container d-flex align-items-start justify-content-end">
                                <button
                                    id="save-cng-quiz"
                                    type="button"
                                    className="btn d-block me-5"
                                    onClick={handleSingleSubmit}
                                    disabled={
                                        !(content.value && options.length >= 2 && ans.length > 0) &&
                                        !editMode &&
                                        (type === 'check' || type === 'choice')
                                    }
                                >
                                    <FiSave className="me-1" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
