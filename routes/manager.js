var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('manager/manager');
});

/* GET home page. */
router.get('/org', function(req, res) {
  res.render('manager/org');
});

/* GET home page. */
router.get('/obs', function(req, res) {
  res.render('manager/obs');
});

/* GET home page. */
router.get('/report', function(req, res) {
  res.render('report');
});

/* GET home page. */
router.get('/org/locMedia', function(req, res) {
  res.render('manager/locMedia');
});

/* GET home page. */
router.get('/org/locOrg', function(req, res) {
  res.render('manager/locOrg');
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
  res.render('manager/locMediaObs');
});

/* GET home page. */
router.get('/obs/agents', function(req, res) {
  res.render('manager/agent');
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

/* GET home page. */
router.get('/getOb', function(req, res) {
  obsMgr.getOb(5,function(result){
    res.send(result);
  });
});

router.post('/addObs', function(req, res) {
  console.log("YES :D !")
});

module.exports = router;
