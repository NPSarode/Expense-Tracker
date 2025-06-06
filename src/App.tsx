import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Transactions from './pages/Transactions';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add" element={<AddExpense />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        
      </AuthProvider>
    </Router>
  );
}

export default App;