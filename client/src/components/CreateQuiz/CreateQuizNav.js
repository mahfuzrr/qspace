import { useNavigate } from 'react-router-dom';

export default function CreateQuizNav() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid" id="create-quiz-nav">
            <div className="container d-flex">
                <span className="go-back" role="presentation" onClick={handleGoBack}>
                    <i className="fa-solid fa-arrow-left" />
                </span>
                <p className="m-0">Create Quiz</p>
            </div>
        </div>
    );
}
