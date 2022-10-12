import LogInNav from '../components/login/LogInNav';
import UserLogIn from '../components/login/UserLogIn';
import UserRegister from '../components/register/UserRegister';

export default function LogIn() {
    return (
        <>
            <LogInNav />
            <UserLogIn />
            <UserRegister />
        </>
    );
}
