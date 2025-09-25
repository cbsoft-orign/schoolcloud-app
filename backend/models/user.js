const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (username, email, password, role) => {
    const password_hash = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [username, email, password_hash, role],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;