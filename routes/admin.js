var express = require('express');
var router = express.Router();
var orgMgr = require('../app/org').orgMgr;
var obsMgr = require('../app/obs').obsMgr;

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
router.get('/getObs',function(req , res ){
  obsMgr.getOb(3,function(result){
    res.send(result);
  });
});
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
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('admin/editOrg',{ title: 'المنظمات' ,org:result});
  });
});

/* GET home page. */
router.post('/editOrg_registration_no', function(req, res) {
  orgMgr.editOrg_registration_no(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editOrg_name_org', function(req, res) {
  orgMgr.editOrg_name_org(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editOrg_name_director', function(req, res) {
  orgMgr.editOrg_name_director(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editOrg_email', function(req, res) {
  orgMgr.editOrg_email(req.body,function(err,result){
    res.send(result);
  });
});

router.post('/editOrg_address', function(req, res) {
  orgMgr.editOrg_address(req.body,function(err,result){
    res.send(result);
  });
});

router.post('/editOrg_phone', function(req, res) {
  orgMgr.editOrg_phone(req.body,function(err,result){
    res.send(result);
  });
});
/////////////////////////////////////////////////////

/* GET home page. */
router.get('/editMedia/:id', function(req, res) {
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('admin/editMedia',{ title: 'المنظمات' ,media:result});
  });
});


/* GET home page. */
router.get('/editGuest/:id', function(req, res) {
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('admin/editGuest',{ title: 'المنظمات' ,guest:result});
  });
});


////////////////////////////////////////////

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

/* GET home page. */
router.get('/delMedia/:id', function(req, res) {
  orgMgr.delMedia(req.params.id,function(result){
    res.send('result');
  })
});

/* GET home page. */
router.get('/delGuest/:id', function(req, res) {
  orgMgr.delGuest(req.params.id,function(result){
    res.send('result');
  })
});

module.exports = router;
