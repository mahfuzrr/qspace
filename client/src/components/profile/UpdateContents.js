import UpdatePassword from './UpdatePassword';
import UpdateProfileInfo from './UpdateProfileInfo';

export default function UpdateContents() {
    return (
        <div className="container-fluid tab-content ms-md-5 ps-4 pe-4" id="v-pills-tabContent">
            <UpdateProfileInfo />
            <UpdatePassword />
        </div>
    );
}
