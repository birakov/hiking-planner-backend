const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const sequelize = require('./config/db');
const tripsRouter = require('./routes/trips');
const participantsRouter = require('./routes/participants');
const usersRouter = require('./routes/users');
const userRolesRouter = require('./routes/userroles');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // ← Измени на адрес твоего фронтенда
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Маршруты
app.use('/api/trips', tripsRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/users', usersRouter);
app.use('/api/userroles', userRolesRouter);

app.get('/', (req, res) => {
  res.send('Hiking Planner API is running');
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Ошибка подключения к БД:', err);
  });

module.exports = app;