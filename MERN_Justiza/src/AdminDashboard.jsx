import { useEffect, useState } from 'react';
import api from './api/axiosClient';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);

  const load = async () => setStudents((await api.get('/students')).data);

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  const addStudent = async () => {
    await api.post('/students', { name, email, password });
    resetForm();
    load();
  };

  const startEdit = student => {
    setEditingId(student._id);
    setName(student.name);
    setEmail(student.email);
    setPassword('');
  };

  const updateStudent = async () => {
    await api.put(`/students/${editingId}`, { name, email });
    resetForm();
    load();
  };

  const deleteStudent = async id => {
    await api.delete(`/students/${id}`);
    load();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-xl font-bold text-slate-800">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="font-semibold text-slate-700 mb-3">
            {editingId ? 'Edit Student' : 'Add Student'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {!editingId && (
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div className="flex gap-2 mt-4">
            {editingId ? (
              <>
                <button
                  onClick={updateStudent}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={resetForm}
                  className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addStudent}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-slate-700 mb-3">Students</h3>
          <ul className="divide-y divide-slate-200">
            {students.map(s => (
              <li key={s._id} className="flex items-center justify-between py-3">
                <span className="text-slate-700">{s.name} - {s.email}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(s)}
                    className="text-sm bg-amber-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
