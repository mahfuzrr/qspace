/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { useGetQuizInfoQuery } from '../../features/dashboard/getQuizInfoApi';

export default function Sidebar() {
    const [week, setWeek] = useState([]);
    const [weekDate, setWeekDate] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState([]);

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetQuizInfoQuery(email);

    const handleFiltering = (date) => {
        console.log(date);
        let tmp = [];
        tmp = data?.message?.filter((element) => moment(element?.quizDate).get('date') === date);
        setSelectedQuiz(tmp);
    };

    const getDate = (date) => moment(date).get('date');

    const renderer = ({ hours, minutes, seconds }) => (
        <span>
            {hours}:{minutes}:{seconds}
        </span>
    );

    const getHourAndMinute = (hm) => {
        const tmp = hm.split(':');
        const h = parseInt(tmp?.[0], 10);
        const m = parseInt(tmp?.[1], 10);
        console.log(h);
        console.log(m);
        return {
            hour: h,
            min: m,
        };
    };

    useEffect(() => {
        const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        setWeek([]);
        setWeekDate([]);
        const temp = [];
        const temp1 = [];

        for (let i = 0; i < 7; i += 1) {
            temp.push(weekDay[i % 7]);
            temp1.push(moment().add(i, 'days').get('date'));
        }

        setWeek(temp);
        setWeekDate(temp1);
        if (data?.success) {
            const selectedDate = new Date().getDate();
            let tmp = [];

            tmp = data?.message?.filter(
                (element) => moment(element?.quizDate).get('date') === selectedDate
            );

            console.log(tmp);
            setSelectedQuiz(tmp);
        }
    }, [data]);
    return (
        <div className="container" id="inner-side-bar">
            <div className="container-fluid w-100" id="side-bar">
                {/* <!-- Date Section --> */}
                <div className="container-fluid">
                    <div className="container-fluid mb-4">
                        <h6>April, 2022</h6>
                    </div>
                    <div className="container-fluid d-flex justify-content-around">
                        {week.map((day, index) => (
                            <div
                                key={uuid4()}
                                className={`${index === 0 && 'active-date-bar'} date-bar`}
                                role="presentation"
                                onClick={() => handleFiltering(weekDate[index])}
                            >
                                <p>{day}</p>
                                <p>{weekDate[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container-fluid mt-5" id="next-quiz">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <h6>Schedule</h6>
                        <span>
                            See all <i className="fa-solid fa-arrow-right ms-1" />
                        </span>
                    </div>

                    <div className="container-fluid d-flex flex-column gap-3 mt-4">
                        {/* <!-- next-quiz card --> */}
                        {selectedQuiz?.map((element) => (
                            <div
                                key={element?._id}
                                className="container-fluid d-flex align-items-center justify-content-between next-quiz-card"
                            >
                                <div className="container d-flex justify-content-center align-items-center w-25 next-quiz-header">
                                    <h3>
                                        {getDate(element?.quizDate) < 10
                                            ? `0${getDate(element?.quizDate)}`
                                            : getDate(element?.quizDate)}
                                    </h3>
                                </div>
                                <p />
                                <div className="container d-flex flex-column justify-content-center w-75 next-quiz-label">
                                    <h5>{element?.title}</h5>
                                    <p>
                                        Time Left:{' '}
                                        <Countdown
                                            date={moment(element?.quizDate)
                                                .add(
                                                    getHourAndMinute(element?.quizTime).hour,
                                                    'hour'
                                                )
                                                .add(
                                                    getHourAndMinute(element?.quizTime).min,
                                                    'minute'
                                                )
                                                .toDate()}
                                            renderer={renderer}
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
