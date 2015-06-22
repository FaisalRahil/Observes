var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
var orgMgr = require('../app/org').orgMgr;
var  app = require('express')();
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
/* GET home page. */
router.get('/', function(req, res) {
  orgMgr.getOrgs(function(results){
    console.log(results);
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/report/test.html"), "utf8"),
        phantom: {
          header: "<img src='images/hnec_logo.png'>"
        }
      },
      data: { re: results }
    }).then(function(out) {
      out.result.pipe(res);
    });
  });
});


module.exports = router;
