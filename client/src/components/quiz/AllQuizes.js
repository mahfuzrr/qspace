import CourseQuizes from './CourseQuizes';
import PublicQuizes from './PublicQuizes';

export default function AllQuizes() {
    return (
        <div className="tab-content mt-4" id="pills-tabContent">
            <CourseQuizes />
            <PublicQuizes />
        </div>
    );
}
