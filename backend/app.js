const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const router = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MESTO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MESTO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(requestLogger);
app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT);
