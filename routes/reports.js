var express = require('express');
var router = express.Router();
var obsMgr = require('../app/obs').obsMgr;
var orgMgr = require('../app/org').orgMgr;
var reportMgr = require('../app/report').reportMgr;
var app = require('express')();
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var nationality = require('../Nationality');

  router.get('/', function(req, res) {

  });

  function drawAllResults(allResults){
    var html = '';
    var gender1;
    var nat;
    // for (i in allResults){
    //   for (var i = 0; i <= nationality.length; i++) {
    //     if( allResults[i].nationality == nationality ){

    //     }
    //   };
      if(allResults[i].gender == 0){
        gender1 = "ذكـر";
      }else{
        gender1 = "أنـثـى";
      }
      html+= '<tr>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].nationality+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].pass_nid+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+gender1+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].id_office+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].registration_no+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_director+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].type+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].address+' </td>\
              </tr>';  
    }
    
return html;
  }

  router.get('/observers', function(req, res, next) {
    reportMgr.getAllObsAndOrg(function(results){
      console.log(results);
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/observers.html"), "utf8"),
          phantom: {
            format: 'A3',
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:drawAllResults.toString()
        },
        data:{allResults:results}
        // data:{:,:,dept:department,dev:devision,sys:system,obj:arabicTranscriptObject,ob:subj,o:array}
      }).then(function (response) {
        response.result.pipe(res);
      });
    }); 
  });

  // this obsByType // widght A4
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

  // this obsByNationality // widght A4
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

  // this noOfLocaleObs // widght A4
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

  // this noOfLocaleObsEn // widght A4
  router.get('/noOfLocaleObsEn', function(req, res, next) {
    reportMgr.getAllObsAndOrg(function(results){
      console.log(results);
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfLocaleObsEn.html"), "utf8"),
          phantom:{
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
        },
        data:results
      }).then(function (response) {
        response.result.pipe(res);
      });
    }); 
  });

    // this noOfInternationalObs // widght A4
  router.get('/noOfInternationalObs', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternational.html"), "utf8"),
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

  // this noOfInternationalObsEn // widght A4
  router.get('/noOfInternationalObsEn', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternationalObsEn.html"), "utf8"),
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


  // this statisticsOfficesByType // widght A4
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

  // this noOfWomenAndMen // normale A4
  router.get('/noOfWomenAndMen', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfWomenAndMen.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      // data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

   // this noOfWomenAndMenEn // normale A4
  router.get('/noOfWomenAndMenEn', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfWomenAndMenEn.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      // data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });


module.exports = router;