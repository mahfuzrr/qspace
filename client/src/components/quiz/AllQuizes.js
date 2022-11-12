import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGetAllQuizQuery } from '../../features/quiz/quizPageApi';
import Loader from '../Loader/Loader';
import CourseQuizes from './CourseQuizes';
import PublicQuizes from './PublicQuizes';

export default function AllQuizes() {
    const [courseQuiz, setcourseQuiz] = useState([]);
    const [publicQuiz, setpublicQuiz] = useState([]);

    const { data, isLoading } = useGetAllQuizQuery();

    useEffect(() => {
        if (data?.success) {
            const getDate = (d, hm) => {
                const hm1 = hm?.split(':');
                let h = parseInt(hm1[0], 10);
                const m = parseInt(hm1[1], 10);

                h *= 60;
                h += m;
                h -= 6 * 60;

                const date1 = moment(d).add(h, 'm').toDate();
                const currTime = new Date(date1);

                return currTime;
            };

            let tmp = data?.message?.filter(
                (elem) =>
                    elem?.catagory === 'course' &&
                    getDate(elem?.quizDate, elem?.quizTime) > Date.now()
            );

            setcourseQuiz(tmp);

            tmp = data?.message?.filter(
                (elem) =>
                    elem?.catagory === 'public' &&
                    getDate(elem?.quizDate, elem?.quizTime) > Date.now()
            );

            setpublicQuiz(tmp);
            // console.log(tmp);
        }
    }, [data]);

    let element = (
        <div className="tab-content mt-4" id="pills-tabContent">
            <CourseQuizes quizData={courseQuiz} />
            <PublicQuizes quizData={publicQuiz} />
        </div>
    );

    if (isLoading) element = <Loader />;

    return element;
}
