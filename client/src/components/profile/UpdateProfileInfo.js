/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import {
    useUpdateMutation,
    useUpdatePhotoMutation
} from '../../features/updateProfile/updateProfileApi';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function UpdateProfileInfo() {
    const { name, email, college } = useSelector((state) => state.userinfo);
    // const { data } = useCookieQuery({ count: 5 }, { refetchOnMountOrArgChange: true });

    const [update, { data: updateData }] = useUpdateMutation();

    const [updatedName, setUpdatedName] = useState(name);
    const [updateCollege, setUpdatedCollege] = useState(college);
    const [newName, setUpNewName] = useState(name);
    const [newCollege, setNewCollege] = useState(college);
    const [imgFile, setImgFile] = useState(null);

    const [updatePhoto, { data: phoRes }] = useUpdatePhotoMutation();
    const {id} = useSelector((state) => state.auth);

    useEffect(() => {
        if (name) {
            setUpdatedName(name);
            setUpNewName(name);
        }
        if (college) {
            setUpdatedCollege(college);
            setNewCollege(college);
        }
        if (updateData?.success) {
            setUpdatedName(updateData?.message?.userName);
            setUpdatedCollege(updateData?.message?.institution);
            setUpNewName(updateData?.message?.userName);
            setNewCollege(updateData?.message?.institution);
            toast.success('Successfully Updated !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        if(phoRes?.success){
            toast.success('Successfully Updated !', {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 'photo-update',
            });
        }

    }, [updateData, name, college, phoRes]);

    const handleNameChange = (e) => {
        setUpdatedName(e.target.value);
    };

    const handleCollegeChange = (e) => {
        setUpdatedCollege(e.target.value);
    };

    const updateProfilePicture = () => {
        const imageHostKey = process.env.REACT_APP_imgbb_key;

        const formData = new FormData();
        formData.append('image', imgFile);

        const imgbbUrl = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHostKey}`;

        const updateObject = {
            id,
        };

        fetch(imgbbUrl, {
            method: 'POST',
            body: formData,
        })
            .then((result) => {
                result.json().then((upRes) => {
                    if (upRes?.success) {
                        // handleAnother(upRes?.data?.url, body);
                        updateObject.imgLink = upRes?.data?.url;
                        updatePhoto(updateObject);
                        setImgFile('');
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleUpdate = () => {
        const updateObj = {};

        if (newName !== updatedName) updateObj.name = updatedName;
        if (newCollege !== updateCollege) updateObj.college = updateCollege;

        if (updateObj) {
            updateObj.email = email;
            update(updateObj);
        }

        console.log(imgFile);

        if (imgFile) updateProfilePicture();

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
                        <input type="file" className="mt-2" onChange={(e) => setImgFile(e.target.files[0])} />
                    </div>

                    <button
                        
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
