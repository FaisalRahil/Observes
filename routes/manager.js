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
  orgMgr.getOrg(6,function(result){
   res.render('manager/candidate',{ title: 'المرشحين',orgs:result });
});
});
/* GET home page. */
router.get('/editOrg/:id', function(req, res) {
  res.render('editOrg');
});

/* GET home page. */
router.get('/obs/locOrg', function(req, res) {
  orgMgr.getOrg(4,function(result){
   res.render('manager/locOrgObs',{ title: 'مراقب محلي',orgs:result }); 
  }) 
});

/* GET home page. */
router.get('/obs/locMedia', function(req, res) {
  orgMgr.getOrg(5,function(result){
    res.render('manager/locMediaObs',{ title: 'المنظمات',orgs:result });
  });
});

/* GET home page. */
router.get('/obs/agent', function(req, res) {
  orgMgr.getOrg(6,function(result){
   res.render('manager/agent',{ title: 'الوكيل',orgs:result });
});
});

/* EDIT. */
router.get('/editMediaObs/:id', function(req, res) {
  obsMgr.getObs_Id(req.params.id,function(err,result){
    res.render('manager/editMediaObs',{ title: 'المراقبين' ,obs:result,nav:'navbar-red'});
  });
});

router.get('/editLocOrg/:id', function(req, res) {
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('manager/editOrg',{ title: 'تعديل المنضمة' ,org:result,nav:'navbar-inverse'});
  });
});
/* EDIT. */
router.get('/editAgentObs/:id', function(req, res) {
  obsMgr.getObs_Id(req.params.id,function(err,result){
    res.render('manager/editAgentObs',{ title: 'المراقبين' ,obs:result});
  });
});
/* EDIT. */
router.get('/editlocMeadia/:id', function(req, res) {
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('manager/editlocMeadia',{ title: 'الاعلام المحلي' ,org:result});
  });
});
router.get('/editCandidateOrg/:id', function(req, res) {
  orgMgr.getOrg_Id(req.params.id,function(err,result){
    res.render('manager/editOrg',{ title: 'تعديل المنضمة' ,org:result,nav:'navbar-red'});
  });
});
router.get('/editOrgObs/:id', function(req, res) {
  obsMgr.getObs_Id(req.params.id,function(err,result){
    res.render('manager/editOrgObs',{ title: 'المراقبين' ,obs:result});
  });
});

/* GET home page. */
router.post('/editObs_name', function(req, res) {
  obsMgr.editObs_name(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editObs_pass_nid', function(req, res) {
  obsMgr.editObs_pass_nid(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editObs_email', function(req, res) {
  obsMgr.editObs_email(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editObs_phone_obs', function(req, res) {
  obsMgr.editObs_phone_obs(req.body,function(err,result){
    res.send(result);
  });
});

// ====================== edit org

/* GET home page. */
router.post('/editOrg_registration_no', function(req, res) {
  orgMgr.editOrg_registration_no(req.body,function(err,result){
    res.send(result);
  });
});
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
/* GET home page. */
router.post('/editOrg_phone', function(req, res) {
  orgMgr.editOrg_phone(req.body,function(err,result){
    res.send(result);
  });
});

/* GET home page. */
router.post('/editOrg_address', function(req, res) {
  orgMgr.editOrg_address(req.body,function(err,result){
    res.send(result);
  });
});

// ====================== end edit org
/* GET home page. */
router.get('/delObs/:id', function(req, res) {
  obsMgr.delObs(req.params.id,function(result){
    res.send('result');
  })
});

/* GET home page. */
router.get('/delOrg/:id', function(req, res) {
  orgMgr.delOrg(req.params.id,function(err,result){
    res.send(true);
  });
});

router.get('/checkOrg/:id', function(req, res) {
  obsMgr.getObsIdOrg(req.params.id,function(result){
    if(result[0]){
      res.send(false);
    }else{
      res.send(true);
    }
  });
});
router.get('/getObsIdOrg/:id', function(req, res) {
  obsMgr.getOrgObs(req.params.id,function(result){
    res.send(result);
  });
});

/* GET home page. */
router.get('/getOb', function(req, res) {
  obsMgr.getOb(5,function(result){
    res.send(result);
  });
});

/* GET home page. */
router.get('/getOb4', function(req, res) {
  obsMgr.getOb(4,function(result){
    res.send(result);
  });
});

router.get('/getOb6', function(req, res) {
  obsMgr.getOb(6,function(result){
    res.send(result);
  });
});
router.get('/getOrg6', function(req, res) {
  orgMgr.getOrg(6,function(result){
    res.send(result);
  });
});
router.get('/getOrg5', function(req, res) {
  orgMgr.getOrg(5,function(result){
    res.send(result);
  });
});
router.get('/getOrg4', function(req, res) {
  orgMgr.getOrg(4,function(result){
    res.send(result);
  });
});
router.post('/addObs', function(req, res) {
  type=req.body["Type"];
  delete req.body["Type"];
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
    if(type==4){
      res.redirect('/manager/obs/locOrg');
    }
    if(type==5){
      res.redirect('/manager/obs/locMedia');
    }
    if(type==6){
      res.redirect('/manager/obs/agent');
    }
  });
});

router.post('/addOrg', function(req, res) {
  req.body['id_office']=1;
  orgMgr.addOrg(req.body, function (results){
    if (req.body["type"] == 6) {
      res.redirect('org/candidate');
    } else if (req.body["type"] == 5){
      res.redirect('org/locMedia');
    } else {
      res.redirect('org/locOrg');
    
    } 

  });
});

module.exports = router;
