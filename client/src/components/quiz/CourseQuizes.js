/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCourseQuizQuery } from '../../features/quiz/quizPageApi';

export default function CourseQuizes() {
    const [quizData, setQuizData] = useState([]);
    const navigate = useNavigate();
    const { email } = useSelector((state) => state.auth);

    const { data } = useGetCourseQuizQuery(email);

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
        const temp = new Date(hm).toLocaleTimeString();
        let tmp = temp.split(':');
        let hr = parseInt(tmp[0], 10);
        const mint = parseInt(tmp[1], 10);

        tmp = temp.split(' ');

        if (tmp[1] === 'PM') {
            hr += 12;
        }

        const date = new Date(d);

        date.setHours(hr);
        date.setMinutes(mint);
        date.setSeconds(0);
        date.setMilliseconds(0);

        // const hm1 = hm?.split(':');
        // let h = parseInt(hm1[0], 10);
        // const m = parseInt(hm1[1], 10);

        // h -= 6;
        // h *= 60;
        // h += m;

        const date1 = new Date(date);

        return date1;
    };

    const handleOnComplete = (id) => {
        navigate(`/quizz/${id}`);
    };

    const handleNavigate = (id) => {
        navigate(`/quizz/${id}`);
    };

    useEffect(() => {
        if (data?.success) {
            // console.log(data?.message);
            const getD = (d, hm) => {
                const temp = new Date(hm).getTime();
                // console.log(temp);
                // const hm1 = hm?.split(':');
                // let h = parseInt(hm1[0], 10);
                // const m = parseInt(hm1[1], 10);

                // h *= 60;
                // h += m;
                // h -= 6 * 60;

                const date1 = moment(d).millisecond(temp);
                const currTime = new Date(date1);

                return currTime;
            };

            const tmp = data?.message?.filter(
                (elem) =>
                    elem?.catagory === 'course' &&
                    getD(elem?.quizDate, elem?.startTime) > Date.now() &&
                    elem?.status === 'active'
            );

            tmp.sort((a, b) => new Date(a?.quizDate) - new Date(b?.quizDate));
            setQuizData(tmp);
        }

        // console.log(data);
    }, [data]);

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
                            className="container-fluid m-0 d-flex p-4 align-items-center justify-content-between course-quiz-cards"
                        >
                            <div className="container p-4 quiz-time-header">
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
                                    {getHourAndMinute(elem?.quizDate, elem?.startTime) -
                                        Date.now() >
                                    0 ? (
                                        <Countdown
                                            date={getHourAndMinute(elem?.quizDate, elem?.startTime)}
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
