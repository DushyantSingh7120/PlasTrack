import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import DailyTrackerPage from './features/tracker/DailyTrackerPage';
import DailyInsightsPage from './features/insights/DailyInsightsPage';
import SundayReviewPage from './features/sunday-review/SundayReviewPage';
import AlternativesPage from './features/alternatives/AlternativesPage';
import LandingPage from './features/landing/LandingPage';

function App() {
  return (
    <>
      {/* Global 3D Environmental Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10 pointer-events-none"
        style={{ backgroundImage: "url('/backgrounds/hero_water_caustics.jpg')" }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: 1
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
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
            path="/alternatives" 
            element={
              <DashboardLayout>
                <AlternativesPage />
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
    </>
  );
}

export default App;
