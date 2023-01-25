/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom';

export default function ExploreCard({ course }) {
    const getDurations = (startTime, endTime) => {
        const d = new Date(endTime) - new Date(startTime);
        const seconds = ((d % 60000) / 1000).toFixed(0);
        let minute = Math.floor(d / 60000);
        if (seconds >= 59) minute += 1;
        return minute;
    };

    const navigate = useNavigate();

    return (
        <div
            className="container explore-single-card col-3"
            role="presentation"
            onClick={() => navigate(`/explore/quizz/${course?._id}`)}
        >
            <div className="container-fluid explore-card-img">
                <img src={course?.quizCover} className="img-fluid" alt="math" />
            </div>

            <div className="container d-flex justify-content-between p-0 mt-3 explore-card-text">
                <div className="container explore-card-text-left">
                    <p className="explore-card-title m-0">{course?.title}</p>
                    <p className="explore-card-author m-0">By {course?.authorName}</p>
                </div>
                <div className="container explore-card-text-right">
                    <p className="m-0 text-end">
                        <i className="fa-regular fa-clock me-1" />{' '}
                        {getDurations(course?.startTime, course?.endTime)}min
                    </p>
                </div>
            </div>

            <div className="container mt-4 explore-card-footer">
                <p className="m-0">
                    <i className="fa-solid fa-list-check" /> {course?.questions?.length} questions
                </p>
            </div>
        </div>
    );
}
