var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('admin');
});

/* GET home page. */
router.get('/admin/org', function(req, res) {
  res.redirect('org');
});

/* GET home page. */
router.get('/admin/obs', function(req, res) {
  res.redirect('obs');
});

/* GET home page. */
router.get('/admin/report', function(req, res) {
  res.redirect('report');
});

/* GET home page. */
router.get('/admin/org/natMedia', function(req, res) {
  res.redirect('natMedia');
});

/* GET home page. */
router.get('/admin/org/natOrg', function(req, res) {
  res.redirect('natOrg');
});

/* GET home page. */
router.get('/admin/org/guest', function(req, res) {
  res.redirect('guest');
});

/* GET home page. */
router.get('/admin/editOrg/:id', function(req, res) {
  res.redirect('editOrg');
});

/* GET home page. */
router.get('/admin/obs/natOrg', function(req, res) {
  res.redirect('natOrg');
});

/* GET home page. */
router.get('/admin/obs/natMedia', function(req, res) {
  res.redirect('natMedia');
});

/* GET home page. */
router.get('/admin/obs/guest', function(req, res) {
  res.redirect('guest');
});

/* GET home page. */
router.get('/admin/editObs/:id', function(req, res) {
  res.redirect('editObs');
});

/* GET home page. */
router.get('/admin/delObs/:id', function(req, res) {
  res.redirect('delObs');
});

/* GET home page. */
router.get('/admin/delOrg/:id', function(req, res) {
  res.send('delOrg');
});

module.exports = router;
