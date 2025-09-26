import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const TimetableForm = ({ onTimetableCreated }) => {
  const [formData, setFormData] = useState({
    class_id: '',
    day_of_week: 'Monday',
    start_time: '',
    end_time: '',
    subject: '',
    teacher_id: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:5000/api/timetables', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTimetableCreated();
      setFormData({
        class_id: '',
        day_of_week: 'Monday',
        start_time: '',
        end_time: '',
        subject: '',
        teacher_id: '',
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create timetable');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Create Timetable</h3>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">
            Class ID
          </label>
          <input
            type="number"
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter class ID"
          />
        </div>
        <div>
          <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700">
            Day of Week
          </label>
          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">
            Teacher ID
          </label>
          <input
            type="number"
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter teacher ID"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Timetable
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;