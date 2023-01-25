/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom';
import { useGetQuestionsQuery } from '../../features/dashboard/getQuizInfoApi';

export default function RightSideNavigator() {
    const [questions, setQuestions] = useState('');
    const [total, setTotal] = useState([]);
    const [dateData, setDateData] = useState({ minutes: 0, seconds: 0 });

    const { id } = useParams();
    const { data } = useGetQuestionsQuery(id);

    useEffect(() => {
        // console.log(data);
        if (data?.success) {
            setQuestions(data?.message);
            // console.log(data?.message);
            setTotal(data?.message?.questions);

            const savedDate = localStorage.getItem('end-time');

            if (savedDate === null) {
                setDateData({
                    minutes: Date.now() + parseInt(data?.message?.duration, 10) * 60 * 1000,
                    seconds: 0,
                });
            }

            // console.log(savedDate);

            // eslint-disable-next-line no-restricted-globals
            if (savedDate != null && !isNaN(savedDate)) {
                const currentTime = Date.now();
                const delta = parseInt(savedDate, 10) - currentTime;
                // console.log(currentTime);
                // console.log(delta);

                // Do you reach the end?
                if (delta > 600000) {
                    // Yes we clear our saved end date
                    if (localStorage.getItem('end-time').length > 0)
                        localStorage.removeItem('end-time');
                } else {
                    // Now update the end date with the current date
                    setDateData({ minutes: currentTime, seconds: delta });
                }
            }
        }
    }, [data]);

    const renderer = ({ hours, minutes, seconds }) => (
        <span>
            {hours}:{minutes}:{seconds}
        </span>
    );

    // const getQuizTime = (time) => {
    //     const t = parseInt(time, 10);
    //     return t * 60 * 1000;
    // };

    return (
        <div className="container q-page-rightShow" id="quiz-page-rightSide">
            <div className="container-fluid p-0" id="quiz-rightContents">
                {/* <!-- Uppper side --> */}
                <div
                    className="container d-flex flex-column justify-content-center"
                    id="quiz-right-upper"
                >
                    <h5 className="text-center">{questions?.title}</h5>
                    <p className="m-0 text-center quiz-running">
                        {questions?.isOver ? 'Finished' : 'Running'}
                    </p>
                    <p className="m-0 text-center quiz-time">
                        {questions?.duration && !questions?.isOver ? (
                            <Countdown
                                date={dateData.minutes + dateData.seconds}
                                renderer={renderer}
                                onStart={() => {
                                    // Save the end date
                                    if (localStorage.getItem('end-time') == null)
                                        localStorage.setItem(
                                            'end-time',
                                            JSON.stringify(dateData.minutes + dateData.seconds)
                                        );
                                }}
                                onComplete={() => {
                                    localStorage.clear();
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </p>
                </div>

                {/* <!-- Bottom side --> */}
                <div className="container" id="quiz-right-bottom">
                    <p className="question-navigator">Question Navigator</p>
                    <div className="container row gap-2 quiz-navigator">
                        {total?.map((elem, index) => (
                            <a key={elem?._id} className="col-2 done-answer" href="/">
                                {index + 1}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
