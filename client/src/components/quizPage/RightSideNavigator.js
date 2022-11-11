export default function RightSideNavigator() {
    return (
        <div className="container q-page-rightShow" id="quiz-page-rightSide">
            <div className="container-fluid p-0" id="quiz-rightContents">
                {/* <!-- Uppper side --> */}
                <div
                    className="container d-flex flex-column justify-content-center"
                    id="quiz-right-upper"
                >
                    <h5 className="text-center">Think in an algorithmic way</h5>
                    <p className="m-0 text-center quiz-running">Running</p>
                    <p className="m-0 text-center quiz-time">5:05:00</p>
                </div>

                {/* <!-- Bottom side --> */}
                <div className="container" id="quiz-right-bottom">
                    <p className="question-navigator">Question Navigator</p>
                    <div className="container row gap-2 quiz-navigator">
                        <a className="col-2 done-answer" href="/">
                            1
                        </a>
                        <a className="col-2" href="/">
                            2
                        </a>
                        <a className="col-2" href="/">
                            3
                        </a>
                        <a className="col-2" href="/">
                            4
                        </a>
                        <a className="col-2" href="/">
                            5
                        </a>
                        <a className="col-2" href="/">
                            6
                        </a>
                        <a className="col-2" href="/">
                            7
                        </a>
                        <a className="col-2" href="/">
                            8
                        </a>
                        <a className="col-2" href="/">
                            9
                        </a>
                        <a className="col-2" href="/">
                            10
                        </a>
                        <a className="col-2" href="/">
                            11
                        </a>
                        <a className="col-2" href="/">
                            12
                        </a>
                        <a className="col-2" href="/">
                            13
                        </a>
                        <a className="col-2" href="/">
                            14
                        </a>
                        <a className="col-2" href="/">
                            15
                        </a>
                        <a className="col-2" href="/">
                            16
                        </a>
                        <a className="col-2" href="/">
                            17
                        </a>
                        <a className="col-2" href="/">
                            18
                        </a>
                        <a className="col-2" href="/">
                            19
                        </a>
                        <a className="col-2" href="/">
                            20
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
