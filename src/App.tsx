import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ProfileProvider } from './contexts/ProfileContext';

// Lazy-loaded components
const ProfilesPage = lazy(() => import('./pages/ProfilesPage'));
const ProfileDetailsPage = lazy(() => import('./pages/ProfileDetailsPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ProfileProvider>
      <Layout>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner size="large" /></div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/profiles" replace />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/profiles/:id" element={<ProfileDetailsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile/new" element={<EditProfilePage />} />
            <Route path="/admin/profile/:id" element={<EditProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ProfileProvider>
  );
}

export default App;