import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, getUserRole, logout } from '../utils/auth';
import Timetable from './Timetable';

const Dashboard = () => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userRole = getUserRole();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    fetchTimetables(token);
  }, [navigate]);

  const fetchTimetables = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/timetables', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetables(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch timetables');
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : 'Dashboard'}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <Timetable timetables={timetables} />
    </div>
  );
};

export default Dashboard;