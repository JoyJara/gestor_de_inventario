// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/pos' element={<POS/>} />
        <Route path='/reports' element={<Reports/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </Router>
  );
};

export default App;
