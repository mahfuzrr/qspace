/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import parse from 'html-react-parser';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';
import { useAddCommentMutation } from '../../features/addPost/PostApi';
import { useDeletePostMutation } from '../../features/singleRoom/getRoomInfo';
import HomeComment from './HomeComment';

export default function HomePostCard({ data }) {
    const [cmt, setCmt] = useState('');

    const { id, email } = useSelector((state) => state.auth);
    const [addComment] = useAddCommentMutation();
    const [deletePost] = useDeletePostMutation();

    // console.log(data);

    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    const handleComment = (postId) => {
        const obj = {
            userId: id,
            content: cmt,
            postId,
        };

        addComment(obj);
        setCmt('');
    };

    const handleDelete = (postId) => {
        const delObj = {
            id: postId,
        };

        deletePost(delObj);
    };

    return (
        <div className="container ps-2 pe-2 home-post-card">
            <div className="container-fluid d-flex card-upper">
                <div className="container p-0 d-flex align-items-start">
                    <img
                        src={data?.writerId?.avatar}
                        className="img-fluid post-avatar"
                        alt="avatar"
                    />
                    <div className="container d-flex flex-column justify-content-center ms-2 mb-0 me-0 mt-0 p-0">
                        <h6 className="ps-0 ms-0 me-0 mb-0 mt-0">{data?.writter}</h6>
                        <p className="m-0" id="home-post-author">
                            {data?.isPublic ? '' : `From ${data?.courseId?.title}`}{' '}
                            {Math.floor(Math.abs(Date.now() - convertDate(data?.postedOn)) / 36e5)}{' '}
                            hours ago{' '}
                            {data?.isPublic ? (
                                <i className="fa-solid fa-earth-americas" />
                            ) : (
                                <i className="fa-solid fa-user-group ms-1 isroom" />
                            )}
                        </p>
                    </div>
                    {data?.writterEmail === email && (
                        <p className="m-0 del-icon">
                            <FaTrashAlt
                                role="presentation"
                                onClick={() => handleDelete(data?._id)}
                            />
                        </p>
                    )}
                </div>
            </div>
            {/* <!-- mid section --> */}
            <div className="container-fluid card-content ps-4 pe-4 mt-4">
                <div className="m-0">{data?.content && parse(data?.content)}</div>
            </div>
            {data?.imgLink && (
                <div className="container-fluid card-mid px-4 mt-3">
                    <PhotoProvider>
                        <PhotoView src={data?.imgLink}>
                            <img
                                className="post-image img-fluid"
                                src={data?.imgLink}
                                alt="science"
                            />
                        </PhotoView>
                    </PhotoProvider>
                </div>
            )}
            {/* <!-- <p class="m-0 line-post"></p> --> */}
            {/* <!-- comment section --> */}
            <div className="container-fluid mt-4 comment-section position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write your comment"
                    value={cmt}
                    onChange={(e) => setCmt(e.target.value)}
                />
                <button
                    type="button"
                    className="btn post-button"
                    onClick={() => handleComment(data?._id)}
                >
                    Post
                </button>
            </div>
            <div className="container-fluid p-0 all-comments">
                {data?.comment?.map((cmData) => (
                    <HomeComment key={cmData?._id} data={cmData} />
                ))}
            </div>
        </div>
    );
}
