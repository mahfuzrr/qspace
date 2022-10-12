import { useNavigate } from 'react-router-dom';
import cseImage from '../../assets/cse.png';

export default function RoomLists({ content }) {
    const { _id: id, title, teacherName, courseCode, userList } = content;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`${id}`);
    };

    return (
        <div className="card p-0 col-md-5 col-sm-12" onClick={handleNavigate} role="presentation">
            <img src={cseImage} className="card-img-top" alt="CSE" />
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p className="card-text">By {teacherName}</p>
                <p>Code: {courseCode}</p>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <span>
                    {userList?.length}
                    <i className="fa-solid fa-users ms-2" />
                </span>
            </div>
        </div>
    );
}
