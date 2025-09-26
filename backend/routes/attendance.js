const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { student_id, timetable_id, date, status } = req.body;
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const attendanceId = await Attendance.create(student_id, timetable_id, date, status);
    res.status(201).json({ id: attendanceId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/timetable/:timetable_id', authMiddleware, async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findByTimetable(req.params.timetable_id);
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const affectedRows = await Attendance.update(req.params.id, status);
    if (affectedRows === 0) return res.status(404).json({ error: 'Attendance record not found' });
    res.json({ message: 'Attendance updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const affectedRows = await Attendance.delete(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ error: 'Attendance record not found' });
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;