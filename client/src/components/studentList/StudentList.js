/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    useGetAllStudentsQuery,
    // eslint-disable-next-line prettier/prettier
    useRemoveUserMutation
} from '../../features/getStudent/getStudentApi';

export default function StudentList() {
    const [studentData, setStudentData] = useState([]);
    const { id } = useParams();

    const { data } = useGetAllStudentsQuery(id);
    const [removeUser, { data: resData }] = useRemoveUserMutation();
    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (data?.success) {
            console.log(data?.message);
            setStudentData(data?.message);
        }
        if (resData?.success) {
            toast.success(resData?.message, {
                position: 'top-right',
                id: 'student-remove',
            });
        }
    }, [data, resData]);

    const handleRemove = (email) => {
        const obj = {
            email,
            courseid: id,
        };

        removeUser(obj);
    };

    return (
        <div className="container min-vh-100 overflow-hidden" id="student-list-div">
            <Toaster />
            <div className="container-fluid" id="student-list-content">
                <p id="student-list-title">Students</p>
                <div className="container-fluid" id="student-list-main-content">
                    {/* <!-- header --> */}
                    <div className="container-fluid d-flex align-items-center justify-content-center up-header">
                        <div className="container img-col col-1 text-center">Avatar</div>
                        <div className="container name-col col-3 text-center">Name</div>
                        <div className="container email-col col-3 text-center">Email</div>
                        <div className="container college-col col-3 text-center">Institute</div>
                        {role === 'teacher' && (
                            <div className="container action-col col-2 text-center">Action</div>
                        )}
                    </div>
                    {/* <!-- header --> */}

                    {studentData.map((stData) => (
                        <div
                            key={stData?._id}
                            className="container-fluid d-flex align-items-center justify-content-center single-row mt-2"
                        >
                            <div className="container text-center img-col col-1">
                                <img src={stData?.avatar} alt="user" />
                            </div>
                            <div className="container name-col col-3 text-center">
                                {stData?.userName}
                            </div>
                            <div className="container email-col col-3 text-center">
                                {stData?.email}
                            </div>
                            <div className="container college-col col-3 text-center">
                                {stData?.institution ? stData?.institution : 'Not available'}
                            </div>
                            {role === 'teacher' && (
                                <div className="container action-col col-2 text-center">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => handleRemove(stData?.email)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
