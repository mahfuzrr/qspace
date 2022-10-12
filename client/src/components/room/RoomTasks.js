/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useGetUserInformationQuery } from '../../features/getUserInfo/getAuthApi';
import { useGetInfoQuery } from '../../features/singleRoom/getRoomInfo';
import AddTask from './AddTask';
import CompleteTask from './CompleteTask';
import IncompleteTask from './IncompleteTask';

export default function RoomTasks({ code }) {
    const { roomId } = useParams();
    const { data } = useGetInfoQuery(roomId);
    const [allTask, setAllTask] = useState([]);
    const { email, role } = useSelector((state) => state.auth);

    const { data: userInfo } = useGetUserInformationQuery(email);

    useEffect(() => {
        if (data?.success && role === 'teacher') {
            setAllTask(data?.message?.tasks);
        } else if (userInfo?.success && role === 'student') {
            setAllTask(userInfo?.user?.studentTasks);
        }
    }, [data, userInfo, role]);

    return (
        <>
            {/* <!-- Task Started --> */}
            <div className="container" id="course-tasks">
                <div
                    className="container-fluid d-flex align-items-center justify-content-between"
                    id="tasks-header"
                >
                    <div className="container w-75 d-flex ps-0">
                        <i className="fa-solid fa-list-check me-3" />
                        <h6 className="m-0">Tasks</h6>
                    </div>
                    <div className="container w-25 d-flex justify-content-end" id="task-edit">
                        {role === 'teacher' && (
                            <i
                                className="fa-solid fa-pen-to-square"
                                data-bs-toggle="modal"
                                data-bs-target="#create-task"
                            />
                        )}
                    </div>
                </div>

                <AddTask />

                {/* Incomplete Tasks */}
                <div className="container-fluid" id="all-tasks">
                    {role === 'teacher'
                        ? allTask.map(
                              (task) =>
                                  !task?.isComplete && <IncompleteTask key={task._id} task={task} />
                          )
                        : allTask.map(
                              (task) =>
                                  !task?.isComplete &&
                                  task?.accessCode === code && (
                                      <IncompleteTask key={task._id} task={task} />
                                  )
                          )}
                </div>
            </div>

            {/* <!-- completed Tasks --> */}
            <div className="container" id="completed-tasks">
                <div
                    className="container-fluid d-flex align-items-center"
                    id="completed-tasks-header"
                >
                    <i className="fa-solid fa-check-double me-2 title-check" />
                    <h6 className="m-0">Completed Tasks</h6>
                </div>

                {/* <!-- Tasks --> */}
                <div className="container-fluid mt-3" id="all-completed-tasks">
                    {role === 'teacher'
                        ? allTask.map(
                              (task) =>
                                  task?.isComplete && <CompleteTask key={task._id} task={task} />
                          )
                        : allTask.map(
                              (task) =>
                                  task?.isComplete &&
                                  task?.accessCode === code && (
                                      <CompleteTask key={task._id} task={task} />
                                  )
                          )}
                </div>
            </div>
        </>
    );
}
