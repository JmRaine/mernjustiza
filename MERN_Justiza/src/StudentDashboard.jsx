import { useEffect, useState } from 'react';
import api from './api/axiosClient';

export default function StudentDashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    api.get('/students/me').then(res => setMe(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  if (!me) return <p className="text-center mt-10 text-slate-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-xl font-bold text-slate-800">Student Portal</h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-slate-700 mb-4">My Profile</h3>
          <p className="text-slate-600 mb-1">
            <span className="font-medium">Name:</span> {me.name}
          </p>
          <p className="text-slate-600">
            <span className="font-medium">Email:</span> {me.email}
          </p>
        </div>
      </div>
    </div>
  );
}
