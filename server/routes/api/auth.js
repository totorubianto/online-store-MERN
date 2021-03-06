const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const connectMail = require('../../utils/email');
const User = require('../../models/User');
const uuidv1 = require('uuid/v1');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, rememberme } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      if (rememberme) {
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/forgotpassword',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const password = uuidv1();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      let user = await User.findOneAndUpdate(
        { email: email },
        { password: hashPassword }
      ).select('-password');

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'No Account' }] });
      }

      connectMail(1, email, password)
        .then(data => {
          res.json(user);
        })
        .catch(err => {
          res.status(500).send('Email not send');
        });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
