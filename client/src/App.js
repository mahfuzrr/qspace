import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/privateRouter/PrivateRoute';
import PublicRoute from './components/publicRouter/PublicRoute';
import { userLoggedIn } from './features/auth/authSlice';
import { useCookieQuery } from './features/getUserInfo/getAuthApi';
import { setUserInfo } from './features/getUserInfo/getUserInfoSlice';
import Create from './pages/Create';
import Details from './pages/Details';
import Exam from './pages/Exam';
import Explore from './pages/Explore';
import ExploreExam from './pages/ExploreExam';
import Home from './pages/Home';
import Library from './pages/Library';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import ResultPage from './pages/ResultPage';
import Room from './pages/Room';
import RoomInPage from './pages/RoomInPage';
import StandingPage from './pages/StandingPage';
import Students from './pages/Students';

function App() {
    let cookie = Cookies.get('qspace') || '';

    if (cookie) {
        cookie = JSON.parse(cookie);
    }

    const { data, isLoading } = useCookieQuery(
        cookie,
        { count: 5 },
        { refetchOnMountOrArgChange: true }
    );
    const { role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(data);

        if (data?.success) {
            dispatch(
                userLoggedIn({
                    accessToken: data?.accessToken,
                    user: data?.message?.name,
                    role: data?.message?.role,
                    email: data?.message?.email,
                    photoURL: data?.message?.photoURL,
                    isLogged: true,
                    id: data?.message?.id,
                })
            );

            dispatch(
                setUserInfo({
                    name: data?.message?.name,
                    email: data?.message?.email,
                    college: data?.message?.college,
                })
            );
        }
    }, [data, dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LogIn />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quiz"
                    element={
                        <PrivateRoute>
                            <Quiz />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/room"
                    element={
                        <PrivateRoute>
                            <Room />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="room/:roomId"
                    element={
                        <PrivateRoute>
                            <RoomInPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        role === 'teacher' && (
                            <PrivateRoute>
                                <Create />
                            </PrivateRoute>
                        )
                    }
                />
                {/* <Route
                    path="/create-quiz"
                    element={
                        role === 'teacher' && (
                            <PrivateRoute>
                                <CreateQuiz />
                            </PrivateRoute>
                        )
                    }
                /> */}
                <Route
                    path="/library"
                    element={
                        <PrivateRoute>
                            <Library />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quizz/:id"
                    element={
                        <PrivateRoute>
                            <Exam />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="explore/quizz/:id"
                    element={
                        <PrivateRoute>
                            <ExploreExam />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/result/:id"
                    element={
                        <PrivateRoute>
                            <ResultPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/studentlists/:id"
                    element={
                        <PrivateRoute>
                            <Students />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/quiz-details/:id"
                    element={
                        role === 'teacher' && (
                            <PrivateRoute>
                                <Details />
                            </PrivateRoute>
                        )
                    }
                />
                <Route
                    path="/standings/:id"
                    element={
                        <PrivateRoute>
                            <StandingPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/explore"
                    element={
                        <PrivateRoute>
                            <Explore />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
