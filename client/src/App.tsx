import ProtectedRoute from "./components/helper/ProtectedRoute";
import { UserStorage } from "./context/UserContext";
import CreateProject from "./views/CreateProject";
import Home from "./views/Home";
import Login from "./views/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./views/Project";
import { ProjectStorage } from "./context/ProjectContext";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <ProjectStorage>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projeto/:id"
              element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projeto/criar"
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ProjectStorage>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
