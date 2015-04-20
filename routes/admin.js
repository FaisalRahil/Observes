var express = require('express');
var router = express.Router();
var customer=[{"idcustomer":10000000,"first_name":"abdoo","last_name":"ageel"}]
var orgMgr = require('../app/org').orgMgr;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('admin/admin');
});

/* GET home page. */
router.get('/moveOrg', function(req, res) {
  res.render('admin/moveOrg');
});

/* GET home page. */
router.get('/org', function(req, res) {
  res.render('admin/org');
});
router.get('/get', function(req, res) {
  orgMgr.getOrg(function(result){
    res.send(result);
  })
});
/* GET home page. */
router.get('/obs', function(req, res) {
  res.render('admin/obs');
});

/* GET home page. */
router.get('/report', function(req, res) {
  res.render('admin/report');
});

/* GET home page. */
router.get('/org/natMedia', function(req, res) {
  res.render('admin/natMedia');
});

/* GET home page. */
router.get('/org/natOrg', function(req, res) {
  res.render('admin/natOrg');
});

/* GET home page. */
router.get('/org/guest', function(req, res) {
  res.render('admin/guest');
});

/* GET home page. */
router.get('/editOrg/:id', function(req, res) {
  res.render('admin/editOrg');
});

/* GET home page. */
router.get('/obs/natOrg', function(req, res) {
  res.render('admin/natOrg');
});

/* GET home page. */
router.get('/obs/natMedia', function(req, res) {
  res.render('admin/natMedia');
});

/* GET home page. */
router.get('/obs/guest', function(req, res) {
  res.render('admin/guest');
});

/* GET home page. */
router.get('/editObs/:id', function(req, res) {
  res.render('admin/editObs');
});

/* GET home page. */
router.get('/delObs/:id', function(req, res) {
  res.render('admin/delObs');
});

/* GET home page. */
router.get('/delOrg/:id', function(req, res) {
  res.send('delOrg');
});

module.exports = router;
