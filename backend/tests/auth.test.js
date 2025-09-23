const request = require('supertest');

const app = require('../server'); const db = require('../db'); const jwt = require('jsonwebtoken');

beforeAll((done) => { db.connect((err) => { if (err) throw err; done(); }); });

afterAll((done) => { db.end(done); });

describe('Auth API', () => { it('should prevent unauthorized timetable creation', async () => { const res = await request(app) .post('/api/timetables') .send({ class_id: 1, day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:00:00', subject: 'Math', teacher_id: 1 }); expect(res.statusCode).toEqual(401); expect(res.body).toHaveProperty('error', 'Access denied, no token provided'); });

it('should prevent student role from creating timetable', async () => { const token = jwt.sign({ id: 1, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' }); const res = await request(app) .post('/api/timetables') .set('Authorization', `Bearer ${token}`) .send({ class_id: 1, day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:00:00', subject: 'Math', teacher_id: 1 }); expect(res.statusCode).toEqual(403); expect(res.body).toHaveProperty('error', 'Access denied'); }); });