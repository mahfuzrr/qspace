/* eslint-disable jsx-a11y/label-has-associated-control */
import * as DOMPurify from 'dompurify';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddCoursePostMutation } from '../../features/addPost/PostApi';
import QuilBar, { formats, modules } from './QuilBar';

export default function TextEditor({ handleClose }) {
    const [content, setContent] = React.useState({ value: null });
    const [title, setTitle] = useState('');

    const { roomId } = useParams();
    const { email } = useSelector((state) => state.auth);

    const [addCoursePost] = useAddCoursePostMutation();

    const handleChange = (value) => {
        setContent({ value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateObject = {
            title,
            description: DOMPurify.sanitize(content.value),
            roomId,
            email,
        };

        if (content && title) {
            addCoursePost(updateObject);
            const customId = 'post';

            toast.success('Posted Successfully !', {
                position: toast.POSITION.TOP_RIGHT,
                toastId: customId,
            });
            setTitle('');
            setContent({ value: null });
        }
    };

    return (
        <div className="container-fluid" id="text-editor">
            <form onSubmit={handleSubmit}>
                <div className="container-fluid" id="text-editor-post-title">
                    <label className="form-label">
                        Title<span className="text-danger"> *</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="container-fluid mt-3" id="text-editor-body">
                    <p className="mb-0 mt-0 ms-3 me-0" id="text-editor-post-description">
                        Description <span className="text-danger">*</span>
                    </p>
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
