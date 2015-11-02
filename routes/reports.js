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
var type = require('../type');
var userHelpers = require('../app/userHelpers');

  router.get('/', userHelpers.isRoot,function(req, res) {
    res.render('reports/reports',{ title: 'الـتـقـاريـر',nationalities: nationality});
  });

  // ////////////////////////////////////////////////////////////////////////
  function resultsNoOfLocaleObs(office,arr1,arr2,arr3,arr4,arr5,arr6,officePar){
    var html = '';
    var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];
      for(i in arr1){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr1[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 1 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr1[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
      for(i in arr2){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr2[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 2 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr2[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
      for(i in arr3){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr3[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 3 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr3[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
      for(i in arr4){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr4[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 4 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr4[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
      for(i in arr5){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr5[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 5 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr5[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
      for(i in arr6){
        html+='<tr>\
                <td style="background-color:#E7FFE7 !important;"> '+office[arr6[i].id_office].office_name_ar+' </td>\
                <td style="background-color:#FFFFC2 !important;"> 6 </td>\
                <td style="background-color:#FFFFC2 !important;"> '+arr6[i].number+' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
      }
    return html;
  }
  // ////////////////////////////////////////////////////////////////////////

  // ////////////////////////////////////////////////////////////////////////
  function resultsNoOfInternationalObs(resultt){
    var html = '<tr>';
    for (var i = 1; i < 4; i++) {
      if(resultt[i] == undefined ){
        html+=' <td style="background-color:#FFFFC2 !important;"> - </td>';
      } else{
        html+=' <td style="background-color:#FFFFC2 !important;"> '+ resultt[i] +' </td>';
      } 
    };
      html+='</tr>';
    return html;
  }
  // ////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  function drawAllResults(allResults,national,officePar,typeOfOrg){
    var html = '';
    var gender1;
    var nat = '';
    var typeInTD = '';
    var office1 = '';
    for (i in allResults){
      for (var l = 0; l < officePar.length; l++) {
        if( allResults[i].id_office == officePar[l].idoffice ){
          office1 = officePar[l].office_name_ar;
          break;
        }
      }
      for (var k = 0; k < typeOfOrg.length; k++) {
        if(allResults[i].type == typeOfOrg[k].type_id ){
          typeInTD = typeOfOrg[k].type_name;
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
        gender1 = "أنـثـى";
      }else{
        gender1 = "ذكـر";
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
  /////////////////////////////////////////////////////////////////////////////
  function statisticsOfficesByType(office,obj){
    // html='';
    html='<table class="table condensed">\
      <thead>\
        <tr style="border-top-style: solid; border-top-width: 1px;" >\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> اسـم الـلـجـنـة </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب دـولـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> ضـيـف </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام دـولـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب مـحـلـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام مـحـلـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> وكـيـل </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> العـدد الـكـلـي </th>\
        </tr>\
      </thead>\
      <tbody style="border: 1px solid #000;">';
      sumAll=0;
      for(i in office){
        sum=0;
         html+='<tr>\
            <td style="background-color:#E7FFE7 !important;"> '+office[i].office_name_ar+' </td>';
            if(obj[office[i].office_id]!=undefined){
              for(k=1;k<7;k++){
                if(obj[office[i].office_id][k]!=undefined){
                  sum+=parseInt(obj[office[i].office_id][k]);
                  html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k]+' </td>';
                }else{
                  html+='<td style="background-color:#FFFFC2 !important;"> - </td>';
                }
              }
              html+='<td style="background-color:#F0F0EF !important;"> '+sum+' </td>\
              </tr>';
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#F0F0EF !important;"> - </td>\
              </tr>';
            }
        sumAll+=sum;    
      }

      html+='</tbody>\
        <tbody style="direction: ltr;">\
          <tr>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumAll+' </td>\
          </tr>\
        </tbody>\
      </table>';
    return html;
  }
  ////////////////////////////////////////////////////////////////////////////  

  router.get('/observers', userHelpers.isRoot,function(req, res, next) {
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
        data:{allResults:results,national:nationality,officePar:office,typeOfOrg:type}
      }).then(function (response) {
        response.result.pipe(res);
      });
    }); 
  });
  // this noOfLocaleObs // widght A4
  router.get('/noOfLocaleObs',userHelpers.isRoot, function(req, res, next) {
    reportMgr.getAllNoOfLocaleObs(function(arr1,arr2,arr3,arr4,arr5,arr6){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfLocaleObs.html"), "utf8"),
          phantom:{
            orientation: "landscape"
          },
          recipe: "phantom-pdf",
          helpers:resultsNoOfLocaleObs.toString()
        },
        data:{office:office,arr1:arr1,arr2:arr2,arr3:arr3,arr4:arr4,arr5:arr5,arr6:arr6,officePar:office}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this noOfInternationalObs // widght A4
  router.get('/noOfInternationalObs', userHelpers.isRoot,function(req, res, next) {
    reportMgr.appNoOfInternationalObs(function(result){
      obj={};
      for( k in result){
        if(obj[result[k].type]==undefined){
          obj[result[k].type]=[];
          obj[result[k].type].push(result[k].num);
        }
      }
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternationalObs.html"), "utf8"),
          phantom:{
            orientation: "landscape"
          },
          recipe: "phantom-pdf",
          helpers:resultsNoOfInternationalObs.toString()
        },
        data:{resultt:obj}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this obsByNationality // widght A4
  router.get('/obsByNationality/:nat',userHelpers.isRoot, function(req, res, next) {
    reportMgr.obsByNationality(req.params.nat,function(results){
      console.log(results);
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByNationality.html"), "utf8"),
          phantom:{
            format: 'A4',
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:obsByNat.toString()
        },
        data:{allResults:results , national:nationality}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this noOfInternationalObsEn // widght A4
  router.get('/noOfInternationalObsEn',userHelpers.isRoot, function(req, res, next) {
    jsr.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternationalObsEn.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
      },
      data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this obsByType // widght A4
  router.get('/obsByType/:type',userHelpers.isRoot,function(req, res, next) {
    reportMgr.obsBytype(req.params.type,function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByType.html"), "utf8"),
          phantom:{
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:obsBytype.toString()
        },
        data:{allResults:results}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this noOfLocaleObsEn // widght A4
  router.get('/noOfLocaleObsEn', userHelpers.isRoot,function(req, res, next) {
    reportMgr.getAllObsAndOrg(function(results){
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

  // this statisticsOfficesByType // widght A4
  router.get('/statisticsOfficesByType', userHelpers.isRoot,function(req, res, next) {
    reportMgr.statisticsOfficesByType(function(result){
      obj={};
      for( k in result){
        if(obj[result[k].id_office]==undefined){
          obj[result[k].id_office]=[];
        }
        if(obj[result[k].id_office][result[k].type]==undefined){
          obj[result[k].id_office][result[k].type]=[];
          obj[result[k].id_office][result[k].type].push(result[k].num);
        }
      }
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/statisticsOfficesByType.html"), "utf8"),

          recipe: "phantom-pdf",
          helpers:statisticsOfficesByType.toString()
        },
        data:{offic:office,result:obj}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this noOfWomenAndMen // normale A4
  router.get('/noOfWomenAndMen', userHelpers.isRoot,function(req, res, next) {
    reportMgr.noOfWomenAndMen(function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfWomenAndMen.html"), "utf8"),
          phantom: {
            format: 'A4',
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:noOfWomenAndMen.toString()
        },
          data:{allResults:results}
        // data:obj
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });
  // this noOfWomenAndMen // normale A4
  router.get('/noOfWomenAndMenEn', userHelpers.isRoot,function(req, res, next) {
    reportMgr.noOfWomenAndMen(function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfWomenAndMenEn.html"), "utf8"),
          phantom: {
            format: 'A4',
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers:noOfWomenAndMen.toString()
        },
          data:{allResults:results}
        // data:obj
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });
  //draw observers counts by gender  /noOfWomenAndMen
  function noOfWomenAndMen(allResults){
    var html = '';
      html+= '<tr>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[0][0].man+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[1][0].woman+' </td>\
              </tr>';
    return html;
  }
  
  //draw observers counts by gender  /noOfWomenAndMen
  function obsByNat(allResults,national){
    var html = '';
    var nat;
    var typeInTD = '';
    var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];
    
    for (var j = 0; j < national.length; j++) {
      if( allResults[0].nationality == national[j].id ){
        nat = national[j].name;
        break;
      }
    }
    
    html+= '<tr style="border-top-style: solid; border-top-width: 1px;" >\
              <th colspan="2" class="text-center" style="background-color:#B2E6FF !important;">  '+nat+'  </th>\
            </tr>\
            <tr style="border-top-style: solid; border-top-width: 1px;" >\
              <th class="text-center" style="background-color:#B2E6FF !important;"> اسـم الـمـراقـب </th>\
              <th class="text-center"  style="background-color:#B2E6FF !important;"> نـوع الـمـنـظـمـة </th>\
            </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
    
    for (i in allResults){
      for (var k = 0; k <= type1.length; k++) {
        if(allResults[k].type-1 == k ){
          typeInTD = type1[k];
          break;
        }
      }
      html+= '<tr>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+typeInTD+' </td>\
              </tr>';
    }
    
    return html;
  }  

  //by type
  function obsBytype(allResults){
    var html = '';
    var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];

    for (var k = 0; k <= type1.length; k++) {
      if(allResults[k].type-1 == k ){
        typeInTD = type1[k];
        break;
      }
    }
    html+= '<th colspan="2" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> '+typeInTD+' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="13%" style="background-color:#B2E6FF !important;"> اسـم الـمـنـظـمـة </th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> عـدد الـمـراقـبـيـن </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
     for (var i in allResults){
        html+= '<tr>\
          </tr>\
          <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td> \
            <td style="background-color:#FFFFC2 !important;"> '+allResults[i].ObsCount+' </td>';

     }
    return html;
  }

module.exports = router;