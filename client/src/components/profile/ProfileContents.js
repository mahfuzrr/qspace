import UpdateContents from './UpdateContents';

export default function ProfileContents() {
    return (
        <div className="container-fluid d-md-flex align-items-start mt-md-5 ms-md-5">
            <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <button
                    className="nav-link active"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                >
                    <span className="d-flex justify-content-start align-items-center gap-2">
                        <i className="fa-solid fa-user" /> Profile
                    </span>
                </button>
                <button
                    className="nav-link mt-md-3 mt-xs-2"
                    id="v-pills-password-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-password"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                >
                    <span className="d-flex justify-content-start align-items-center gap-2">
                        <i className="fa-solid fa-lock" /> Password
                    </span>
                </button>
            </div>
            <UpdateContents />
        </div>
    );
}
