import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/helper/ProtectedRoute';
import { UserStorage } from './context/UserContext';
import { ProjectStorage } from './context/ProjectContext';
import { ToastStorage } from './context/ToastContext';

import Login from './views/LoginView';
import ProjectRoute from './components/helper/ProjectRoute';
import { Homepage } from './views/HomepageView';
import { About } from './components/external/about/About';
import { UnderDevelopment } from './components/helper/under-development/UnderDevelopment';

const App: FC = () => {
    return (
        <BrowserRouter>
            <ToastStorage>
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
                        </Routes>
                    </ProjectStorage>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='como-usar' element={<UnderDevelopment />} />
                        <Route path='sobre' element={<About />} />
                        <Route path='blog' element={<UnderDevelopment />} />
                    </Routes>
                </UserStorage>
            </ToastStorage>
        </BrowserRouter>
    );
};

export default App;
