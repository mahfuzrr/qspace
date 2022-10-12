import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useCookieQuery } from '../../features/getUserInfo/getAuthApi';
import { useUpdateMutation } from '../../features/updateProfile/updateProfileApi';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function UpdateProfileInfo() {
    const { name = '', email = '', college = '' } = useSelector((state) => state.userinfo);
    const { data } = useCookieQuery({ count: 5 }, { refetchOnMountOrArgChange: true });

    const [update, { data: updateData }] = useUpdateMutation();

    const [updatedName, setUpdatedName] = useState(name);
    const [updateCollege, setUpdatedCollege] = useState(college);
    const [newName, setUpNewName] = useState(name);
    const [newCollege, setNewCollege] = useState(college);
    const [isSame, setIsSame] = useState(true);

    useEffect(() => {
        if (data?.message?.name) {
            setUpdatedName(data?.message?.name);
            setUpNewName(data?.message?.name);
        }
        if (data?.message?.college) {
            setUpdatedCollege(data?.message?.college);
            setNewCollege(data?.message?.college);
        }
        if (updateData?.success) {
            setUpdatedName(updateData?.message?.userName);
            setUpdatedCollege(updateData?.message?.institution);
            setUpNewName(updateData?.message?.userName);
            setNewCollege(updateData?.message?.institution);

            toast.success('Successfully Updated !', {
                position: toast.POSITION.TOP_RIGHT,
            });

            setIsSame(true);
        }
    }, [data, updateData]);

    const handleUpdate = () => {
        const updateObj = {};

        if (newName !== updatedName) updateObj.name = updatedName;
        if (newCollege !== updateCollege) updateObj.college = updateCollege;

        if (updateObj) {
            updateObj.email = email;
            update(updateObj);
        }
    };

    const handleNameChange = (e) => {
        setUpdatedName(e.target.value);
        setIsSame(false);
    };

    const handleCollegeChange = (e) => {
        setUpdatedCollege(e.target.value);
        setIsSame(false);
    };

    return (
        <div
            className="tab-pane fade show active ms-md-4"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
        >
            <ToastContainer />
            <div className="container-fluid">
                <h5>Update Your Profile</h5>

                <div className="container-fluid mt-3 mt-md-4 d-flex flex-column gap-4 pt-0 px-3 pb-4 profile-content">
                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">Name</label>
                        <input
                            type="text"
                            className="mt-2"
                            value={updatedName}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">Email</label>
                        <input type="text" className="mt-2" value={email} disabled />
                    </div>

                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">College/University</label>
                        <input
                            type="text"
                            className="mt-2"
                            value={updateCollege}
                            onChange={handleCollegeChange}
                        />
                    </div>

                    <div className="container-fluid d-flex flex-column p-0">
                        <label htmlFor="profile-name">Profile Picture</label>
                        <input type="file" className="mt-2" />
                    </div>

                    <button
                        disabled={isSame}
                        type="button"
                        className="btn update"
                        id="profile-update"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
