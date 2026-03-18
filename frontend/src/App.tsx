import { BrowserRouter,Routes,Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotesPage from "./pages/NotesPage"
import AdminHomePage from "./pages/AdminHomePage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminNotesPage from "./pages/AdminNotesPage"
import Layout from "./pages/Layout";
import UserHomePage from "./pages/UserHomePage";
import InventoryPage from "./pages/InventoryPage";
import ItemsPage from "./pages/ItemsPage";
import RecipePage from "./pages/RecipePage";
import { SnackbarProvider } from "./components/ui/SnackbarProvider";

function App(){

  return(
    <BrowserRouter>
      <SnackbarProvider>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<Layout />}>
          {/* 사용자 홈 */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserHomePage />
              </ProtectedRoute>
            }
          />

          {/* 관리자 홈 */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHomePage />
              </ProtectedRoute>
            }
          />

          {/* 일반 업무 페이지 */}
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />

          {/* 재고 관리 페이지 */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <InventoryPage />
              </ProtectedRoute>
            }
          />

          {/* 품목 관리 페이지 */}
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemsPage />
              </ProtectedRoute>
            }
          />

          {/* 레시피 관리 페이지 */}
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <RecipePage />
              </ProtectedRoute>
            }
          />

          {/* 관리자 전용 */}
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/notes" element={<AdminNotesPage />} />
        </Route>
      </Routes>


      </SnackbarProvider>
    </BrowserRouter>


  );
}

export default App;