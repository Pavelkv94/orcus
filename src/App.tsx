import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import LoginForm from '@/components/auth/LoginForm';
import SignUpModal from '@/components/auth/SignUpModal';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Navbar from '@/components/layout/Navbar';
import PostViewer from '@/components/posts/PostViewer';
import AdminPage from '@/components/admin/AdminPage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SignUpModal />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <PostViewer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <PostViewer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <AdminPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

