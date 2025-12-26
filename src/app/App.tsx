import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './components/screens/Auth';
import { Onboarding } from './components/screens/Onboarding';
import { Dashboard } from './components/screens/Dashboard';
import { Roadmap } from './components/screens/Roadmap';
import { TaskDetail } from './components/screens/TaskDetail';
import { Profile } from './components/screens/Profile';
import { BottomNav } from './components/BottomNav';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const OnboardedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isOnboarded } = useApp();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { user, isOnboarded } = useApp();

  return (
    <>
      <Routes>
        <Route path="/auth" element={user ? <Navigate to={isOnboarded ? '/dashboard' : '/onboarding'} replace /> : <Auth />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <OnboardedRoute>
              <Dashboard />
            </OnboardedRoute>
          }
        />
        <Route
          path="/roadmap"
          element={
            <OnboardedRoute>
              <Roadmap />
            </OnboardedRoute>
          }
        />
        <Route
          path="/task/:taskId"
          element={
            <OnboardedRoute>
              <TaskDetail />
            </OnboardedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <OnboardedRoute>
              <Profile />
            </OnboardedRoute>
          }
        />
        <Route path="/" element={<Navigate to={user ? (isOnboarded ? '/dashboard' : '/onboarding') : '/auth'} replace />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
