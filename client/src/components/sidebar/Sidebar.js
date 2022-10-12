export default function Sidebar() {
    return (
        <div className="container" id="inner-side-bar">
            <div className="container-fluid w-100" id="side-bar">
                {/* <!-- Date Section --> */}
                <div className="container-fluid">
                    <div className="container-fluid mb-4">
                        <h6>April, 2022</h6>
                    </div>
                    <div className="container-fluid d-flex justify-content-around">
                        <div className="date-bar active-date-bar">
                            <p>SUN</p>
                            <p>05</p>
                        </div>
                        <div className="date-bar">
                            <p>Mon</p>
                            <p>06</p>
                        </div>
                        <div className="date-bar">
                            <p>TUE</p>
                            <p>07</p>
                        </div>
                        <div className="date-bar">
                            <p>WED</p>
                            <p>08</p>
                        </div>
                        <div className="date-bar">
                            <p>THU</p>
                            <p>09</p>
                        </div>
                        <div className="date-bar">
                            <p>FRI</p>
                            <p>10</p>
                        </div>
                        <div className="date-bar">
                            <p>SAT</p>
                            <p>11</p>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-5" id="next-quiz">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <h6>Schedule</h6>
                        <span>
                            See all <i className="fa-solid fa-arrow-right ms-1" />
                        </span>
                    </div>

                    <div className="container-fluid d-flex flex-column gap-3 mt-4">
                        {/* <!-- next-quiz card --> */}
                        <div className="container-fluid d-flex align-items-center justify-content-between next-quiz-card">
                            <div className="container d-flex justify-content-center align-items-center w-25 next-quiz-header">
                                <h3>05</h3>
                            </div>
                            <p />
                            <div className="container d-flex flex-column justify-content-center w-75 next-quiz-label">
                                <h5>Web Engineering</h5>
                                <p>Time Left: 05:23:00</p>
                            </div>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between next-quiz-card">
                            <div className="container d-flex justify-content-center align-items-center w-25 next-quiz-header">
                                <h3>05</h3>
                            </div>
                            <p />
                            <div className="container d-flex flex-column justify-content-center w-75 next-quiz-label">
                                <h5>Web Engineering</h5>
                                <p>Time Left: 05:23:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
