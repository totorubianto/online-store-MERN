const expect = require('chai').expect;
const request = require('supertest');

const auth = require('../server');
const connectDB = require('../config/db');
const User = require('../models/User');

describe('POST /user', () => {
  before(done => {
    connectDB
      .connectDB()
      .then(() => done())
      .catch(err => done(err));
    User.deleteMany({}, function(err) {});
  });

  after(done => {
    connectDB
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  it('OK, creating a new user works', done => {
    request(auth)
      .post('/api/users')
      .send({
        name: 'NOTE',
        email: 'AAA@gmail.com',
        password: 'asasdasd',
        date: '17/01/2001'
      })
      .then(res => {
        const body = res.body;
        expect(body).to.contain.property('token');

        done();
      })
      .catch(err => done(err));
  });

  it('Fail, requires password 6 character', done => {
    request(auth)
      .post('/api/users')
      .send({
        name: 'NOTE',
        email: 'AAA@gmail.com',
        password: 'as',
        date: '17/01/2001'
      })
      .then(res => {
        const body = res.body;
        expect(body.errors).to.have.deep.members([
          {
            location: 'body',
            value: 'as',
            param: 'password',
            msg: 'Please enter a password with 6 or more characters'
          }
        ]);
        done();
      })
      .catch(err => done(err));
  });
  it('Fail, user already exist', done => {
    request(auth)
      .post('/api/users')
      .send({
        name: 'NOTE',
        email: 'AAA@gmail.com',
        password: 'assadfas',
        date: '17/01/2001'
      })
      .then(res => {
        const body = res.body;
        expect(body.errors).to.have.deep.members([
          {
            msg: 'User already exists'
          }
        ]);
        done();
      })
      .catch(err => done(err));
  });
});
