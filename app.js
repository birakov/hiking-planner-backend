const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const tripsRouter = require('./routes/trips');
const participantsRouter = require('./routes/participants');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/api', participantsRouter);

app.use('/api/trips', tripsRouter);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Добро пожаловать в Hiking Planner API');
});

const PORT = process.env.PORT || 3000;

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