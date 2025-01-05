import ProtectedRoute from './components/helper/ProtectedRoute';
import { UserStorage } from './context/UserContext';
import Login from './views/LoginView';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectStorage } from './context/ProjectContext';
import { FC } from 'react';
import { Homepage } from './views/HomepageView';
import ProjectRoute from './components/helper/ProjectRoute';
import { UnderDevelopment } from './components/project/UnderDevelopment';

const App: FC = () => {
    return (
        <BrowserRouter>
            <UserStorage>
                <ProjectStorage>
                    <Routes>
                        <Route path='/' element={<Navigate to='/home' />} />
                        <Route
                            path='/home'
                            element={
                                <ProtectedRoute>
                                    <Homepage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='/projeto/:projectId' element={<ProjectRoute />} />
                        <Route
                            path='/configuracoes'
                            element={
                                <ProtectedRoute>
                                    <Homepage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </ProjectStorage>
                <Routes>
                    <Route path='como-usar' element={<UnderDevelopment />} />
                    <Route path='sobre' element={<UnderDevelopment />} />
                    <Route path='blog' element={<UnderDevelopment />} />
                </Routes>
            </UserStorage>
        </BrowserRouter>
    );
};

export default App;
