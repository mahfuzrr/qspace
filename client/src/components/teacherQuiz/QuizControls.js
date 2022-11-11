/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteQuestionMutation,
    useEditStatusMutation,
    // eslint-disable-next-line prettier/prettier
    useGetQuizInfoQuery
} from '../../features/dashboard/getQuizInfoApi';

export default function QuizControls() {
    const [allData, setAllData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState('');

    const { email } = useSelector((state) => state.auth);
    const { data } = useGetQuizInfoQuery(email);
    const [deleteQuestion, { data: delResponse }] = useDeleteQuestionMutation();
    const [editStatus, { data: editResponse }] = useEditStatusMutation();

    const navigate = useNavigate();

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const dateconverter = (date) => moment(date).format('DD-MM-YYYY');

    const handleView = (id) => {
        navigate(`/quizz/${id}`);
    };

    const handleDeleteQuestion = (delId) => {
        deleteQuestion(delId);
    };

    const handleEdit = (curVal, id) => {
        setEdit(false);
        if (updatedStatus === curVal) {
            toast.error('Already Updated!', {
                position: 'top-right',
            });
        }

        const updatedObj = { curStatus: updatedStatus, id };
        editStatus(updatedObj);
    };

    useEffect(() => {
        if (data?.success) {
            // console.log(data);
            setAllData(data?.message);
        }
        if (delResponse?.success) {
            toast.success(delResponse?.message, {
                position: 'top-right',
                id: 'delResponse',
            });
        }
        if (editResponse?.success) {
            toast.success('Updated Successfully!', {
                position: 'top-right',
                id: 'editResponse',
            });
        }
    }, [data, delResponse, editResponse]);

    return (
        <div className="container overflow-hidden" id="quiz-table">
            <table className="table" id="quiz-control-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>View</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- First Row --> */}
                    {allData.map((element) => (
                        <tr key={element._id}>
                            <td>
                                {element?.subjectName === 'public'
                                    ? 'Public QUiz'
                                    : element?.subjectName}
                            </td>
                            <td>{element?.title}</td>
                            <td
                                className={`${
                                    element?.status === 'active'
                                        ? 'quiz-dashboard-active'
                                        : 'quiz-dashboard-hidden'
                                }`}
                            >
                                {edit ? (
                                    <div className="container m-0 p-0 d-flex justify-content-around">
                                        <select
                                            defaultValue={element?.status}
                                            className="custom-select-edit-dash"
                                            onChange={(e) => setUpdatedStatus(e.target.value)}
                                        >
                                            <option value="active">Active</option>
                                            <option value="hidden">Hidden</option>
                                        </select>
                                        <span
                                            role="button"
                                            className="edit-dash"
                                            tabIndex={0}
                                            onClick={() => handleEdit(element.status, element?._id)}
                                        >
                                            <i className="fa-solid fa-check" />
                                        </span>
                                    </div>
                                ) : (
                                    element?.status && capitalize(element?.status)
                                )}
                            </td>
                            <td>{dateconverter(element?.quizDate)}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn custom-quiz-view-button"
                                    onClick={() => handleView(element?._id)}
                                >
                                    View
                                </button>
                            </td>
                            <td>
                                <div className="container-fluid d-flex justify-content-center responsive-icons">
                                    <span
                                        className="table-quiz-edit-icon"
                                        role="presentation"
                                        onClick={() => setEdit(!edit)}
                                    >
                                        <i className="fa-solid fa-pen-to-square" />
                                    </span>
                                    <span
                                        className="table-quiz-delete-icon"
                                        role="presentation"
                                        onClick={() => handleDeleteQuestion(element?._id)}
                                    >
                                        <i className="fa-solid fa-trash" />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
