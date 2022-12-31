/* eslint-disable jsx-a11y/label-has-associated-control */
import * as DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddCoursePostMutation } from '../../features/addPost/PostApi';
import QuilBar, { formats, modules } from './QuilBar';

export default function TextEditor({ handleClose }) {
    const [content, setContent] = React.useState({ value: null });
    const [imgFile, setImgFile] = useState(null);

    const { roomId } = useParams();
    const { email, id } = useSelector((state) => state.auth);

    const [addCoursePost, { data }] = useAddCoursePostMutation();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleChange = (value) => {
        setContent({ value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateObject = {
            description: DOMPurify.sanitize(content.value),
            roomId,
            email,
            isPublic: false,
            id,
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
                            addCoursePost(updateObject);
                            setContent({ value: null });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else if (content) {
            addCoursePost(updateObject);
            toast.success('Posted Successfully !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setContent({ value: null });
        } else
            toast.warn('Please add Content!', {
                position: toast.POSITION.TOP_RIGHT,
            });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="container-fluid" id="text-editor">
            <form onSubmit={handleSubmit}>
                <div
                    className="container-fluid d-flex align-items-center justify-content-around mt-3"
                    id="text-editor-body"
                >
                    <div className="text-editor">
                        <QuilBar />
                        <ReactQuill
                            theme="snow"
                            value={content.value}
                            onChange={handleChange}
                            placeholder="Post something creative ..."
                            modules={modules}
                            formats={formats}
                            bounds=".text-editor"
                        />
                    </div>
                    <label className="filelabel">
                        <i className="fa-solid fa-image img-icon" />
                        <input
                            className="FileUpload1"
                            id="FileInput"
                            accept="image/*"
                            type="file"
                            onChange={(e) => setImgFile(e.target.files[0])}
                        />
                    </label>
                </div>
                <div
                    className="container-fluid d-flex justify-content-end"
                    id="text-editor-save-cancel"
                >
                    <button
                        type="button"
                        className="btn btn-primary me-3"
                        id="text-editor-cancel"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" id="text-editor-post">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}
