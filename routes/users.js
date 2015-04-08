var express = require('express');
var Step = require('step');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
easyPbkdf2 = require("easy-pbkdf2")();
var userMgr = require('../app/user').userMgr;
var userHelpers = require('../app/userHelpers');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
    res.send('users',{title:'الــمأســتـخـدمـيـــن'});
});

module.exports = router;