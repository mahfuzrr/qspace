/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { useGetQuizInfoQuery } from '../../features/dashboard/getQuizInfoApi';

export default function Sidebar() {
    const [week, setWeek] = useState([]);
    const [weekDate, setWeekDate] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [select, setSelect] = useState(new Date().getDate());
    const [month, setMonth] = useState('');

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetQuizInfoQuery(email);

    const navigate = useNavigate();

    const handleFiltering = (date) => {
        setSelect(date);
        let tmp = [];

        tmp = data?.message?.filter((element) => moment(element?.quizDate).get('date') === date);
        setSelectedQuiz(tmp);
    };

    const getDate = (date) => moment(date).get('date');

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

    const handleNavigate = () => {
        navigate('/quiz');
    };

    useEffect(() => {
        const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const monthh = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const tt = new Date().getMonth();
        setMonth(monthh[tt]);

        setWeek([]);
        setWeekDate([]);
        const temp = [];
        const temp1 = [];

        const j = new Date().getDay();
        let t = 0;

        for (let i = j; i < j + 7; i += 1) {
            temp.push(weekDay[i % 7]);
            temp1.push(moment().add(t, 'days').get('date'));
            t += 1;
        }

        setWeek(temp);
        setWeekDate(temp1);

        const selectedDate = new Date().getDate();

        if (data?.success) {
            let tmp = [];
            tmp = data?.message?.filter(
                (element) => moment(element?.quizDate).get('date') === selectedDate
            );
            // console.log(tmp);
            setSelectedQuiz(tmp);
        }
    }, [data]);
    return (
        <div className="container" id="inner-side-bar">
            <div className="container-fluid w-100" id="side-bar">
                {/* <!-- Date Section --> */}
                <div className="container-fluid">
                    <div className="container-fluid mb-4">
                        <h6>
                            {month}, {new Date().getFullYear()}
                        </h6>
                    </div>
                    <div className="container-fluid d-flex justify-content-around">
                        {week.map((day, index) => (
                            <div
                                key={uuid4()}
                                className={`${
                                    select === weekDate[index] && 'active-date-bar'
                                } date-bar`}
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
                        <span role="presentation" onClick={handleNavigate}>
                            See all <FaArrowRight />
                        </span>
                    </div>

                    <div className="container-fluid d-flex flex-column gap-3 mt-4">
                        {/* <!-- next-quiz card --> */}
                        {selectedQuiz?.length === 0 ? (
                            <p className="text-center fw-bold">No Quiz Today</p>
                        ) : (
                            selectedQuiz?.map((element) => (
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
                                            {getHourAndMinute(
                                                element?.quizDate,
                                                element?.startTime
                                            ) > 0 ? (
                                                <Countdown
                                                    date={getHourAndMinute(
                                                        element?.quizDate,
                                                        element?.startTime
                                                    )}
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
            </div>
        </div>
    );
}
