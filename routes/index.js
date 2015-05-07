var express = require('express');
var router = express.Router();
var userMgr = require('../app/users').userMgr;
var userHelp = require('../app/userHelpers');
var office = require('../office.json');
var login = require('../app/login')(router);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'تسجيل الدخول' });
});

router.get('/adduser', function(req, res) {
  res.render('adduser', { title: 'اضافة مستخدم ',offices:office });
});

router.post('/addUser', function(req, res) {
  userHelp.addUser(req.body, function (results){
    res.redirect('/adduser');
  });
});

router.post('/checkUser',function(req, res) {
  userMgr.getUserByUserName(req.body.user, function(result){
    if(!result){
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
module.exports = router;
