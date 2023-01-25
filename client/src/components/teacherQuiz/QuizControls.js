/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteQuestionMutation,
    useEditStatusMutation,
    useGetQuizInfoQuery,
    // eslint-disable-next-line prettier/prettier
    useGetQuizInfoStudentQuery
} from '../../features/dashboard/getQuizInfoApi';
import QuizFilters from './QuizFilters';

export default function QuizControls() {
    const [allData, setAllData] = useState([]);
    const [subjects, setSubjects] = useState(['Public']);
    const [edit, setEdit] = useState('');
    const [updatedStatus, setUpdatedStatus] = useState('');
    const [status, setStatus] = useState('');
    const [subj, setSubj] = useState('');

    const { email, role } = useSelector((state) => state.auth);

    const { data } = useGetQuizInfoQuery(email);
    const { data: stData } = useGetQuizInfoStudentQuery(email);
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
        setEdit('');

        if (updatedStatus === curVal || updatedStatus.length === 0) {
            toast.error('Already Updated!', {
                position: 'top-right',
            });
            return;
        }

        const updatedObj = { curStatus: updatedStatus, id };
        editStatus(updatedObj);
    };

    const handleEditToggle = (id) => {
        if (edit.length === 0) {
            setEdit(id);
        } else {
            setEdit('');
        }
    };

    useEffect(() => {
        if (data?.success && data?.message && role === 'teacher') {
            setAllData(data?.message);
            const temp = ['Public'];

            for (let i = 0; i < data?.message?.length; i += 1) {
                if (data?.message[i]?.subjectName !== 'Public') {
                    temp.push(data?.message[i]?.subjectName);
                }
            }

            setSubjects(temp);
        }
        if (stData?.success && stData?.message && role === 'student') {
            // console.log(stData?.message);
            setAllData(stData?.message);
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
        if (subj) {
            // console.log(subj);
            // console.log(data?.message);
            const temp = [...allData];
            const upTemp = temp.filter((dt) => dt?.subjectName === subj);
            console.log(upTemp);
            setAllData(upTemp);
        }
        if (status) {
            const temp = [...allData];
            const upTemp = temp.filter((dt) => dt?.status === status && dt?.subjectName === subj);
            setAllData(upTemp);
        }
    }, [data, delResponse, editResponse, stData, role, subj, status]);

    return (
        <>
            {role === 'teacher' && (
                <QuizFilters subjects={subjects} setSubj={setSubj} setStatus={setStatus} />
            )}
            <div
                className={`container overflow-hidden ${role === 'student' && 'st-table'}`}
                id="quiz-table"
            >
                {role === 'student' && <p className="lib-st">My Library</p>}
                <table className="table content-table" id="quiz-control-table">
                    <thead>
                        <tr className="text-center">
                            <th>Subject</th>
                            <th>Title</th>
                            {role === 'teacher' && <th>Status</th>}
                            <th>Date</th>
                            <th>View</th>
                            {role === 'teacher' && <th>Controls</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- First Row --> */}
                        {allData.map((element, index) => (
                            <tr key={element._id} className={index % 2 && 'active-row'}>
                                <td>
                                    {element?.subjectName === 'public'
                                        ? 'Public QUiz'
                                        : element?.subjectName}
                                </td>
                                <td>{element?.title}</td>
                                {role === 'teacher' && (
                                    <td
                                        className={`${
                                            element?.status === 'active'
                                                ? 'quiz-dashboard-active'
                                                : 'quiz-dashboard-hidden'
                                        }`}
                                    >
                                        {edit === element?._id ? (
                                            <div className="container m-0 p-0 d-flex justify-content-around">
                                                <select
                                                    defaultValue={element?.status}
                                                    className="custom-select-edit-dash"
                                                    onChange={(e) =>
                                                        setUpdatedStatus(e.target.value)
                                                    }
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="hidden">Hidden</option>
                                                </select>
                                                <span
                                                    role="button"
                                                    className="edit-dash"
                                                    tabIndex={0}
                                                    onClick={() =>
                                                        handleEdit(element.status, element?._id)
                                                    }
                                                >
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                            </div>
                                        ) : (
                                            element?.status && capitalize(element?.status)
                                        )}
                                    </td>
                                )}
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
                                {role === 'teacher' && (
                                    <td>
                                        <div className="container-fluid d-flex justify-content-center responsive-icons">
                                            <span
                                                className="table-quiz-edit-icon"
                                                role="presentation"
                                                onClick={() => handleEditToggle(element?._id)}
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
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
