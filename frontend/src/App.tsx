import { BrowserRouter,Routes,Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotesPage from "./pages/NotesPage"
import AdminHomePage from "./pages/AdminHomePage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminNotesPage from "./pages/AdminNotesPage"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        

        {/* 일반 사용자 */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />

        {/* 관리자 */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/notes" element={<AdminNotesPage />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;