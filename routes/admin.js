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

router.get('/ww', function(req, res) {
  orgMgr.getser(function(result){
    console.log("sdadddd");
  });
});

///////////////////////////////////////////

router.post('/addOrg', function(req, res) {
  orgMgr.addOrg(req.body, function (results){
    if (req.body["type"] == 1) {
      res.redirect('org/natOrg');
    } else if (req.body["type"] == 2){
      res.redirect('org/guest');
    } else {
      res.redirect('org/natMedia');
    }
  });
});

// bhuvhvihybuvbiobuo
router.post('/addOb', function(req, res) {
  
  type=req.body["type"];
  delete req.body["type"];
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
    if (type == 1) {
      res.redirect('obs/natOrgObs');
    } else if (type == 2){
      res.redirect('obs/guestObs');
    } else if (type == 3){
      res.redirect('obs/natMediaObs');
    }
  });
});

//---- Get all obs by org -----------------------
router.get('/getOrgObs/:id',function(req , res ){
  obsMgr.getOrgObs(req.params.id,function(result){
    res.send(result);
  });
});

//*************************************************
//
router.get('/getObs',function(req , res ){
  obsMgr.getAllObsAndNameOrgByType(3,function(result){
    res.send(result);
  });
});

router.get('/getNatOrg', function(req, res) {
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
  res.render('admin/obs',{ title: 'مراقبين'});
});

router.get('/getAllObs',function(req , res ){
  obsMgr.getAllObs(function(result){
    res.send(result);
  });
});
///////////////////////////////////////////////////////////////////////////
router.get('/getAllObsAndNameOrg',function(req , res ){
  obsMgr.getAllObsAndNameOrg(function(result){
    res.send(result);
  });
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
/////////////////////////////////////////////////
// start

  /* GET home page. */
  router.get('/obs/natOrgObs', function(req, res) {
    orgMgr.getOrg(1,function(result){
      res.render('admin/natOrgObs',{ title: 'مراقبين المنظمات العالمية' ,orgs:result});
    })
  });

  /* GET home page. */
  router.get('/obs/guestObs', function(req, res) {
    orgMgr.getOrg(2,function(result){
      res.render('admin/guestObs',{ title: 'مراقبين المنظمات العالمية' ,orgs:result});
    })
  });

  /* GET home page. */
  router.get('/obs/natMediaObs', function(req, res) {
    orgMgr.getOrg(3,function(result){
      res.render('admin/natMediaObs',{ title: 'مراقبين المنظمات العالمية' ,orgs:result});
    })
  });

// end
//////////////////////////////////////////////////////////////////
// start edit 
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
// end edit
/////////////////////////////////////////////////////
// start edit methods org

  /* GET home page. */
  router.get('/editOrg/:id', function(req, res) {
    orgMgr.getOrg_Id(req.params.id,function(err,result){
      res.render('admin/editOrg',{ title: 'المنظمات' ,org:result});
    });
  });

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

// end edit methods org
////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ***************************************************
// start

  /* Edit general observers . */
  router.get('/editObs/:id', function(req, res) {
    obsMgr.getObs_Id(req.params.id,function(err,result){
      res.render('admin/editObs',{ title: 'تعديل المراقبين' ,obs:result,nav:'navbar-inverse'});
    });
  });

  /*    editObs_pass_nid  . */
  router.post('/editObs_pass_nid', function(req, res) {
    obsMgr.editObs_pass_nid(req.body,function(err,result){
      res.send(result);
    });
  });

  /*    editObs_name  . */
  router.post('/editObs_name', function(req, res) {
    obsMgr.editObs_name(req.body,function(err,result){
      res.send(result);
    });
  });

  /*    editObs_email  . */
  router.post('/editObs_email', function(req, res) {
    obsMgr.editObs_email(req.body,function(err,result){
      res.send(result);
    });
  });

  /*   editObs_phone  . */
  router.post('/editObs_phone', function(req, res) {
    obsMgr.editObs_phone(req.body,function(err,result){
      res.send(result);
    });
  });

    /*   editObs_nationality  . */
  router.post('/editObs_nationality', function(req, res) {
    obsMgr.editObs_nationality(req.body,function(err,result){
      res.send(result);
    });
  });

    /*   editObs_director  . */
  router.post('/editObs_director', function(req, res) {
    obsMgr.editObs_director(req.body,function(err,result){
      res.send(result);
    });
  });

    /*   editObs_gender  . */
  router.post('/editObs_gender', function(req, res) {
    obsMgr.editObs_gender(req.body,function(err,result){
      res.send(result);
    });
  });

// end
// *****************************************************
// /////////////////////////////////////////////////////

// //////////////////////////////////////////////////////
// ******************************************************
// Start

  /* GET home page. */
  router.get('/editNatMediaObs/:id', function(req, res) {
    obsMgr.getObs_Id(req.params.id,function(err,result){
      res.render('admin/editObs',{ title: 'تعديل المراقبين' ,obs:result,nav:'navbar-orange'});
    });
  });

  /* GET home page. */
  router.get('/editNatOrgObs/:id', function(req, res) {
    obsMgr.getObs_Id(req.params.id,function(err,result){
      res.render('admin/editObs',{ title: 'تعديل المراقبين' ,obs:result,nav:'navbar-red'});
    });
  });
  
  /* GET home page. */
  router.get('/editGuestObs/:id', function(req, res) {
    obsMgr.getObs_Id(req.params.id,function(err,result){
      res.render('admin/editObs',{ title: 'تعديل المراقبين' ,obs:result,nav:'navbar-green'});
    });
  });

// End
// *********************************************************
// /////////////////////////////////////////////////////////

/* GET home page. */
router.get('/delObs/:id', function(req, res) {
  obsMgr.delObs(req.params.id,function(result){
    res.send('result');
  })
});

/* GET home page. */
router.get('/delOrg/:id', function(req, res) {
  orgMgr.delOrg(req.params.id,function(result){
    res.send('result');
  })
});


//////////////////////////////////////////////////////// 
// start

router.get('/getNatOrgObs', function(req, res) {
  obsMgr.getAllObsAndNameOrgByType(1,function(result){
    res.send(result);
  })
});

router.get('/getGuestObs', function(req, res) {
  obsMgr.getAllObsAndNameOrgByType(2,function(result){
    res.send(result);
  })
});

router.get('/getNatMediaObs', function(req, res) {
  obsMgr.getAllObsAndNameOrgByType(3,function(result){
    res.send(result);
  })
});
// end
// //////////////////////////////////////////////////////
module.exports = router;
