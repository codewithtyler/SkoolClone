// Main application component with routing and authentication
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CommunityLayout from './components/CommunityLayout';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/" />;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const lastCommunitySlug = localStorage.getItem('lastCommunitySlug');

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          !user ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Navigate to={`/${lastCommunitySlug || ''}`} replace />
          )
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <PublicRoute>
              <Login />
            </PublicRoute>
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar />
            <PublicRoute>
              <Register />
            </PublicRoute>
          </>
        } />

        {/* Community Routes (no Navbar here) */}
        <Route path=":slug/*" element={
          <ProtectedRoute>
            <CommunityLayout />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CommunityProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CommunityProvider>
    </Router>
  );
};

export default App;
