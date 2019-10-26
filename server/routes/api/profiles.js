const express = require('express');

const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['first_name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/province', async (req, res) => {
  var http = require('https');

  var options = {
    method: 'GET',
    hostname: 'pro.rajaongkir.com',
    port: null,
    path: '/api/province',
    headers: {
      key: '095d8bb01e2e836bb6fe4810ec099d54'
    }
  };

  var req = http.request(options, function(result) {
    var chunks = [];

    result.on('data', function(chunk) {
      chunks.push(chunk);
    });

    result.on('end', function() {
      var body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  req.end();
});

router.get('/regency', async (req, res) => {
  var http = require('https');

  var options = {
    method: 'GET',
    hostname: 'pro.rajaongkir.com',
    port: null,
    path: '/api/city',
    headers: {
      key: '095d8bb01e2e836bb6fe4810ec099d54'
    }
  };

  var req = http.request(options, function(result) {
    var chunks = [];

    result.on('data', function(chunk) {
      chunks.push(chunk);
    });

    result.on('end', function() {
      var body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  req.end();
});

router.get('/district', async (req, res) => {
  var http = require('https');

  var options = {
    method: 'GET',
    hostname: 'pro.rajaongkir.com',
    port: null,
    path: '/api/subdistrict',
    headers: {
      key: '095d8bb01e2e836bb6fe4810ec099d54'
    }
  };

  var req = http.request(options, function(result) {
    var chunks = [];

    result.on('data', function(chunk) {
      chunks.push(chunk);
    });

    result.on('end', function() {
      var body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  req.end();
});

module.exports = router;
