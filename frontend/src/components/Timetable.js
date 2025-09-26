import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, getUserRole } from '../utils/auth';
import AttendanceForm from './AttendanceForm';

const Timetable = ({ timetables }) => {
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const userRole = getUserRole();

  const fetchAttendance = async (timetable_id) => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:5000/api/attendance/timetable/${timetable_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
    }
  };

  const handleTimetableClick = (timetable) => {
    setSelectedTimetable(timetable);
    fetchAttendance(timetable.id);
  };

  const handleAttendanceUpdated = () => {
    if (selectedTimetable) {
      fetchAttendance(selectedTimetable.id);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Timetable View</h3>
      {timetables.length === 0 ? (
        <p className="text-gray-600">No timetables available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {timetables.map((timetable) => (
            <div
              key={timetable.id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => handleTimetableClick(timetable)}
            >
              <p className="text-sm font-medium text-gray-800">Subject: {timetable.subject}</p>
              <p className="text-sm text-gray-600">Day: {timetable.day_of_week}</p>
              <p className="text-sm text-gray-600">Time: {timetable.start_time} - {timetable.end_time}</p>
              <p className="text-sm text-gray-600">Class ID: {timetable.class_id}</p>
            </div>
          ))}
        </div>
      )}
      {selectedTimetable && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Attendance for {selectedTimetable.subject} ({selectedTimetable.day_of_week})
          </h4>
          {attendanceRecords.length === 0 ? (
            <p className="text-gray-600">No attendance records.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {attendanceRecords.map((record) => (
                <div key={record.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                  <p className="text-sm text-gray-600">Student: {record.username}</p>
                  <p className="text-sm text-gray-600">Date: {record.date}</p>
                  <p className="text-sm text-gray-600">Status: {record.status}</p>
                </div>
              ))}
            </div>
          )}
          {(userRole === 'teacher' || userRole === 'admin') && (
            <AttendanceForm timetable_id={selectedTimetable.id} onAttendanceUpdated={handleAttendanceUpdated} />
          )}
        </div>
      )}
    </div>
  );
};

export default Timetable;