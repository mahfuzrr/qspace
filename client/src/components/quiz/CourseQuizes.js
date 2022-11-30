/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

export default function CourseQuizes({ quizData }) {
    const navigate = useNavigate();

    const getDate = (d) => {
        const date = new Date(d);
        const dt = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const mnth = [
            'Jan',
            'Feb',
            'March',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        return {
            date: dt,
            month: mnth[month],
            year,
        };
    };

    const getHourAndMinute = (d, hm) => {
        const hm1 = hm?.split(':');
        let h = parseInt(hm1[0], 10);
        const m = parseInt(hm1[1], 10);

        h -= 6;
        h *= 60;
        h += m;

        const date1 = moment(d).add(h, 'm').toDate();

        return date1;
    };

    const renderer = ({ hours, minutes, seconds }) => (
        <span>
            {hours}:{minutes}:{seconds}
        </span>
    );

    const handleOnComplete = (id) => {
        navigate(`/quizz/${id}`);
    };

    const handleNavigate = (id) => {
        navigate(`/quizz/${id}`);
    };

    return (
        <div
            className="tab-pane fade show active"
            id="pills-course"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
        >
            <div className="container-fluid d-flex flex-column gap-3" id="course-quiz-reg">
                {quizData?.length === 0 ? (
                    <p>No Upcoming Quiz</p>
                ) : (
                    quizData?.map((elem) => (
                        <div
                            key={elem?._id}
                            className="container-fluid m-0 d-flex align-items-center justify-content-between course-quiz-cards"
                        >
                            <div className="container quiz-time-header">
                                <h6>{elem?.title}</h6>
                                <p>
                                    Starts on {getDate(elem?.quizDate).date}{' '}
                                    {getDate(elem?.quizDate).month}, {getDate(elem?.quizDate).year}
                                </p>
                                <button
                                    type="button"
                                    className="btn quiz-reg-btn"
                                    onClick={() => handleNavigate(elem?._id)}
                                >
                                    Enter
                                </button>
                            </div>
                            <p className="quiz-devider" />
                            <div className="container d-flex flex-column align-items-center quiz-time-remain">
                                <p>Before Quiz</p>
                                <p>
                                    {getHourAndMinute(elem?.quizDate, elem?.quizTime) > 0 ? (
                                        <Countdown
                                            date={getHourAndMinute(elem?.quizDate, elem?.quizTime)}
                                            onComplete={() => handleOnComplete(elem?._id)}
                                        />
                                    ) : (
                                        <span>Finished</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
