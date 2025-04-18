import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard/Dashboard';
import Equipe from '../pages/equipe/Equipe';
import Match from '../pages/match/Match';
import Joueur from '../pages/joueur/Joueur';
import Quiz from '../pages/quiz/Quiz';
import Login from '../Components/login/Login';
import Home from '../pages/home/Home';

const AppRouter = () => {
  return (
    <Routes>
  
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        
        <Route index element={<Dashboard />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="match" element={<Match />} />
        <Route path="joueur" element={<Joueur />} />
        <Route path="quiz" element={<Quiz />} />
      </Route>
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
