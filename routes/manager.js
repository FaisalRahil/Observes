var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('manager');
});

/* GET home page. */
router.get('/org', function(req, res) {
  res.render('org');
});

/* GET home page. */
router.get('/obs', function(req, res) {
  res.render('obs');
});

/* GET home page. */
router.get('/report', function(req, res) {
  res.render('report');
});

/* GET home page. */
router.get('/org/locMedia', function(req, res) {
  res.render('natMedia');
});

/* GET home page. */
router.get('/org/locOrg', function(req, res) {
  res.render('natOrg');
});

/* GET home page. */
router.get('/org/candidate', function(req, res) {
  res.render('candidate');
});

/* GET home page. */
router.get('/editOrg/:id', function(req, res) {
  res.render('editOrg');
});

/* GET home page. */
router.get('/obs/locOrg', function(req, res) {
  res.render('locOrg');
});

/* GET home page. */
router.get('/obs/locMedia', function(req, res) {
  res.render('locMedia');
});

/* GET home page. */
router.get('/obs/agent', function(req, res) {
  res.render('agent');
});

/* GET home page. */
router.get('/editObs/:id', function(req, res) {
  res.render('editObs');
});

/* GET home page. */
router.get('/delObs/:id', function(req, res) {
  res.render('delObs');
});

/* GET home page. */
router.get('/delOrg/:id', function(req, res) {
  res.send('delOrg');
});

module.exports = router;
