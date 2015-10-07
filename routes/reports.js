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
var office = require('../office');


  // router.get('/obs/locOrg', function(req, res) {
  //   orgMgr.getOrg(4,function(result){
  //     res.render('manager/locOrgObs',{ title: 'مراقب محلي',orgs:result }); 
  //   }) 
  // });
  router.get('/', function(req, res) {
    res.render('reports/reports',{ title: 'الـتـقـاريـر'}); 
  });

  // drawAllResultsNoOfLocaleObs
  function drawAllResultsNoOfLocaleObs(allResults,officePar){
    var html = '';
    // var typeInTD = '';
    // var office1 = '';
    // var sumOfLocOrg = 0;
    // var sumOfLocMedia = 0;
    // var sumOfAgent = 0;
    
    var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];
    console.log(allResults);
    for (i in allResults){
      // if(allResults[i].type == 4){
      //   sumOfLocOrg += 1;
      // }
      // if(allResults[i].type == 5){
      //   sumOfLocMedia += 1;
      // }
      // if(allResults[i].type == 6){
      //   sumOfAgent += 1;
      // }
      // for (var l = 0; l < officePar.length; l++) {
      //   if( allResults[i].id_office == officePar[l].idoffice ){
      //     office1 = officePar[l].office_name_ar;
      //     break;
      //   }
      // }
      // for (var k = 0; k <= type1.length; k++) {
      //   if(allResults[k].type-1 == k ){
      //     typeInTD = type1[k];
      //     break;
      //   }
      // }
      html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+allResults[i].id_office+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+sumOfLocOrg+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+sumOfLocMedia+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+sumOfAgent+' </td>\
              </tr>';
            }
    return html;
  }
  function drawAllResults(allResults,national,officePar){
    var html = '';
    var gender1;
    var nat = '';
    var typeInTD = '';
    var office1 = '';
    var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];
    for (i in allResults){
      for (var l = 0; l < officePar.length; l++) {
        if( allResults[i].id_office == officePar[l].idoffice ){
          office1 = officePar[l].office_name_ar;
          break;
        }
      }
      for (var k = 0; k <= type1.length; k++) {
        if(allResults[k].type-1 == k ){
          typeInTD = type1[k];
          break;
        }
      }
      for (var j = 0; j < national.length; j++) {
        if( allResults[i].nationality == national[j].id ){
          nat = national[j].name;
          break;
        }
      }
      if(allResults[i].gender == 0){
        gender1 = "ذكـر";
      }else{
        gender1 = "أنـثـى";
      }
      html+= '<tr>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+nat+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].pass_nid+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+gender1+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+office1+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].registration_no+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_director+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+typeInTD+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].address+' </td>\
              </tr>';
            }
    return html;
  }

  router.get('/observers', function(req, res, next) {
    reportMgr.getAllObsAndOrg(function(results){
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
        data:{allResults:results,national:nationality,officePar:office}
      }).then(function (response) {
        response.result.pipe(res);
      });
    }); 
  });
  // this noOfLocaleObs // widght A4
  router.get('/noOfLocaleObs', function(req, res, next) {
    reportMgr.getAllNoOfLocaleObs(function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfLocaleObs.html"), "utf8"),
          phantom:{
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:drawAllResultsNoOfLocaleObs.toString()
        },
        data:{allResults:results,officePar:office}
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
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternationalObs.html"), "utf8"),
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
