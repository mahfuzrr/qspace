import { FaRegCircle, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    useCompleteTaskMutation,
    useCompleteTaskStudentMutation,
    // eslint-disable-next-line prettier/prettier
    useDeleteTaskMutation
} from '../../features/addTask/addTaskApi';

export default function IncompleteTask({ task }) {
    const { title, link, _id: id } = task;
    const [completeTask] = useCompleteTaskMutation();
    const [completeTaskStudent] = useCompleteTaskStudentMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const { roomId } = useParams();

    const { role } = useSelector((state) => state.auth);

    const handleComplete = (e) => {
        e.preventDefault();
        if (role === 'teacher') completeTask({ id });
        else {
            completeTaskStudent({ id });
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteTask({ id, roomId });
    };

    return (
        <div className="check-task">
            <span className="check d-flex align-items-center mb-3">
                <FaRegCircle
                    role="presentation"
                    onClick={handleComplete}
                    className="me-3"
                    color="red"
                    size={17}
                />
                <a href={link} target="_blank" rel="noreferrer">
                    {title}
                </a>
                {role === 'teacher' && (
                    <FaTrash
                        role="presentation"
                        onClick={handleDelete}
                        className="ms-3"
                        color="red"
                        size={16}
                    />
                )}
            </span>
        </div>
    );
}
