import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import DailyTrackerPage from './features/tracker/DailyTrackerPage';
import DailyInsightsPage from './features/insights/DailyInsightsPage';
import SundayReviewPage from './features/sunday-review/SundayReviewPage';
import LandingPage from './features/landing/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/tracker" 
          element={
            <DashboardLayout>
              <DailyTrackerPage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/insights" 
          element={
            <DashboardLayout>
              <DailyInsightsPage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/sunday-review" 
          element={
            <DashboardLayout>
              <SundayReviewPage />
            </DashboardLayout>
          } 
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
