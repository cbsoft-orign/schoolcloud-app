const db = require('../db');

const Attendance = {
  create: (student_id, timetable_id, date, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO Attendance (student_id, timetable_id, date, status) VALUES (?, ?, ?, ?)',
        [student_id, timetable_id, date, status],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  findByTimetable: (timetable_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT a.*, u.username FROM Attendance a JOIN Users u ON a.student_id = u.id WHERE a.timetable_id = ?',
        [timetable_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  update: (id, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE Attendance SET status = ? WHERE id = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Attendance WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  }
};

module.exports = Attendance;