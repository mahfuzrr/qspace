import AllQuizes from './AllQuizes';

export default function QuizContents() {
    return (
        <div className="container" id="quiz-section">
            <div className="container-fluid" id="quiz-all-content">
                <h6 className="fw-bold">Upcoming Quiz</h6>

                <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link pill-button active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-course"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            Course
                        </button>
                    </li>
                    <li className="nav-item ms-4" role="presentation">
                        <button
                            className="nav-link pill-button"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-public"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                        >
                            Public
                        </button>
                    </li>
                </ul>
                <AllQuizes />
            </div>
        </div>
    );
}
