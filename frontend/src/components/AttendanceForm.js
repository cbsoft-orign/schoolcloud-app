import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const AttendanceForm = ({ timetable_id, onAttendanceUpdated }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    date: '',
    status: 'present',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:5000/api/attendance', { ...formData, timetable_id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAttendanceUpdated();
      setFormData({ student_id: '', date: '', status: 'present' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark attendance');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Mark Attendance</h3>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="number"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student ID"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;