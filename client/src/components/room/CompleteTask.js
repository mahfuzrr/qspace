import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    useDeleteTaskMutation,
    // eslint-disable-next-line prettier/prettier
    useStudentTaskDeleteMutation
} from '../../features/addTask/addTaskApi';

export default function CompleteTask({ task }) {
    const { title, link, _id: id } = task;
    const [deleteTask] = useDeleteTaskMutation();
    const [studentTaskDelete] = useStudentTaskDeleteMutation();
    const { roomId } = useParams();
    const { role, email } = useSelector((state) => state.auth);

    const handleDelete = (e) => {
        e.preventDefault();
        if (role === 'teacher') deleteTask({ id, roomId });
        else if (role === 'student') studentTaskDelete({ id, email });
    };

    return (
        <div className="check-task">
            <span className="check mt-2 d-flex align-items-center">
                <BsCheckCircleFill color="#05c46b" size={17} className="me-2" />
                <a href={link} target="_blank" rel="noreferrer">
                    {title}
                </a>
                <FaTrash
                    id="trash-icon"
                    className="ms-4"
                    role="presentation"
                    onClick={handleDelete}
                    size={16}
                />
            </span>
        </div>
    );
}
