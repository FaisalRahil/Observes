var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin/admin');
});

/* GET home page. */
router.get('/org', function(req, res) {
  console.log("got here");
  res.render('admin/org');
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
router.get('/org/natMedia', function(req, res) {
  res.render('natMedia');
});

/* GET home page. */
router.get('/org/natOrg', function(req, res) {
  res.render('natOrg');
});

/* GET home page. */
router.get('/org/guest', function(req, res) {
  res.render('guest');
});

/* GET home page. */
router.get('/editOrg/:id', function(req, res) {
  res.render('editOrg');
});

/* GET home page. */
router.get('/obs/natOrg', function(req, res) {
  res.render('natOrg');
});

/* GET home page. */
router.get('/obs/natMedia', function(req, res) {
  res.render('natMedia');
});

/* GET home page. */
router.get('/obs/guest', function(req, res) {
  res.render('guest');
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
