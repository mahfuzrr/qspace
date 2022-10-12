export default function CourseQuizes() {
    return (
        <div
            className="tab-pane fade show active"
            id="pills-course"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
        >
            <div className="container-fluid d-flex flex-column gap-3" id="course-quiz-reg">
                {/* <!-- course quiz cards --> */}
                <div className="container-fluid m-0 d-flex align-items-center justify-content-between course-quiz-cards">
                    <div className="container quiz-time-header">
                        <h6>Algorithm 2nd Quiz</h6>
                        <p>Starts on 27 March, 2023</p>
                        <button type="button" className="btn quiz-reg-btn">
                            Register
                        </button>
                    </div>
                    <p className="quiz-devider" />
                    <div className="container d-flex flex-column align-items-center quiz-time-remain">
                        <p>Before Quiz</p>
                        <p>20:35:25</p>
                    </div>
                </div>
                {/* <!-- course quiz cards --> */}

                <div className="container-fluid m-0 d-flex align-items-center justify-content-between course-quiz-cards">
                    <div className="container quiz-time-header">
                        <h6>Algorithm 2nd Quiz</h6>
                        <p>Starts on 27 March, 2023</p>
                        <button type="button" className="btn quiz-reg-btn">
                            Register
                        </button>
                    </div>
                    <p className="quiz-devider" />
                    <div className="container d-flex flex-column align-items-center quiz-time-remain">
                        <p>Before Quiz</p>
                        <p>20:35:25</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
