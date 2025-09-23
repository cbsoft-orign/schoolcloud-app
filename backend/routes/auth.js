const express = require('express'); const router = express.Router(); const jwt = require('jsonwebtoken'); const bcrypt = require('bcryptjs'); const User = require('../models/user');

router.post('/register', async (req, res) => { const { username, email, password, role } = req.body; if (!['admin', 'teacher', 'student', 'parent'].includes(role)) { return res.status(400).json({ error: 'Invalid role' }); }

try { const userId = await User.create(username, email, password, role); const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' }); res.status(201).json({ token }); } catch (err) { res.status(400).json({ error: err.message }); } });

router.post('/login', async (req, res) => { const { email, password } = req.body; try { const user = await User.findByEmail(email); if (!user) return res.status(400).json({ error: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password_hash);
if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ token });

} catch (err) { res.status(500).json({ error: err.message }); } });

module.exports = router;