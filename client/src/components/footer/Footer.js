export default function Footer() {
    return (
        <div className="container-fluid p-0 my-5" id="footer-wrap">
            <footer
                className="text-center text-lg-start text-dark w-100"
                style={{ backgroundColor: '#ECEFF1' }}
            >
                <section
                    id="footer-up-section"
                    className="d-flex justify-content-between p-3 align-items-center text-white"
                    style={{ backgroundColor: '#a266e3' }}
                >
                    <div className="me-5">
                        <span>Get connected with us on social networks</span>
                    </div>

                    <div id="footer-icon-set">
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-twitter" />
                        </a>
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-google" />
                        </a>
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-instagram" />
                        </a>
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-linkedin" />
                        </a>
                        <a href="/" className="text-white me-4 text-decoration-none">
                            <i className="fab fa-github" />
                        </a>
                    </div>
                </section>

                <section className="container-fluid" id="footer-below">
                    <div className="container-fluid text-center text-md-start">
                        <div className="row mt-3 footer-row">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 footer-sub-row">
                                <h6 className="text-uppercase fw-bold">QSpace</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{
                                        width: '60px',
                                        backgroundColor: '#7c4dff',
                                        height: '2px',
                                    }}
                                />
                                <p className="m-0">
                                    This a quiz based web platform. You can create and give quizzes
                                    on this platform. Feel free to logIn and enlarge your knowledge
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 footer-sub-row">
                                <h6 className="text-uppercase fw-bold">Products</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{
                                        width: '60px',
                                        backgroundColor: '#7c4dff',
                                        height: '2px',
                                    }}
                                />
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        MDBootstrap
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        MDWordPress
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        BrandFlow
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        Bootstrap Angular
                                    </a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 footer-sub-row">
                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{
                                        width: '60px',
                                        backgroundColor: '#7c4dff',
                                        height: '2px',
                                    }}
                                />
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        LogIn
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        Quiz
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        Profile
                                    </a>
                                </p>
                                <p className="foot-sub-row-a">
                                    <a href="#!" className="text-dark text-decoration-none">
                                        Help
                                    </a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{
                                        width: '60px',
                                        backgroundColor: '#7c4dff',
                                        height: '2px',
                                    }}
                                />
                                <p>
                                    <i className="fas fa-home me-3" /> 84 Indira Road, Dhaka
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3" /> qspace.info@gmail.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3" /> +8801785963578
                                </p>
                                <p>
                                    <i className="fas fa-print me-3" /> +88 234 567 89
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-2 container-fluid w-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                    id="footer-foot"
                >
                    © 2022 Copyright -
                    <a className="text-dark text-decoration-none" href="/">
                        {' '}
                        QSpace
                    </a>
                </div>
            </footer>
        </div>
    );
}
