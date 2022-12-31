import moment from 'moment';
import { useEffect, useState } from 'react';
import CourseQuizes from './CourseQuizes';
import PublicQuizes from './PublicQuizes';

export default function AllQuizes({ data }) {
    const [publicQuiz, setpublicQuiz] = useState([]);

    useEffect(() => {
        if (data?.success) {
            const getDate = (d, hm) => {
                const temp = new Date(hm).getTime();

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

            // console.log(data?.message);

            const tmp = data?.message?.filter(
                (elem) =>
                    elem?.catagory === 'public' &&
                    getDate(elem?.quizDate, elem?.startTime) > Date.now() &&
                    elem?.status === 'active'
            );

            // console.log(tmp[0]);

            tmp.sort((a, b) => new Date(a?.quizDate) - new Date(b?.quizDate));

            setpublicQuiz(tmp);
            // console.log(tmp);
        }
    }, [data]);

    return (
        <div className="tab-content mt-4" id="pills-tabContent">
            <CourseQuizes />
            <PublicQuizes quizData={publicQuiz} />
        </div>
    );
}
