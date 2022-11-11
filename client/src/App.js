import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import PrivateRoute from './components/privateRouter/PrivateRoute';
import PublicRoute from './components/publicRouter/PublicRoute';
import { useCookieQuery } from './features/getUserInfo/getAuthApi';
import Create from './pages/Create';
import Exam from './pages/Exam';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Room from './pages/Room';
import RoomInPage from './pages/RoomInPage';

function App() {
    useCookieQuery({ count: 5 }, { refetchOnMountOrArgChange: true });
    const { role } = useSelector((state) => state.auth);

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
                <Route
                    path="/create-quiz"
                    element={
                        role === 'teacher' && (
                            <PrivateRoute>
                                <CreateQuiz />
                            </PrivateRoute>
                        )
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
