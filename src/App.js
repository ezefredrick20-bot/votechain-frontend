import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";

import VotingPage from "./pages/VotingPage";
import ReviewVotePage from "./pages/ReviewVotePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [votes] = useState(() => {
  const savedVotes = localStorage.getItem("votes");
  return savedVotes ? JSON.parse(savedVotes) : {};
});
useEffect(() => {
  localStorage.setItem("votes", JSON.stringify(votes));
}, [votes]);
 

  return (
    <Router>
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/transactions" element={<TransactionPage />} />
    <Route path="/admin-login" element={<AdminLoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
   <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/admin" element={<AdminPage />} />
   <Route
path="/"
element={<VotingPage />}
/>
    <Route path="/about" element={<AboutPage />} />

  <Route
  path="/review"
  element={
    <ProtectedRoute>
      <ReviewVotePage />
    </ProtectedRoute>
  }
/>

   <Route
  path="/results"
  element={
    <ProtectedRoute>
      <ResultsPage />
    </ProtectedRoute>
  }
/>

    <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
  </Routes>
</Router>
  );
}

export default App;