var express = require('express');
var userHelpers = require('../app/userHelpers');
var router = express.Router();
var userMgr = require('../app/user').userMgr;


/* GET cpanel page. */
router.get('/', function(req, res) {
    res.render('cpanel',{title:'cpanel'});
});

/* GET cpanel page. */
router.get('/cpanelAdmin', function(req, res) {
    res.render('cpanelAdmin',{title:'cpanelAdmin'});
});

/* GET cpanel page. */
router.get('/cpanelManager', function(req, res) {
    res.render('cpanelManager',{title:'cpanelManager'});
});
 
/* GET COMPNEY   */
router.get('/orgainsation', function(req, res) {
    res.render('orgainsation',{title:''});
});

/*  observers */ 
router.get('/observers', function(req, res) {
    res.render('observers',{title:''});
});

module.exports = router;