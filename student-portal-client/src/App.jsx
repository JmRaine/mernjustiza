import { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  if (!role) return <Login onLogin={setRole} />;
  if (role === 'admin') return <AdminDashboard />;
  return <StudentDashboard />;
}
