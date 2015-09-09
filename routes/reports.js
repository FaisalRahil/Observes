var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
var orgMgr = require('../app/org').orgMgr;
var app = require('express')();
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");

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

  // this sertificate // widght A4
  router.get('/obsByType', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByType.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      // data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this sertificate // widght A4
  router.get('/obsByNationality', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByNationality.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      // data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this sertificate // widght A4
  router.get('/noOfLocaleObs', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfLocaleObs.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      // data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this sertificate // widght A4
  router.get('/statisticsOfficesByType', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/statisticsOfficesByType.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      // data:obj
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
