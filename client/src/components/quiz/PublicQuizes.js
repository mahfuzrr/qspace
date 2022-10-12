export default function PublicQuizes() {
    return (
        <div
            className="tab-pane fade"
            id="pills-public"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
        >
            <div className="container-fluid d-flex flex-column gap-3">
                {/* <!-- Cards --> */}
                <div className="container-fluid m-0 d-flex align-items-center justify-content-between course-quiz-cards">
                    <div className="container quiz-time-header">
                        <h6>Math Quiz</h6>
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
                {/* <!-- Cards --> */}
                <div className="container-fluid m-0 d-flex align-items-center justify-content-between course-quiz-cards">
                    <div className="container quiz-time-header">
                        <h6>Science Quiz</h6>
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
