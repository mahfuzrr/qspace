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
            <span className="check mt-2">
                <i className="fa-solid fa-circle-check me-3" />
                <a href={link} target="_blank" rel="noreferrer">
                    {title}
                </a>
                <i
                    className="fa-solid fa-trash ms-4"
                    role="presentation"
                    id="trash-icon"
                    onClick={handleDelete}
                />
            </span>
        </div>
    );
}
