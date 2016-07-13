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
var json2csv = require('json2csv');

  router.get('/', userHelpers.isRoot,function(req, res) {
    orgMgr.getOrgs(function(Morg){
      orgMgr.getOrgsAdmin(function(Norg){
        res.render('reports/reports',{ title: 'الـتـقـاريـر',nationalities: nationality,offi:office,user:req.session.id_user,Norg:Norg,Morg:Morg});
      });
    });
    
  });
  router.get('/csv',function(req, res, next) {
    reportMgr.getAllObsAndOrg(function(result){
      var object=[]
      var typear = ["مراقب دولي","ضيف","إعلام دولي","مراقب محلي","إعلام محلي","وكيل"];
      var typeen = ["International Observer","Guest","International Media","Domestic Observer","National Media","Candidate Agent"];
      for(i in result){
        var obj={};
        obj.id_ob=result[i].id_ob;
        obj.name=result[i].name;
        obj.national=nationality[result[i].nationality-1].name ;
        obj.pass_nid=result[i].pass_nid;
        if(result[i].id_office<0){
          obj.id_office=office[0].office_name_ar;
        }else{
          obj.id_office=office[result[i].id_office].office_name_ar;
        }
        obj.phone_obs=result[i].phone_obs;
        obj.creation_date=Date(result[i].cd);
        
        obj.director=result[i].director;
        if(result[i].gender==1){
          obj.gender='ذكر';
        }else{
          obj.gender='أنثي';
        }
        obj.name_org=result[i].name_org;
        obj.type_en=typeen[result[i].type-1];
        obj.type_ar=typear[result[i].type-1];
        obj.first_name=' ';
        obj.last_name=' ';
        obj.phone=result[i].phone;
        object.push(obj);
      }
      var fields = ['id_ob','name','national','pass_nid','id_office','phone_obs','creation_date' ,'director','gender','name_org', 'type_en','type_ar','first_name','last_name','id_office','phone',];
      var fieldNames = ['ObserverAutoNo', 'Name', 'Nationality','PassportNo','Address','Tel','DataEntryDate' ,'Representative','Gender','OrgName', 'OrgType','OrgTypeArabic','FirstName','LastName','OfficeName','PhoneNo',];
      json2csv({ data: object, fields: fields, fieldNames : fieldNames }, function(err, csv) {
        if (err) console.log(err);
        res.attachment('data.csv');
        res.send(csv);
      });
    });
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
    var html = ' <div class="col-xs-12">\
        <div class="towSpaces"></div><table class="table condensed">\
            <thead>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب دـولـي International observers</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> ضـيـف Guest</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام دـولـي International media</th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;"><tr>';
    for (var i = 1; i < 4; i++) {
      if(resultt[i] == undefined ){
        html+=' <td style="background-color:#FFFFC2 !important;"> - </td>';
      } else{
        html+=' <td style="background-color:#FFFFC2 !important;"> '+ resultt[i] +' </td>';
      } 
    };
      html+='</tr></tbody></table></div><div class="towSpaces" height="5%"> </div><div class="col-xs-12 col-xs-offset-4">\
          <div class="col-xs-5 text-center">\
            <div class="text-center fontSize"> \
              إحصائـــيـــة الجهات المعتـــمدة المحلية\
            </div>\
          </div>\
        </div><div class="col-xs-12">\
        <div class="towSpaces"></div><table class="table condensed">\
            <thead>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب مـحـلـي Local observers </th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  إعـلام مـحـلـي Local media</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  وكيل agent</th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;"><tr>';
      for (var i = 4; i < 7; i++) {
        if(resultt[i] == undefined ){
          html+=' <td style="background-color:#FFFFC2 !important;"> - </td>';
        } else{
          html+=' <td style="background-color:#FFFFC2 !important;"> '+ resultt[i] +' </td>';
        } 
      };
    html+='</tr></tbody></table></div>';
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
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].registration_no+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_director+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+typeInTD+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_org+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].address+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+nat+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].pass_nid+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+gender1+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone_obs+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+office1+' </td>\
                <td style="background-color:#FFFFC2 !important;"> '+allResults[i].ob_num+' </td>\
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
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب مـحـلـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام مـحـلـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> وكـيـل </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> العـدد الـكـلـي </th>\
        </tr>\
      </thead>\
      <tbody style="border: 1px solid #000;">';
      sumAll=0;
      var sumT=[0,0,0];
      for(i in office){
        sum=0;
        if(i!=0){
         html+='<tr>\
            <td style="background-color:#E7FFE7 !important;"> '+office[i].office_name_ar+' </td>';
            if(obj[office[i].office_id]!=undefined){
              for(k=4;k<7;k++){
                if(obj[office[i].office_id][k]!=undefined){
                  sum+=parseInt(obj[office[i].office_id][k]);
                  sumT[k-4]+=parseInt(obj[office[i].office_id][k]);
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
                <td style="background-color:#F0F0EF !important;"> - </td>\
              </tr>';
            }
          sumAll+=sum; 
        }
             
      }

      html+='</tbody>\
        <tbody >\
          <tr>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumT[0]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumT[1]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumT[2]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumAll+' </td>\
          </tr>\
        </tbody>\
      </table>';
      html+='<table class="table condensed">\
      <thead>\
        <tr style="border-top-style: solid; border-top-width: 1px;" >\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> اسـم الـلـجـنـة </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب دـولـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> ضـيـف </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام دـولـي </th>\
          <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> العـدد الـكـلـي </th>\
        </tr>\
      </thead>\
      <tbody style="border: 1px solid #000;">';
      sum=0;
      html+='<tr><td style="background-color:#E7FFE7 !important;"> '+office[0].office_name_ar+' </td>';
      if(obj[office[0].office_id]!=undefined){
        for(k=1;k<4;k++){
          if(obj[office[0].office_id][k]!=undefined){
            sum+=parseInt(obj[office[0].office_id][k]);
            html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[0].office_id][k]+' </td>';
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
          <td style="background-color:#F0F0EF !important;"> - </td>\
        </tr>';
      }
    sumAll+=sum;
    html+=' </tbody>';
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
  router.get('/observerstype/:type', userHelpers.Login,function(req, res, next) {
    reportMgr.getAllObsAndOrgtype(req.params.type, function(results){
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
      var now = new Date();
      var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/noOfInternationalObs.html"), "utf8"),
          phantom:{
          },
          recipe: "phantom-pdf",
          helpers:resultsNoOfInternationalObs.toString()
        },
        data:{resultt:obj,date:nowdate}
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });

  // this obsByNationality // widght A4
  router.get('/obsByNationality/:nat',userHelpers.isRoot, function(req, res, next) {
    reportMgr.obsByNationality(req.params.nat,function(results){
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
      if(results.length>0){
        var now = new Date();
        var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
        jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByType.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers:obsBytype.toString()
          },
          data:{allResults:results,date:nowdate}
        }).then(function (response) {
          response.result.pipe(res);
        });
      }else{
        res.redirect('/reports?msg=1');
      }
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
      var now = new Date();
      var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/statisticsOfficesByType.html"), "utf8"),

          recipe: "phantom-pdf",
          helpers:statisticsOfficesByType.toString()
        },
        data:{offic:office,result:obj,date:nowdate}
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


  router.get('/statisticsOfficesByTypeGender', userHelpers.isRoot,function(req, res, next) {
    reportMgr.statisticsOfficesByTypeGender(function(result){
      obj={};
      for( k in result){
        if(obj[result[k].id_office]==undefined){
          obj[result[k].id_office]=[];
        }
        if(obj[result[k].id_office][result[k].type]==undefined){
          obj[result[k].id_office][result[k].type]=[];
          // obj[result[k].id_office][result[k].type].push(result[k].num);
        }
        if(obj[result[k].id_office][result[k].type][result[k].gender]==undefined){
          obj[result[k].id_office][result[k].type][result[k].gender]=[];
          obj[result[k].id_office][result[k].type][result[k].gender].push(result[k].num);
        }
      }
      var now = new Date();
      var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/statisticsOfficesByTypeGender.html"), "utf8"),
          recipe: "phantom-pdf",
          
          helpers:statisticsOfficesByTypeGender.toString()
        },
        engine: "jsrender",
        data:{office:office,obj:obj,date:nowdate}
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
    var type1 = ["منظمة عالمية","الهيئات الدبلوماسية","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];

    for (var k = 0; k <= type1.length; k++) {
      if(allResults[k].type-1 == k ){
        typeInTD = type1[k];
        break;
      }
    }
    html+= '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> '+typeInTD+' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم الـمـنـظـمـة </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسم المدير  </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الهاتف </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> البريد الالكتروني </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> عـدد الـمـراقـبـيـن </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
     j=0;
     for (var i in allResults){
      j++;
        html+= '<tr>\
          </tr>\
          <td>'+j+'</td>'+
          '<td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td> \
          <td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_director+' </td> \
          <td style="background-color:#FFFFC2 !important;"> '+allResults[i].phone+' </td> \
          <td style="background-color:#FFFFC2 !important;"> '+allResults[i].email+' </td> \
            <td style="background-color:#FFFFC2 !important;"> '+allResults[i].ObsCount+' </td>';

     }
    return html;
  }

function statisticsOfficesByTypeGender(obj,office){
  var sumAll=0;
  var sumAllM=0;
  var sumAllF=0;

  var sumgF=[0,0,0];
  var sumgM=[0,0,0];
  var html='';
  for(i in office){
    if(i!=0){
      var sum = 0;
      var sumM=0;
      var sumF=0;
      html+='<tr><td colspan="2" style="height:1px; background-color:#FFFFC2 !important;"> '+office[i].office_name_ar+' </td>';
      if(obj[office[i].office_id]!=undefined){
        for(k=4;k<7;k++){
          if(obj[office[i].office_id][k]!=undefined||obj[office[i].office_id][k]!=null){
            
            if(obj[office[i].office_id][k][1]!=null){
              sum+=parseInt(obj[office[i].office_id][k][1]);
              sumM+=parseInt(obj[office[i].office_id][k][1]);
              sumgM[k-4]+=parseInt(obj[office[i].office_id][k][1]);
              html+='<td style="height:1px;background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][1]+' </td>'; 
            }else{
              html+='<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>';
            }
            if(obj[office[i].office_id][k][0]!=null){
              sum+=parseInt(obj[office[i].office_id][k][0]);
              sumF+=parseInt(obj[office[i].office_id][k][0]);
              sumgF[k-4]+=parseInt(obj[office[i].office_id][k][0]);
              html+='<td style="height:1px;background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][0]+' </td>'; 
            }else{
              html+='<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>';
            }  
          }else{
            html+='<td style="height:1px;background-color:#FFFFC2 !important;"> - </td><td style="background-color:#FFFFC2 !important;"> - </td>';
          }
        }
        html+='<td style="height:1px;background-color:#F0F0EF !important;"> '+sumM+' </td><td style="height:1px;background-color:#F0F0EF !important;"> '+sumF+' </td><td style="height:1px;background-color:#F0F0EF !important;"> '+sum+' </td>';  
      }else{
        html+='<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>';
      }
      html+='</tr>';
     
      sumAll+=sum;
      sumAllF+=sumF;
      sumAllM+=sumM;
    }
    
    
  }
   html+='</tbody ><tbody >\
          <tr>\
            <td colspan="2" style="background-color:#F0F0EF !important;border: 1px solid;">  </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgM[0]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgF[0]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgM[1]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgF[1]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgM[2]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumgF[2]+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumAllM+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumAllF+' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> '+sumAll+' </td>\
          </tr>\
        </tbody></table>';


        html+='<table class="table condensed"><thead>';
        html+='<tr height="1%" style="border-top-style: solid; border-top-width: 1px;" >\
              <th height="1%" colspan="2" class="text-center" width="3%" style="background-color:#B2E6FF !important;"> اسـم الـلـجـنـة </th>\
              <th height="1%" colspan="2" class="text-center" width="3%" style="background-color:#B2E6FF !important;"> مـراقـب دـولـي </th>\
              <th height="1%" colspan="2" class="text-center" width="3%" style="background-color:#B2E6FF !important;"> إعـلام دـولـي </th>\
              <th height="1%" colspan="2" class="text-center" width="3%" style="background-color:#B2E6FF !important;"> ضـيـف </th>\
              <th height="1%" colspan="3" class="text-center" width="3%" style="background-color:#B2E6FF !important;"> العـدد الـكـلـي </th>\
            </tr>\
              <tr height="1%" style="border-top-style: solid; border-top-width: 1px;" >\
              <th height="1%" colspan="2" class="text-center" width="1%" style="background-color:#B2E6FF !important;"></th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> ذكر</th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> أنثى </th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> ذكر</th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> أنثى </th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> ذكر</th>\
              <th  height="1%" class="text-center" width="1%" style="background-color:#B2E6FF !important;"> أنثى </th>\
              <th height="1%"  class="text-center" width="1%" style="background-color:#B2E6FF !important;">ذكر</th>\
              <th height="1%"  class="text-center" width="1%" style="background-color:#B2E6FF !important;">أنثى</th>\
              <th height="1%"  class="text-center" width="1%" style="background-color:#B2E6FF !important;">المجموع</th>\
            </tr>\
          </thead>\
      <tbody style="border: 1px solid #000;" >';
      sum=0;
      sumM=0;
      sumF=0;
      html+='<tr><td colspan="2" style="background-color:#FFFFC2 !important;"> '+office[0].office_name_ar+' </td>';
        i=0;
        if(obj[office[i].office_id]!=undefined){
        for(k=1;k<4;k++){
          if(obj[office[i].office_id][k]!=undefined||obj[office[i].office_id][k]!=null){
            
            if(obj[office[i].office_id][k][1]!=null){
              sum+=parseInt(obj[office[i].office_id][k][1]);
              sumM+=parseInt(obj[office[i].office_id][k][1]);
              html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][1]+' </td>'; 
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> - </td>';
            }
            if(obj[office[i].office_id][k][0]!=null){
              sum+=parseInt(obj[office[i].office_id][k][0]);
              sumF+=parseInt(obj[office[i].office_id][k][0]);
              html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][0]+' </td>'; 
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> - </td>';
            }  
          }else{
            html+='<td style="background-color:#FFFFC2 !important;"> - </td><td style="background-color:#FFFFC2 !important;"> - </td>';
          }
        }
        html+='<td style="background-color:#F0F0EF !important;"> '+sumM+' </td><td style="background-color:#F0F0EF !important;"> '+sumF+' </td><td style="background-color:#F0F0EF !important;"> '+sum+' </td></tr>';  
      }else{
        html+='<td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#F0F0EF !important;"> - </td><td style="background-color:#F0F0EF !important;"> - </td><td style="background-color:#F0F0EF !important;"> - </td></tr>';
      }
      html+='</tbody></table>';
  return html;
}
  router.get('/orgObs/:id',userHelpers.isRoot,function(req, res, next) {
    obsMgr.getOrgObs(req.params.id,function(results){
      if(results.length>0){
        var now = new Date();
        var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
        jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/reports/orgObs.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers:orgObs.toString()
          },
          data:{allResults:results,date:nowdate,office:office}
        }).then(function (response) {
          response.result.pipe(res);
        });
      }else{
        res.redirect('/reports?msg=1');
      }
    });
  });
  function orgObs(data,offic){
    var html = '';
    html+= '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> بيانات المعتمدين في '+data[0].name_org+' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم الـمـراقـب </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الهاتف </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> البريد الالكتروني </th>';
                if(data[0].type>3){
                  html+='<th class="text-center"  style="background-color:#B2E6FF !important;"> الـلـجـنـة </th>';    
                }
                
                
                html+='<th class="text-center"  style="background-color:#B2E6FF !important;"> رقم البطاقة  </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
     j=0;
     for (var i in data){
      j++;
        html+= '<tr>\
          </tr>\
          <td>'+j+'</td>'+
          '<td style="background-color:#FFFFC2 !important;"> '+data[i].name+' </td> \
          <td style="background-color:#FFFFC2 !important;"> '+data[i].phone_obs+' </td> \
          <td style="background-color:#FFFFC2 !important;"> '+data[i].email_obs+' </td> ';
          if(data[0].type>3){
            if(data[i].office_obs<0){
            html+='<td style="background-color:#FFFFC2 !important;"> '+offic[0].office_name_ar+'<br>'+offic[0].office_name+' </td> ';  
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> '+offic[data[i].office_obs].office_name_ar+' </td> ';  
            }
          }
          html+='<td style="background-color:#FFFFC2 !important;"> - </td>';

     }
    return html;
  }
  router.get('/obsByTypezip/:type',userHelpers.isRoot,function(req, res, next) {
    reportMgr.obsBytype(req.params.type,function(results){
      console.log(results);
      if(results.length>0){
        var now = new Date();
        var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
        jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/reports/obsByTypezip.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers:obsBytypezip.toString()
          },
          data:{allResults:results,date:nowdate,offic:office}
        }).then(function (response) {
          response.result.pipe(res);
        });
      }else{
        res.redirect('/reports?msg=1');
      }
    });
  });
  function obsBytypezip(allResults,offic){
    var html = '';
    var type1 = ["منظمة عالمية","الهيئات الدبلوماسية","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];

    for (var k = 0; k <= type1.length; k++) {
      if(allResults[k].type-1 == k ){
        typeInTD = type1[k];
        break;
      }
    }
    html+= '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> '+typeInTD+' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم الـمـنـظـمـة </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> عـدد الـمـراقـبـيـن </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
     j=0;
     for (var i in allResults){
      j++;
        html+= '<tr>\
          </tr>\
          <td>'+j+'</td>'+
          '<td style="background-color:#FFFFC2 !important;"> '+allResults[i].name_org+' </td> \
            <td style="background-color:#FFFFC2 !important;"> '+allResults[i].ObsCount+' </td>';
            // if(allResults[i].id_office<0){
            // html+='<td style="background-color:#FFFFC2 !important;"> '+offic[0].office_name_ar+' </td> ';  
            // }else{
            //   html+='<td style="background-color:#FFFFC2 !important;"> '+offic[allResults[i].id_office].office_name_ar+' </td> ';  
            // }

     }
    return html;
  }
  router.get('/orgObszip/:id',userHelpers.isRoot,function(req, res, next) {
    reportMgr.getOrgObszip(req.params.id,function(results){
      if(results.length>0){
        var now = new Date();
        var nowdate =now.getDate()+' / '+parseFloat(now.getMonth()+1)+' / '+now.getFullYear();
        jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/reports/orgObszip.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers:orgObszip.toString()
          },
          data:{allResults:results,date:nowdate,office:office}
        }).then(function (response) {
          response.result.pipe(res);
        });
      }else{
        res.redirect('/reports?msg=1');
      }
    });
  });
  
  router.get('/test',function(req, res, next) {
    reportMgr.noOfWomenAndMen(function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/test.html"), "utf8"),
          phantom: {
            // width: "6047.244095",
            // height: "9070.866142",
            format: 'A4',
          },
          recipe: "phantom-pdf"
          // helpers:noOfWomenAndMen.toString()
        },
          data:{allResults:results}
        // data:obj
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });  


  router.get('/svg',function(req, res, next) {
    reportMgr.noOfWomenAndMen(function(results){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/svg.html"), "utf8"),
          phantom: {
            format: 'A4',
          },
          recipe: "phantom-pdf"
          // helpers:noOfWomenAndMen.toString()
        },
          data:{allResults:results}
        // data:obj
      }).then(function (response) {
        response.result.pipe(res);
      });
    });
  });
  function orgObszip(data,offic){
    var html = '';
    html= '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> بيانات المعتمدين في '+data[0].name_org+' </th>';
       html+=' </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الـلـجـنـة </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> العـدد </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
     j=0;
     for (var i in data){
      j++;
        html+= '<tr>\
          </tr>\
          <td>'+j+'</td>';
          if(data[i].id_office<0){
            html+='<td style="background-color:#FFFFC2 !important;"> '+offic[0].office_name_ar+' </td> ';  
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> '+offic[data[i].id_office].office_name_ar+' </td> ';  
            }
          html+='<td style="background-color:#FFFFC2 !important;"> '+data[i].num+' </td> ';
          

     }
    return html;
  }
  router.post('/printloc',userHelpers.Login, function(req, res) {
    obsMgr.getprint(req.body.id_print,function(result){
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/reports/test.html"), "utf8"),
          phantom: {
            // width: "6047.244095",
            // height: "9070.866142",
            format: 'A4',
          },
          recipe: "phantom-pdf",
          helpers:printloc.toString()
        },
          data:{allResults:result}
        // data:obj
      }).then(function (response) {
        response.result.pipe(res);
      });   
    });
  });
  function printloc(result){
    var typear = ["مراقب دولي","ضيف","إعلام دولي","مراقب محلي","إعلام محلي","وكيل"];
    var html='';
    if(result[0]!=undefined && result[1]!=undefined){
      html+='<span class="vertical-text" style="padding-right:200px;padding-top:125px; !important">'+
        result[0].ob_num+
      '</span>\
      <div class="col-xs-7">\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 245px; !important;">\
            <p class="text-center"><span>'+typear[result[0].type-1]+'</span></p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
            <p class="text-center"><span>'+result[0].name+'</span></p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12   "style="padding-top: 25px; !important;">\
            <p class="text-center"><span>'+result[0].name_org+'</span></p>\
          </div>\
        </div>\
      </div>\
      <span class="vertical-text" style="padding-left:190px;padding-bottom:530px; !important">'+
      result[1].ob_num+
      '</span>\
      <div class="col-xs-3">\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 245px; !important;">\
            <p class="text-center">'+typear[result[1].type-1]+'</p>\
          </div>\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
            <p class="text-center">'+result[1].name+'</p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12   "style="padding-top: 35px; !important;">\
            <p class="text-center">'+result[1].name_org+'</p>\
          </div>\
        </div>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col-xs-6"></div>\
    </div>';
    }
    if(result[2]!=undefined && result[3]!=undefined){
      
    html+='<div class="row">\
      <span class="vertical-text" style="padding-right:220px;padding-top:110px; !important">'+
      result[2].ob_num+
      '</span>\
      <div class="col-xs-7">\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
            <p class="text-center">'+typear[result[2].type-1]+'</p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
            <p class="text-center">'+result[2].name+'</p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12   "style="padding-top: 25px; !important;">\
            <p class="text-center">'+result[2].name_org+'</p>\
          </div>\
        </div>\
      </div>\
      <span class="vertical-text" style="padding-left:220px;padding-bottom: 540px; !important">'+
      result[3].ob_num+
      '</span>\
      <div class="col-xs-3">\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
            <p class="text-center">'+typear[result[3].type-1]+'</p>\
          </div>\
        <div class="row">\
          <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
            <p class="text-center">'+result[3].name+'</p>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-xs-12   "style="padding-top: 35px; !important;">\
            <p class="text-center">'+result[3].name_org+'</p>\
          </div>\
        </div>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col-xs-6"></div>\
      <div class="col-xs-6"></div>\
    </div>';
  }
      return html;
  }
module.exports = router;