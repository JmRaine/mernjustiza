const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, isAdmin, async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json(students);
});

router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const student = await User.create({ name, email, password: hashed, role: 'student' });
  res.status(201).json(student);
});

router.get('/me', verifyToken, async (req, res) => {
  const me = await User.findById(req.user.id).select('-password');
  res.json(me);
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  const { name, email } = req.body;
  const student = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  ).select('-password');
  res.json(student);
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
