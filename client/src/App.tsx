import ProtectedRoute from "./components/helper/ProtectedRoute";
import { UserStorage } from "./context/UserContext";
import CreateProject from "./screens/CreateProject";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./screens/Project";
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
            <Route path="/projeto/:id" element={<Project />} />
            <Route path="/projeto/criar" element={<CreateProject />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ProjectStorage>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
