var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('manager');
});

/* GET home page. */
router.get('/manager/org', function(req, res) {
  res.redirect('org');
});

/* GET home page. */
router.get('/manager/obs', function(req, res) {
  res.redirect('obs');
});

/* GET home page. */
router.get('/manager/report', function(req, res) {
  res.redirect('report');
});

/* GET home page. */
router.get('/manager/org/locMedia', function(req, res) {
  res.redirect('natMedia');
});

/* GET home page. */
router.get('/manager/org/locOrg', function(req, res) {
  res.redirect('natOrg');
});

/* GET home page. */
router.get('/manager/org/candidate', function(req, res) {
  res.redirect('candidate');
});

/* GET home page. */
router.get('/manager/editOrg/:id', function(req, res) {
  res.redirect('editOrg');
});

/* GET home page. */
router.get('/manager/obs/locOrg', function(req, res) {
  res.redirect('locOrg');
});

/* GET home page. */
router.get('/manager/obs/locMedia', function(req, res) {
  res.redirect('locMedia');
});

/* GET home page. */
router.get('/manager/obs/agent', function(req, res) {
  res.redirect('agent');
});

/* GET home page. */
router.get('/manager/editObs/:id', function(req, res) {
  res.redirect('editObs');
});

/* GET home page. */
router.get('/manager/delObs/:id', function(req, res) {
  res.redirect('delObs');
});

/* GET home page. */
router.get('/manager/delOrg/:id', function(req, res) {
  res.send('delOrg');
});

module.exports = router;
