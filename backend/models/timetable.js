const db = require('../db');

const Timetable = { create: (class_id, day_of_week, start_time, end_time, subject, teacher_id) => { return new Promise((resolve, reject) => { db.query( 'INSERT INTO Timetables (class_id, day_of_week, start_time, end_time, subject, teacher_id) VALUES (?, ?, ?, ?, ?, ?)', [class_id, day_of_week, start_time, end_time, subject, teacher_id], (err, result) => { if (err) return reject(err); resolve(result.insertId); } ); }); },

findAll: () => { return new Promise((resolve, reject) => { db.query('SELECT * FROM Timetables', (err, results) => { if (err) return reject(err); resolve(results); }); }); },

findById: (id) => { return new Promise((resolve, reject) => { db.query('SELECT * FROM Timetables WHERE id = ?', [id], (err, results) => { if (err) return reject(err); resolve(results[0]); }); }); },

update: (id, class_id, day_of_week, start_time, end_time, subject, teacher_id) => { return new Promise((resolve, reject) => { db.query( 'UPDATE Timetables SET class_id = ?, day_of_week = ?, start_time = ?, end_time = ?, subject = ?, teacher_id = ? WHERE id = ?', [class_id, day_of_week, start_time, end_time, subject, teacher_id, id], (err, result) => { if (err) return reject(err); resolve(result.affectedRows); } ); }); },

delete: (id) => { return new Promise((resolve, reject) => { db.query('DELETE FROM Timetables WHERE id = ?', [id], (err, result) => { if (err) return reject(err); resolve(result.affectedRows); }); }); } };

module.exports = Timetable;