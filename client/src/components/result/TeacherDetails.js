import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAddMarkMutation, useGetDetailsQuery } from '../../features/quiz/quizPageApi';
import UpperButton from '../quizPage/UpperButton';

export default function TeacherDetails() {
    // details-even-row

    const [details, setDetails] = useState([]);
    const [addMarkk, setAddMark] = useState([]);
    const { id } = useParams();

    const { data } = useGetDetailsQuery(id);
    const [addMark, { data: reData }] = useAddMarkMutation();

    useEffect(() => {
        if (data?.success) {
            setDetails(data?.message);
            // console.log(data?.message);
        }
        if (reData?.success) {
            toast.success('Added Successfully!', {
                position: 'top-right',
                id: 'update-data',
            });
        }
    }, [data, reData]);

    const handleAddMark = () => {
        const updateMark = addMarkk.filter((d) => d.mark > 0);

        for (let i = 0; i < updateMark?.length; i += 1) {
            addMark(updateMark[i]);
        }

        setAddMark('');
    };

    const handleOnChange = (val, id1) => {
        const obj = {
            id: id1,
            quizid: id,
            mark: parseInt(val, 10),
        };

        let check = false;
        for (let i = 0; i < addMarkk.length; i += 1) {
            if (addMarkk[i].id === id1) {
                check = true;
                break;
            }
        }

        if (!check) {
            const ara = [...addMarkk];
            ara.push(obj);
            setAddMark(ara);
        } else {
            const ara = addMarkk.map((dt) => {
                if (dt.id === id1) {
                    return {
                        id: id1,
                        quizid: id,
                        mark: parseInt(val, 10),
                    };
                }

                return dt;
            });

            setAddMark(ara);
        }
    };

    const getValue = (id1) => {
        for (let i = 0; i < addMarkk.length; i += 1) {
            if (addMarkk[i]?.id === id1) return addMarkk[i]?.mark;
        }

        return '';
    };

    return (
        <div className="container" id="quiz-details-page-leftSide">
            <UpperButton />

            <div className="container-fluid" id="all-quiz-details">
                <div
                    className="container-fluid d-flex justify-content-between mt-5"
                    id="all-quiz-details-header"
                >
                    <div className="col-3 p-0 m-0 details-header-title">Name</div>
                    <div className="col-1 p-0 m-0 details-header-title">Mark</div>
                    <div className="col-3 p-0 m-0 details-header-title">File Submission</div>
                    <div className="col-3 p-0 m-0 details-header-title">Add Mark</div>
                    <div className="col-2 p-0 m-0 details-header-title">Subission Time</div>
                </div>

                {details.map((dData) => (
                    <div key={dData?.id} className="container-fluid mt-4 all-quiz-details-body">
                        <div className="container-fluid row d-flex justify-content-between align-items-center all-quiz-single-row">
                            <div className="col-3 p-0 quiz-single-row-title">
                                {' '}
                                <img
                                    src={dData?.avatar}
                                    alt="avatar"
                                    className="img-fluid me-1"
                                />{' '}
                                {dData?.userName}
                            </div>
                            <div className="col-1 p-0 quiz-single-row-title">{dData?.marks}</div>{' '}
                            <div className="col-3 d-flex align-items-center justify-content-start p-0 quiz-single-row-download">
                                {dData?.submitFile ? (
                                    <>
                                        <i className="fa-solid fa-file-pdf me-1" />
                                        <a
                                            href={dData?.submitFile}
                                            target="_blank"
                                            className="me-2"
                                            rel="noreferrer"
                                        >
                                            Sample.pdf
                                        </a>
                                        <i className="fa-solid fa-download" />
                                    </>
                                ) : (
                                    'No File'
                                )}
                            </div>
                            <div className="col-3 d-flex p-0 quiz-single-row-input">
                                <input
                                    type="text"
                                    value={getValue(dData?.id)}
                                    className="form-control"
                                    onChange={(e) => handleOnChange(e.target.value, dData?.id)}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => handleAddMark(dData?.id)}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="col-2 p-0 quiz-single-row-title-time">
                                26.02.23 9:00 PM
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
