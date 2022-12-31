import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

/* eslint-disable no-underscore-dangle */
export default function PublicQuizes({ quizData }) {
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

    const getMilliseconds = (d, hm) => {
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

        // console.log(a, b);
        // console.log(moment(b).);

        // const hm1 = hm?.split(':');
        // let h = parseInt(hm1[0], 10);
        // const m = parseInt(hm1[1], 10);

        // h -= 6;
        // h *= 60;
        // h += m;

        const date1 = new Date(date);

        return date1;
    };

    const handleNavigate = (id) => {
        navigate(`/quizz/${id}`);
    };

    // const renderer = ({ hours, minutes, seconds }) => (
    //     <span>
    //         {hours}:{minutes}:{seconds}
    //     </span>
    // );

    return (
        <div
            className="tab-pane fade"
            id="pills-public"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
        >
            <div className="container-fluid d-flex flex-column gap-3">
                {quizData?.length === 0 ? (
                    <p>No Upcoming Quiz</p>
                ) : (
                    quizData?.map((elem) => (
                        <div
                            key={elem?._id}
                            className="container-fluid m-0 d-flex p-4 align-items-center justify-content-between course-quiz-cards"
                        >
                            <div className="container p-3 quiz-time-header">
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
                                    {getMilliseconds(elem?.quizDate, elem?.startTime) - Date.now() >
                                    0 ? (
                                        <Countdown
                                            date={getMilliseconds(elem?.quizDate, elem?.startTime)}
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
