/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCoursesQuery } from '../../features/createQuiz/createQuizApi';
import Questions from './Questions';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function QuizInfo() {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('public');
    const [subjectName, setSubjectName] = useState('public');
    const [date, setDate] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('active');
    const [courses, setCourses] = useState([]);
    const [titleError, setTitleError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [durationError, setDurationError] = useState('');

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetCoursesQuery(email);

    useEffect(() => {
        if (data?.success) {
            setCourses(data?.message);
        }
    }, [data]);

    return (
        <>
            {/* <!-- Upper section --> */}
            <div className="container" id="first-section-create-quiz">
                <div className="container" id="create-quiz-title">
                    <label htmlFor="quiz-title-teacher" className="form-label">
                        Title <span className="required-warning">*</span>{' '}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="quiz-title-teacher"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && <p className="m-0 error">{titleError}</p>}
                </div>

                <div className="container" id="create-quiz-subject">
                    <label htmlFor="quiz-subject-teacher" className="form-label">
                        Subject <span className="required-warning">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="quiz-subject-teacher"
                        defaultValue="public"
                        onChange={(e) => {
                            setSubject(e.target.value);
                            const index = e.nativeEvent.target.selectedIndex;
                            setSubjectName(e.nativeEvent.target[index].text);
                        }}
                    >
                        <option value="public">Public</option>
                        {courses.map((element) => (
                            <option key={element?._id} value={element?._id}>
                                {element?.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* <!-- Upper section --> */}

            {/* <!-- Mid section --> */}
            <div className="row p-2 m-auto" id="mid-section-create-quiz">
                {/* <!-- Date --> */}
                <div className="container col-lg-3 col-md-6" id="create-quiz-date-teacher">
                    <label htmlFor="create-date" className="form-label">
                        Date <span className="required-warning">*</span>
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="create-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={moment(Date.now()).format('YYYY-MM-DD')}
                    />
                </div>

                {/* <!-- Start Time --> */}
                <div className="container col-lg-3 col-md-6" id="create-quiz-start-time-teacher">
                    <label htmlFor="create-time" className="form-label">
                        Start Time <span className="required-warning">*</span>
                    </label>
                    <input
                        type="time"
                        className="form-control"
                        id="create-time"
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    {timeError && <p className="m-0 error">{timeError}</p>}
                </div>

                {/* <!-- Duration --> */}
                <div className="container col-lg-3 col-md-6" id="create-quiz-duration">
                    <label htmlFor="create-duration" className="form-label">
                        Duration <span className="required-warning">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="create-duration"
                        placeholder="Minute"
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    {durationError && <p className="m-0 error">{durationError}</p>}
                </div>

                {/* <!-- Status --> */}
                <div className="container col-lg-3 col-md-6" id="create-quiz-status">
                    <label htmlFor="create-status" className="form-label">
                        Status <span className="required-warning">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="create-status"
                        defaultValue="active"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option hidden disabled>
                            Select
                        </option>
                        <option value="active">Active</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
            </div>
            <Questions
                data={{
                    title,
                    subject,
                    subjectName,
                    date,
                    startTime,
                    duration,
                    status,
                    setTitleError,
                    setTimeError,
                    setDurationError,
                }}
            />
        </>
    );
}
