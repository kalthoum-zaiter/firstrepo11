import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/signin/signin';
import Register from './pages/Register';
import Vitrine from './components/Vitrine/Vitrine';
import SymbolInfo from './components/TickerInfo/TickerInfo'; 
import AppRoutes from './AppRoutes';
import Layout from './components/Layout/Layout';

const AppRouter = ({ mode, handleModeChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout showSidebar={false} showAppBar={true} isAuthenticated={isAuthenticated}>
            <Vitrine />
          </Layout>
        } />
        <Route path="/signin" element={
          <Layout showSidebar={false} showAppBar={true} isAuthenticated={isAuthenticated}>
            <LoginForm mode={mode} handleModeChange={handleModeChange} setIsAuthenticated={setIsAuthenticated} />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout showSidebar={false} showAppBar={true} isAuthenticated={isAuthenticated}>
            <Register />
          </Layout>
        } />
        <Route path="/ticker/:tickerName" element={
          <Layout showSidebar={false} showAppBar={true} isAuthenticated={isAuthenticated}>
            <SymbolInfo />
          </Layout>
        } />
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={
            <Layout showSidebar={route.sidebar} showAppBar={route.showAppBar} isAuthenticated={isAuthenticated}>
              {React.cloneElement(route.element, { mode: mode, handleModeChange: handleModeChange })}
            </Layout>
          } />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
