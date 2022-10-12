import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useUpdatePasswordMutation } from '../../features/updateProfile/updateProfileApi';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function UpdatePassword() {
    const { email } = useSelector((state) => state.auth);
    const [updatePassword, { data }] = useUpdatePasswordMutation();

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    useEffect(() => {
        if (data?.success) {
            toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else if (!data?.success) {
            toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, [data]);

    const handlePassUpdate = (e) => {
        e.preventDefault();

        if (newPass !== confirmPass) {
            toast.error("New and Confirm password doesn't match!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else if (newPass && confirmPass) {
            const obj = {
                email,
                currentPassword: currentPass,
                newPassword: newPass,
            };
            setConfirmPass('');
            setNewPass('');
            setCurrentPass('');
            updatePassword(obj);
        } else {
            toast.warn('Provide valid data', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div
            className="tab-pane fade ms-md-4"
            id="v-pills-password"
            role="tabpanel"
            aria-labelledby="v-pills-password-tab"
        >
            <ToastContainer />
            <div className="container-fluid">
                <h5>Change Password</h5>

                <div className="container-fluid mt-3 mt-md-4 d-flex flex-column gap-4 pt-0 px-3 pb-4 profile-content">
                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">Current Password</label>
                        <input
                            type="text"
                            className="mt-2"
                            placeholder="Current password"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                        />
                    </div>

                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">New Password</label>
                        <input
                            type="text"
                            className="mt-2"
                            placeholder="New Password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </div>

                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">Confirm Password</label>
                        <input
                            type="text"
                            className="mt-2"
                            placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn update"
                        id="password-update"
                        onClick={handlePassUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
