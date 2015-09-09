var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
var orgMgr = require('../app/org').orgMgr;
var app = require('express')();
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
/* GET home page. */
// router.get('/', function(req, res) {
//   orgMgr.getOrgs(function(results){
//     console.log(results);
//     jsr.render({
//       template: {
//         content:  fs.readFileSync(path.join(__dirname, "../views/report/test.html"), "utf8"),
//         phantom: {
//           header: "<img src='images/hnec_logo.png'>"
//         }
//       },
//       data: { re: results }
//     }).then(function(out) {
//       out.result.pipe(res);
//     });
//   });
// });

router.get('/', function(req, res) {

});

  router.get('/observers', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/observers.html"), "utf8"),
        phantom: {
          format: 'A3',
          orientation: "landscape",
        },
        recipe: "phantom-pdf"
      },
      // data:obb
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // normale A4
  router.get('/certificate', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/certificate.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });


  router.get('/arabicTranscript', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/arabicTranscript.html"), "utf8"),
        recipe: "phantom-pdf",
        helpers:htmlTagsDraw.toString()
      },
      // data:{name:fullName,setNum:setNumber,dept:department,dev:devision,sys:system,obj:arabicTranscriptObject}
      //{name:fullName,setNum:setNumber,dept:department,dev:devision,sys:system}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  router.get('/englishTranscript', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/englishTranscript.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this sertificate // widght A4
  router.get('/giftCertificate', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/giftCertificate.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this sertificate // normale A4
  router.get('/certificateTrue', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/certificateTrue.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });


module.exports = router;
