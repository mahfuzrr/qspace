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
            <span className="check">
                <i
                    className="fa-regular fa-circle me-3"
                    role="presentation"
                    onClick={handleComplete}
                />
                <a href={link} target="_blank" rel="noreferrer">
                    {title}
                </a>
                {role === 'teacher' && (
                    <i
                        className="fa-solid fa-trash ms-4"
                        role="presentation"
                        onClick={handleDelete}
                    />
                )}
            </span>
        </div>
    );
}
