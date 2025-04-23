import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Equipe from "../pages/equipe/Equipe";
import Match from "../pages/match/Match";
import Joueur from "../pages/joueur/Joueur";
import Quiz from "../pages/quiz/Quiz";
import Login from "../Components/login/Login";
import Home from "../pages/home/Home";
import useAuthStore from "../Store/authStore";

const AppRouter = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
    
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Home layout with nested routes */}
      <Route path="/" element={<Home />}>
        {/* Default route (dashboard) */}
        <Route index element={<Dashboard />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="match" element={<Match />} />
        <Route path="joueur" element={<Joueur />} />
        <Route path="quiz" element={<Quiz />} />
      </Route>

      {/* Catch-all 404 page */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
