import { validateEmail } from './../utils/validation';
import { generateData } from './../modules/email/controller';
import { generateMessageData } from './../modules/message/controller';
import { app } from './../index';
import chai from 'chai';
import chaiHttp from 'chai-http';

const assert = require('assert');
const DEFAULT_PATH = '/api/v1/';

chai.use(chaiHttp);
const should = chai.should();
//unit test
describe('isValidEmail', function() {
  it('should return true when place xxx@xxx.com', function() {
    const email = 'xxx@xxx.com';
    assert.strictEqual(validateEmail(email),true);
  })
  it('should return false when place xxx@xxx', function() {
    const email = 'xxx@xxx';
    assert.strictEqual(validateEmail(email),false);
  })
});

describe('generateEmailData', function() {
  it('should return object data for sending email', function() {
    const expect = {
      from: 'xiaoxi625@hotmail.com',
      to: 'chase.cammy.test@gmail.com,bphan625@gmail.com',
      subject: 'testing',
      text: 'This is a testing email'
    };
    const data = {
      name: 'chase',
      email: 'bphan625@gmail.com',
      subject: 'testing',
      details: 'This is a testing email'
    };
    const sender = 'xiaoxi625@hotmail.com';
    const defaultEmail = 'chase.cammy.test@gmail.com';
    assert.deepEqual(generateData(data, sender,defaultEmail),expect);
  })
});

describe('generateMessageData', function() {
  it('should return object data to store in database', function() {
    const date = new Date();
    const expect = {
      uuid: '9e45f92e-d7d5-4e28-bc52-57a216ca142a',
      name: 'chase',
      mobile: '0405285025',
      email: 'xiaoxi625.asd@hotmail.com',
      details: 'This is a testing email',
      subject: 'testing',
      createdTime: date,
    };
    const uuid = '9e45f92e-d7d5-4e28-bc52-57a216ca142a';
    const data = {
      "name": "chase",
    	"email":"xiaoxi625.asd@hotmail.com",
    	"mobile":"0405285025",
    	"subject":"testing",
    	"details":"This is a testing email"
    };
    assert.deepEqual(generateMessageData(data,uuid,date),expect);
  })
});

//endpoint test
//mocha doesn't support arrow function well, so I defined normally function
describe('/GET message', function () {
    this.timeout(10000);
    it('it should GET one message', (done) => {
      setTimeout(done, 10000);
      chai.request(app)
          .get(DEFAULT_PATH + 'messages/message/811bd5c0-b413-4aae-b0c4-1c99533e094a')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
});
describe('/POST messages', function () {
  this.timeout(10000);
  it('it should POST message', (done) => {
    setTimeout(done, 10000);
    const reqBody = {
      "name": "chase",
      "email":"xiaoxi625.asd@hotmail.com",
      "mobile":"0405285025",
      "subject":"testing",
      "details":"testing"
    }
    chai.request(app)
        .post(DEFAULT_PATH + '/messages/message')
        .send(reqBody)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
          done();
        });
  });
});
