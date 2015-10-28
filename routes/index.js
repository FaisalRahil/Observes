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

router.get('/edituser/:id', function(req, res) {
  userMgr.getUserById(req.params.id,function(result){
    res.render('edituser', { title: 'تعديل مستخدم ',offices:office ,user:result[0]  });
  });
});

/*    edit user name   . */
router.post('/user_name', function(req, res) {
  userMgr.user_name(req.body,function(result){
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post('/last_name', function(req, res) {
  userMgr.last_name(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
/*    edit user firstname   . */
router.post('/first_name', function(req, res) {
  userMgr.first_name(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post('/password', function(req, res) {
  userMgr.password(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post('/last_name', function(req, res) {
  userMgr.last_name(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post('/phone_no', function(req, res) {
  userMgr.phone_no(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
router.post('/addUser', function(req, res) {
  userHelp.addUser(req.body, function (results){
    res.redirect('/adduser');
  });
});

router.post('/id_office', function(req, res) {
  userMgr.id_office(req.body,function(result){
    console.log(result);
    res.send(result);
  });
});
router.get('/user_office', function(req, res) {
  console.log(office);
  res.send(office);
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
