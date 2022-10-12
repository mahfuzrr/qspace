import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddTaskMutation, useAddTaskStudentMutation } from '../../features/addTask/addTaskApi';
import { useGetInfoQuery } from '../../features/singleRoom/getRoomInfo';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function AddTask() {
    const [task, setTask] = useState('');
    const [link, setLink] = useState('');
    const [accessCode, setAccessCode] = useState('');

    const [addTask] = useAddTaskMutation();
    const [addTaskStudent] = useAddTaskStudentMutation();
    const { roomId } = useParams();
    const { data } = useGetInfoQuery(roomId, { count: 5 }, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (data?.success) {
            setAccessCode(data?.message?.accessCode);
        }
    }, [data]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (task && link) {
            const updateObject = {
                accessCode,
                title: task,
                link,
            };

            await addTask(updateObject);
            await addTaskStudent(updateObject);
            toast.success('Task Added !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div
            className="modal fade"
            id="create-task"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="create-taskLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-taskLabel">
                            Add Task
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            id="create-task-close-btn"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="container" id="add-task-form-body">
                            <form onSubmit={handleAddTask} id="add-task-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="add-task-title"
                                        onChange={(e) => setTask(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="add-task-title">
                                        Title
                                    </label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="task-content-link"
                                        onChange={(e) => setLink(e.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="task-content-link">
                                        Link
                                    </label>
                                </div>

                                <div
                                    className="container-fluid d-flex justify-content-end align-items-center"
                                    id="add-task-btn-grp"
                                >
                                    <button className="btn" type="submit" id="task-add-btn">
                                        Add
                                    </button>
                                </div>
                            </form>
                            <div className="container-fluid d-flex flex-column">
                                <div className="container" id="add-task-note-content">
                                    <p className="mb-2">Note:</p>
                                    <ul>
                                        <li>Must provide http or https link</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
