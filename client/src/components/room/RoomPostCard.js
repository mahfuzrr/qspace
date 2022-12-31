/* eslint-disable no-underscore-dangle */
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAddCommentMutation } from '../../features/addPost/PostApi';
import { useDeletePostMutation } from '../../features/singleRoom/getRoomInfo';
import Comment from './Comment';

export default function RoomPostCard({ content }) {
    // const [isMore, setMore] = useState(false);
    // const [description, setDescription] = useState('');
    // const [isShow, setIsShow] = useState(false);
    const [cmtContent, setCmtContent] = useState('');
    const { role, id } = useSelector((state) => state.auth);

    const { roomId } = useParams();

    const [deletePost, { data }] = useDeletePostMutation();
    const [addComment] = useAddCommentMutation();

    useEffect(() => {
        // if (content?.content) {
        //     let cont = content?.content;
        //     if (cont.length > 200) {
        //         cont = cont.slice(0, 200);
        //         setDescription(`${cont}<span> ...</span>`);
        //     } else {
        //         setDescription(cont);
        //     }
        // }
        if (data?.success) {
            toast.success(data?.message, {
                position: 'top-right',
            });
        }
    }, [content, data]);

    const handleDelete = (postId) => {
        const delObj = {
            roomid: roomId,
            id: postId,
        };

        deletePost(delObj);
    };

    const convertDate = (date) => {
        const newDate = new Date(date);
        return newDate;
    };

    const handleComment = (postId) => {
        const obj = {
            userId: id,
            content: cmtContent,
            postId,
        };

        addComment(obj);
        setCmtContent('');
    };

    return (
        <div className="container ps-2 pe-2 mt-4 home-post-card">
            {/* <!-- upper section --> */}
            <div className="container-fluid d-flex card-upper">
                <div className="container p-0 d-flex align-items-start">
                    <img
                        src={content?.writerId?.avatar}
                        className="img-fluid post-avatar"
                        alt="avatar"
                    />
                    <div className="container d-flex flex-column justify-content-center ms-2 mb-0 me-0 mt-0 p-0">
                        <h6 className="ps-0 ms-0 me-0 mb-0 mt-0">{content?.writter}</h6>
                        <p className="m-0" id="home-post-author">
                            From {content?.courseId?.title},{' '}
                            {Math.floor(
                                Math.abs(Date.now() - convertDate(content?.postedOn)) / 36e5
                            )}{' '}
                            hours ago <i className="fa-solid fa-user-group ms-1 isroom" />
                        </p>
                    </div>
                    {role === 'teacher' && (
                        <p className="m-0 del-icon">
                            <FaTrashAlt
                                role="presentation"
                                onClick={() => handleDelete(content?._id)}
                            />
                        </p>
                    )}
                </div>
            </div>
            {/* <!-- mid section --> */}
            <div className="container-fluid card-content ps-4 pe-4 mt-4">
                <div className="m-0">{parse(content?.content)}</div>
            </div>
            {content?.imgLink && (
                <div className="container-fluid card-mid px-4 mt-3">
                    <img className="post-image img-fluid" src={content?.imgLink} alt="science" />
                </div>
            )}
            {/* <!-- <p class="m-0 line-post"></p> --> */}
            {/* <!-- comment section --> */}
            <div className="container-fluid mt-4 comment-section position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write your comment"
                    value={cmtContent}
                    onChange={(e) => setCmtContent(e.target.value)}
                />
                <button
                    type="button"
                    className="btn post-button"
                    onClick={() => handleComment(content?._id)}
                >
                    Post
                </button>
            </div>
            <div className="container-fluid p-0 all-comments">
                {content?.comment?.map((cData) => (
                    <Comment key={cData?._id} commentData={cData} />
                ))}
            </div>
        </div>
    );
}
