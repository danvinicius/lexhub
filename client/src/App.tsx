import ProtectedRoute from "./components/helper/ProtectedRoute";
import { UserStorage } from "./context/UserContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
