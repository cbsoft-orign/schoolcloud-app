const express = require('express'); const router = express.Router(); const Timetable = require('../models/timetable'); const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => { const { class_id, day_of_week, start_time, end_time, subject, teacher_id } = req.body; if (req.user.role !== 'admin' && req.user.role !== 'teacher') { return res.status(403).json({ error: 'Access denied' }); } try { const timetableId = await Timetable.create(class_id, day_of_week, start_time, end_time, subject, teacher_id); res.status(201).json({ id: timetableId }); } catch (err) { res.status(400).json({ error: err.message }); } });

router.get('/', async (req, res) => { try { const timetables = await Timetable.findAll(); res.json(timetables); } catch (err) { res.status(500).json({ error: err.message }); } });

router.get('/:id', async (req, res) => { try { const timetable = await Timetable.findById(req.params.id); if (!timetable) return res.status(404).json({ error: 'Timetable not found' }); res.json(timetable); } catch (err) { res.status(500).json({ error: err.message }); } });

router.put('/:id', authMiddleware, async (req, res) => { const { class_id, day_of_week, start_time, end_time, subject, teacher_id } = req.body; if (req.user.role !== 'admin' && req.user.role !== 'teacher') { return res.status(403).json({ error: 'Access denied' }); } try { const affectedRows = await Timetable.update(req.params.id, class_id, day_of_week, start_time, end_time, subject, teacher_id); if (affectedRows === 0) return res.status(404).json({ error: 'Timetable not found' }); res.json({ message: 'Timetable updated' }); } catch (err) { res.status(400).json({ error: err.message }); } });

router.delete('/:id', authMiddleware, async (req, res) => { if (req.user.role !== 'admin') { return res.status(403).json({ error: 'Access denied' }); } try { const affectedRows = await Timetable.delete(req.params.id); if (affectedRows === 0) return res.status(404).json({ error: 'Timetable not found' }); res.json({ message: 'Timetable deleted' }); } catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;