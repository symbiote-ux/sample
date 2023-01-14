const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shkjvhdskvhaskfhskfhulyq';
const PORT = process.env.PORT || 5000;
const path = require('path');

const mongoUrl = '';

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to Data Base'))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + 'public')));

require('./userDetails');
const User = mongoose.model('UserInfo');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: 'User Exists', status: 400 });
    }
    await User.create({
      email,
      password: encryptedPassword,
    });
    res.send({ status: 200 });
  } catch (error) {
    res.send({ status: 400 });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ error: 'User Not Found', status: 400 });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: 200, data: token });
    } else {
      return res.json({
        error: 'Try again! Something Bad happen',
        status: 401,
      });
    }
  }
  res.json({ status: 'error', error: 'Invalid password' });
});

app.post('/home', async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: 'ok', data: data });
      })
      .catch((error) => {
        res.send({ status: 'error', data: error });
      });
  } catch (error) {}
});

app.listen(PORT, () => console.log('Server Started at 5000'));
