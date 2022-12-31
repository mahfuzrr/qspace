export default function Comment({ commentData }) {
    return (
        <div className="container-fluid mt-4 d-flex single-comment">
            <img src={commentData?.userId?.avatar} className="img-fluid" alt="avatar" />
            <div className="container-fluid content-comment">
                <p className="m-0 user-name-comment">{commentData?.userId?.userName}</p>
                <p className="m-0 user-comment">{commentData?.content}</p>
            </div>
        </div>
    );
}
