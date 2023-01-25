import Qspace from '../../assets/Qspace-logo.png';

export default function LogInNav() {
    return (
        <nav className="navbar lh-lg" id="navbar">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={Qspace} alt="logo" className="img-fluid" />
                </a>
            </div>
        </nav>
    );
}
