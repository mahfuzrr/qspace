/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStandingsQuery } from '../../features/standings/standingsApi';
import UpperButton from '../quizPage/UpperButton';

export default function Standings() {
    const [allData, setAllData] = useState([]);

    const { id } = useParams();
    const { data } = useGetStandingsQuery(id);

    useEffect(() => {
        if (data?.success) {
            const tmp = [...data?.message];

            tmp.sort((a, b) => b > a || new Date(b.submitTime) - new Date(a.submitTime));
            setAllData(tmp);
        }
    }, [data]);

    return (
        <div className="container-fluid p-0 overflow-hidden" id="standings-contents">
            <UpperButton />
            <div className="container-fluid mt-5" id="standings-wrapper">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Submission Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((dt, index) => (
                            <tr key={dt?._id} className={index % 2 && 'active-row'}>
                                <td>{index + 1}</td>
                                <td>
                                    {' '}
                                    <img
                                        src={dt?.userId?.avatar}
                                        alt="avatar"
                                        className="img-fluid me-1"
                                    />{' '}
                                    {dt?.userId?.userName}
                                </td>
                                <td>{dt?.marks}</td>
                                <td>{moment(dt?.submitTime).format('DD-MM-YYYY hh:mm:ss')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
