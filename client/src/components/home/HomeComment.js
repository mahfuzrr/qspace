export default function HomeComment({ data }) {
    return (
        <div className="container-fluid mt-4 d-flex single-comment">
            <img src={data?.userId?.avatar} className="img-fluid" alt="avatar" />
            <div className="container-fluid content-comment">
                <p className="m-0 user-name-comment">{data?.userId?.userName}</p>
                <p className="m-0 user-comment">{data?.content}</p>
            </div>
        </div>
    );
}
