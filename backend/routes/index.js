const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, addUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const validateUrl = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), addUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
