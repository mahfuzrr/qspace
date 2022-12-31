/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
import * as DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { useAddPublicPostMutation } from '../../features/addPost/PostApi';
import PostEditor, { formats, modules } from '../textEditor/PostEditor';
import HomePostCard from './HomePostCard';

export default function HomeContent({ data }) {
    // eslint-disable-next-line no-unused-vars
    const [postData, setPostData] = useState([]);
    const [content, setContent] = React.useState({ value: null });
    const [imgFile, setImgFile] = useState(null);
    const [preview, setPreview] = useState('');

    const { id, email, user } = useSelector((state) => state.auth);

    const [addPublicPost, { data: resData }] = useAddPublicPostMutation();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleChange = (value) => {
        setContent({ value });
    };

    useEffect(() => {
        if (data?.success) {
            const temp = [...data?.message];
            temp.sort((a, b) => new Date(b?.postedOn) - new Date(a?.postedOn));

            setPostData(temp);
        }

        if (!imgFile) return;
        const objectUrl = URL.createObjectURL(imgFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        // eslint-disable-next-line consistent-return
        return () => URL.revokeObjectURL(objectUrl);
    }, [data, resData, imgFile]);

    const handleAddPost = () => {
        const updateObject = {
            description: DOMPurify.sanitize(content.value),
            userId: id,
            userEmail: email,
            userName: user,
        };

        if (content && imgFile) {
            const formData = new FormData();
            formData.append('image', imgFile);

            const imgbbUrl = `https://api.imgbb.com/1/upload?expiration=15552000&key=${imageHostKey}`;

            fetch(imgbbUrl, {
                method: 'POST',
                body: formData,
            })
                .then((result) => {
                    result.json().then((upRes) => {
                        if (upRes?.success) {
                            // handleAnother(upRes?.data?.url, body);
                            updateObject.imgLink = upRes?.data?.url;
                            addPublicPost(updateObject);
                            setContent({ value: null });
                            setImgFile('');
                            toast.success(resData?.message, {
                                position: 'top-right',
                                id: 'post-sc',
                            });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else if (content) {
            addPublicPost(updateObject);
            setContent({ value: null });
            setImgFile('');
        } else
            toast.warn('Please add Content!', {
                position: toast.POSITION.TOP_RIGHT,
            });

        setPreview('');
    };

    return (
        <div className="container min-vh-100" id="content-left">
            <Toaster />
            <div className="container-fluid" id="inner-content">
                <div className="container-fluid ps-0 pe-0" id="post-editor">
                    <div className="container-fluid d-flex flex-column justify-content-around align-items-center post-editor-below">
                        <div className="text-editor">
                            <PostEditor />
                            <ReactQuill
                                value={content.value}
                                onChange={handleChange}
                                placeholder="Post something creative ..."
                                modules={modules}
                                formats={formats}
                                bounds=".text-editor"
                            />
                        </div>
                        <div className="container-fluid d-flex pb-3 justify-content-between">
                            <label className="filelabel d-flex align-items-center">
                                {preview ? (
                                    <PhotoProvider>
                                        <PhotoView src={preview}>
                                            <img
                                                src={preview}
                                                alt="preview"
                                                className="img-fluid preview-img"
                                            />
                                        </PhotoView>
                                    </PhotoProvider>
                                ) : (
                                    <i className="fa-solid fa-image pdf-icon" />
                                )}
                                <input
                                    className="FileUpload1"
                                    id="FileInput"
                                    type="file"
                                    onChange={(e) => setImgFile(e.target.files[0])}
                                    accept="image/*"
                                />
                                <span className="d-block ms-2">Photo</span>
                            </label>
                            <button type="button" className="btn post-btn" onClick={handleAddPost}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid d-grid gap-5 mt-5" id="all-post-cards">
                    {postData.map((pData) => (
                        <HomePostCard key={pData?._id} data={pData} />
                    ))}
                </div>
            </div>
        </div>
    );
}
