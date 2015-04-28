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

///////////////////////////////////////////

router.post('/addOrg', function(req, res) {
  orgMgr.addOrg(req.body, function (results){
    console.log(req.body);
    if (req.body["type"] == 1) {
      res.redirect('org/natOrg');
    
    } else if (req.body["type"] == 2){
      res.redirect('org/guest');
    
    } else {
      res.redirect('org/natMedia');
    
    } 

  });
});

//*************************************************
// 
router.get('/getNatOrg', function(req, res) {
  console.log("adsasd");
  orgMgr.getOrg(1,function(result){
    res.send(result);
  })
});
// 
router.get('/getGuest', function(req, res) {
  orgMgr.getOrg(2,function(result){
    res.send(result);
  })
});
// 
router.get('/getNatMedia', function(req, res) {
  orgMgr.getOrg(3,function(result){
    res.send(result);
  })
});

//*************************************************
// Get all organisation .  
router.get('/getOrg', function(req, res) {
  orgMgr.getOrgs(function(result){
    res.send(result);
  })
});
//******************************************
router.get('/org/natOrg', function(req, res) {
    res.render('admin/natOrg',{ title: 'المنظمات'});
});

/* GET home page. */
router.get('/org', function(req, res) {
    res.render('admin/org',{ title: 'المنظمات' });
  });

//////////////////////////////////////////////

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
  orgMgr.delOrg(req.params.id,function(result){
    res.send('result');
  })
});

module.exports = router;
