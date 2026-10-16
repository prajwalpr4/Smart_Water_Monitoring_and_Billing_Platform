import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

export default function RouterApp() {
  return <BrowserRouter><Routes><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegistrationPage />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes></BrowserRouter>;
}
