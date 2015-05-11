var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
var orgMgr = require('../app/org').orgMgr;
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
  orgMgr.getOrg(5,function(result){
    res.render('manager/locMediaObs',{ title: 'المنظمات',orgs:result });
  });
});

/* GET home page. */
router.get('/obs/agents', function(req, res) {
  res.render('manager/agent');
});

/* EDIT. */
router.get('/editMediaObs/:id', function(req, res) {
  obsMgr.getObs_Id(req.params.id,function(err,result){
    res.render('manager/editMediaObs',{ title: 'المراقبين' ,obs:result});
    console.log("hi "+req.params.id+"result "+result);
  });
});


/* GET home page. */
router.post('/editMediaObs_name', function(req, res) {
  obsMgr.editObs_name(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editMediaObs_pass_nid', function(req, res) {
  obsMgr.editObs_pass_nid(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editMediaObs_email', function(req, res) {
  obsMgr.editObs_email(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editMediaObs_phone_obs', function(req, res) {
  obsMgr.editObs_phone_obs(req.body,function(err,result){
    res.send(result);
  });
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
  req.body['id_office']=1;
  req.body['nationality']=1;
  if(req.body['gender']){
    req.body['gender']=0;
  }
  else{
    req.body['gender']=1;
  }
  if(req.body['director']){
    req.body['director']=0;
  }
  else{
    req.body['director']=1;
  }
  obsMgr.addOb(req.body,function(err,result){
    res.redirect('/manager/obs/locMedia');
  });
});

module.exports = router;
