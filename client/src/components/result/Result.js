import UpperButton from '../quizPage/UpperButton';

export default function Result() {
    return (
        <div className="container overflow-hidden min-vh-100" id="result-page-leftSide">
            <UpperButton />

            <div className="container" id="result-page-scores">
                <p className="m-0 title">Result</p>

                <div className="container p-0" id="result-total-score">
                    <p className="m-0">Score:</p>
                    <p className="m-0">20/25</p>
                </div>

                <div className="container p-0" id="result-summary-chart">
                    <p className="m-0">Overall Performance</p>
                    <div className="container d-flex" id="result-chart">
                        <div className="container" id="res-pie-chart">
                            <img
                                className="img-fluid"
                                src="../assets/pie-chart.png"
                                alt="pie-chart"
                            />
                        </div>
                        <div
                            className="container d-flex flex-column gap-4 justify-content-center"
                            id="res-pie-details"
                        >
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator red" />
                                    <div className="container pie-indicator-title">
                                        Wrong Answer
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    10
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator green" />
                                    <div className="container pie-indicator-title ">
                                        Correct Answer
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    10
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator yellow" />
                                    <div className="container pie-indicator-title ">
                                        Not answered
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    10
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
