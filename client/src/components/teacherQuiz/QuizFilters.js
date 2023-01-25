import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function QuizFilters({ subjects, setSubj, setStatus }) {
    const [sbj, setSbj] = useState('Public');
    const [sts, setSts] = useState('active');

    const navigate = useNavigate();

    const handleAddQuiz = () => {
        navigate('/dashboard');
    };

    const handleAddFilter = () => {
        // console.log(sbj);
        setSubj(sbj);
        setStatus(sts);
    };

    return (
        <div className="container-fluid d-flex mt-5 align-items-center" id="upper-filter">
            {/* <!-- add quiz button --> */}
            <div className="container" id="add-quiz-dashboard">
                <button type="button" className="btn filter-dashboard-btn" onClick={handleAddQuiz}>
                    <BsFillPlusCircleFill /> Add Quiz
                </button>
            </div>

            {/* <!-- filter of Dashboard --> */}
            <div className="container d-flex align-items-center" id="filter-dashboard">
                <div className="container d-flex justify-content-around" id="filter-select-group">
                    <div className="d-flex flex-column gap-1" id="subject-filter">
                        <label
                            htmlFor="filter-quiz-dashboard"
                            className="form-label d-block p-0 m-0"
                        >
                            Subject
                        </label>
                        <select
                            id="filter-quiz-dashboard"
                            className="form-select form-select-sm m-0"
                            onChange={(e) => setSbj(e.target.value)}
                            value={sbj}
                        >
                            {subjects?.map((subj) => (
                                <option key={v4()} value={subj}>
                                    {subj}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex flex-column gap-1" id="status-filter">
                        <label
                            htmlFor="status-filter-quiz-dashboard"
                            className="form-label d-block p-0 m-0"
                        >
                            Status
                        </label>
                        <select
                            id="status-filter-quiz-dashboard"
                            className="form-select form-select-sm m-0"
                            onChange={(e) => setSts(e.target.value)}
                            value={sts}
                        >
                            <option value="active">Active</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>
                </div>

                <span>
                    <button
                        type="button"
                        className="btn filter-dashboard-btn mt-2"
                        onClick={handleAddFilter}
                    >
                        <FaFilter /> Add filter
                    </button>
                </span>
            </div>
        </div>
    );
}
