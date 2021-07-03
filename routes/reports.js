var express = require("express");
var router = express.Router();
var obsMgr = require("../app/obs").obsMgr;
var orgMgr = require("../app/org").orgMgr;
var reportMgr = require("../app/report").reportMgr;
var app = require("express")();
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var nationality = require("../Nationality");
var office = require("../office");
var type = require("../type");
var userHelpers = require("../app/userHelpers");
var json2csv = require("json2csv");
var pdf = require("pdf-creator-node");
const Handlebars = require("handlebars");

router.get("/", userHelpers.isRoot, function (req, res) {
  orgMgr.getOrgs(function (Morg) {
    orgMgr.getOrgsAdmin(function (Norg) {
      res.render("reports/reports", {
        title: "الـتـقـاريـر",
        nationalities: nationality,
        offi: office,
        user: req.session.id_user,
        Norg: Norg,
        Morg: Morg,
      });
    });
  });
});
router.get("/csv", function (req, res, next) {
  reportMgr.getAllObsAndOrg(function (result) {
    var object = [];
    var typear = [
      "وكيل",
      "مراقب محلي",
      "إعلام محلي",
      "مراقب دولي",
      "إعلام دولي",
      "ضيف",
    ];
    var typeen = [
      "Candidate Agent",
      "Domestic Observer",
      "National Media",
      "International Observer",
      "International Media",
      "Guest",
    ];
    for (i in result) {
      var obj = {};
      obj.id_ob = result[i].id_ob;
      obj.name = result[i].name;
      obj.national = nationality[result[i].nationality - 1].name;
      obj.pass_nid = result[i].pass_nid;
      if (result[i].id_office < 0) {
        obj.id_office = office[0].office_name_ar;
      } else {
        obj.id_office = office[result[i].id_office].office_name_ar;
      }
      obj.phone_obs = result[i].phone_obs;
      obj.creation_date = Date(result[i].cd);

      obj.director = result[i].director;
      if (result[i].gender == 1) {
        obj.gender = "ذكر";
      } else {
        obj.gender = "أنثي";
      }
      obj.name_org = result[i].name_org;
      obj.type_en = typeen[result[i].type - 1];
      obj.type_ar = typear[result[i].type - 1];
      obj.first_name = " ";
      obj.last_name = " ";
      obj.phone = result[i].phone;
      object.push(obj);
    }
    var fields = [
      "id_ob",
      "name",
      "national",
      "pass_nid",
      "id_office",
      "phone_obs",
      "creation_date",
      "director",
      "gender",
      "name_org",
      "type_en",
      "type_ar",
      "first_name",
      "last_name",
      "id_office",
      "phone",
    ];
    var fieldNames = [
      "ObserverAutoNo",
      "Name",
      "Nationality",
      "PassportNo",
      "Address",
      "Tel",
      "DataEntryDate",
      "Representative",
      "Gender",
      "OrgName",
      "OrgType",
      "OrgTypeArabic",
      "FirstName",
      "LastName",
      "OfficeName",
      "PhoneNo",
    ];
    json2csv(
      { data: object, fields: fields, fieldNames: fieldNames },
      function (err, csv) {
        res.attachment("data.csv");
        res.send(csv);
      }
    );
  });
});
// ////////////////////////////////////////////////////////////////////////
Handlebars.registerHelper(
  "resultsNoOfLocaleObs",
  function (office, arr1, arr2, arr3, arr4, arr5, arr6, officePar) {
    var html = "";
    var type1 = [
      "وكيل",
      "منظمة محلية",
      "إعلامي محلي",
      "منظمة عالمية",
      "إعلامي دولي",
      "الهيئات الدبلوماسية",
    ];
    console.log(office);

    for (i in arr1) {
      var na = arr1[i].id_office > 0 ? arr1[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[na].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 1 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr1[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    for (i in arr2) {
      var n2 = arr2[i].id_office > 0 ? arr2[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[n2].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 2 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr2[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    for (i in arr3) {
      var n3 = arr3[i].id_office > 0 ? arr3[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[n3].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 3 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr3[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    for (i in arr4) {
      var n4 = arr4[i].id_office > 0 ? arr4[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[n4].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 4 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr4[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    for (i in arr5) {
      var n5 = arr5[i].id_office > 0 ? arr5[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[n5].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 5 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr5[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    for (i in arr6) {
      var n6 = arr6[i].id_office > 0 ? arr6[i].id_office : 0;

      html +=
        '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
        office[n6].office_name_ar +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 6 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        arr6[i].number +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
    }
    return new Handlebars.SafeString(html);
  }
);
// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
Handlebars.registerHelper("resultsNoOfInternationalObs", function (resultt) {
  var html =
    ' <div class="col-xs-12">\
        <div class="towSpaces"></div><table class="table condensed">\
            <thead>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب دـولـي International observers</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> إعـلام دـولـي International media</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> ضـيـف Guest</th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;"><tr>';
  for (var i = 4; i < 7; i++) {
    if (resultt[i] == undefined) {
      html += ' <td style="background-color:#FFFFC2 !important;"> - </td>';
    } else {
      html +=
        ' <td style="background-color:#FFFFC2 !important;"> ' +
        resultt[i] +
        " </td>";
    }
  }
  html +=
    '</tr></tbody></table></div><div class="towSpaces" height="5%"> </div><div class="col-xs-12 col-xs-offset-4">\
          <div class="col-xs-5 text-center">\
            <div class="text-center fontSize"> \
              إحصائـــيـــة الجهات المعتـــمدة المحلية\
            </div>\
          </div>\
        </div><div class="col-xs-12">\
        <div class="towSpaces"></div><table class="table condensed">\
            <thead>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  وكيل agent</th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب مـحـلـي Local observers </th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  إعـلام مـحـلـي Local media</th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;"><tr>';
  for (var i = 1; i < 4; i++) {
    if (resultt[i] == undefined) {
      html += ' <td style="background-color:#FFFFC2 !important;"> - </td>';
    } else {
      html +=
        ' <td style="background-color:#FFFFC2 !important;"> ' +
        resultt[i] +
        " </td>";
    }
  }
  html += "</tr></tbody></table></div>";
  return new Handlebars.SafeString(html);
});
// ////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// function drawAllResults(allResults, national, officePar, typeOfOrg) {
//   var html = "";
//   var gender1;
//   var nat = "";
//   var typeInTD = "";
//   var office1 = "";
//   for (i in allResults) {
//     for (var l = 0; l < officePar.length; l++) {
//       if (allResults[i].id_office == officePar[l].idoffice) {
//         office1 = officePar[l].office_name_ar;
//         break;
//       }
//     }
//     for (var k = 0; k < typeOfOrg.length; k++) {
//       if (allResults[i].type == typeOfOrg[k].type_id) {
//         typeInTD = typeOfOrg[k].type_name;
//         break;
//       }
//     }
//     for (var j = 0; j < national.length; j++) {
//       if (allResults[i].nationality == national[j].id) {
//         nat = national[j].name;
//         break;
//       }
//     }
//     if (allResults[i].gender == 0) {
//       gender1 = "أنـثـى";
//     } else {
//       gender1 = "ذكـر";
//     }
//     html +=
//       '<tr>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].name_org +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].registration_no +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].name_director +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       typeInTD +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].phone +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].email_org +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].address +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].name +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       nat +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].pass_nid +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       gender1 +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].email_obs +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].phone_obs +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       office1 +
//       ' </td>\
//                 <td style="background-color:#FFFFC2 !important;"> ' +
//       allResults[i].ob_num +
//       " </td>\
//               </tr>";
//   }
//   return html;
// }
/////////////////////////////////////////////////////////////////////////////
Handlebars.registerHelper("statisticsOfficesByType", function (office, obj) {
  // html='';
  html =
    '<table class="table condensed">\
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
  sumAll = 0;
  var sumT = [0, 0, 0];
  for (i in office) {
    sum = 0;
    if (i != 0) {
      html +=
        '<tr>\
            <td style="background-color:#E7FFE7 !important;"> ' +
        office[i].office_name_ar +
        " </td>";
      if (obj[office[i].office_id] != undefined) {
        for (k = 1; k < 4; k++) {
          if (obj[office[i].office_id][k] != undefined) {
            sum += parseInt(obj[office[i].office_id][k]);
            sumT[k - 1] += parseInt(obj[office[i].office_id][k]);
            html +=
              '<td style="background-color:#FFFFC2 !important;"> ' +
              obj[office[i].office_id][k] +
              " </td>";
          } else {
            html += '<td style="background-color:#FFFFC2 !important;"> - </td>';
          }
        }
        html +=
          '<td style="background-color:#F0F0EF !important;"> ' +
          sum +
          " </td>\
              </tr>";
      } else {
        html +=
          '<td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#FFFFC2 !important;"> - </td>\
                <td style="background-color:#F0F0EF !important;"> - </td>\
              </tr>';
      }
      sumAll += sum;
    }
  }

  html +=
    '</tbody>\
        <tbody >\
          <tr>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
    sumT[0] +
    ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
    sumT[1] +
    ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
    sumT[2] +
    ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
    sumAll +
    " </td>\
          </tr>\
        </tbody>\
      </table>";
  html +=
    '<table class="table condensed">\
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
  sum = 0;
  html +=
    '<tr><td style="background-color:#E7FFE7 !important;"> ' +
    office[0].office_name_ar +
    " </td>";
  if (obj[office[0].office_id] != undefined) {
    for (k = 4; k < 7; k++) {
      if (obj[office[0].office_id][k] != undefined) {
        sum += parseInt(obj[office[0].office_id][k]);
        html +=
          '<td style="background-color:#FFFFC2 !important;"> ' +
          obj[office[0].office_id][k] +
          " </td>";
      } else {
        html += '<td style="background-color:#FFFFC2 !important;"> - </td>';
      }
    }
    html +=
      '<td style="background-color:#F0F0EF !important;"> ' +
      sum +
      " </td>\
        </tr>";
  } else {
    html +=
      '<td style="background-color:#FFFFC2 !important;"> - </td>\
          <td style="background-color:#FFFFC2 !important;"> - </td>\
          <td style="background-color:#FFFFC2 !important;"> - </td>\
          <td style="background-color:#F0F0EF !important;"> - </td>\
        </tr>';
  }
  sumAll += sum;
  html += " </tbody>";
  html +=
    '</tbody>\
        <tbody style="direction: ltr;">\
          <tr>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
    sumAll +
    " </td>\
          </tr>\
        </tbody>\
      </table>";
  return new Handlebars.SafeString(html);
});
////////////////////////////////////////////////////////////////////////////
Handlebars.registerHelper(
  "drawAllResults",
  function (allResults, national, officePar, typeOfOrg) {
    var html = "";
    var gender1;
    var nat = "";
    var typeInTD = "";
    var office1 = "";
    for (i in allResults) {
      for (var l = 0; l < officePar.length; l++) {
        if (allResults[i].id_office == officePar[l].idoffice) {
          office1 = officePar[l].office_name_ar;
          break;
        }
      }
      for (var k = 0; k < typeOfOrg.length; k++) {
        if (allResults[i].type == typeOfOrg[k].type_id) {
          typeInTD = typeOfOrg[k].type_name;
          break;
        }
      }
      for (var j = 0; j < national.length; j++) {
        if (allResults[i].nationality == national[j].id) {
          nat = national[j].name;
          break;
        }
      }
      if (allResults[i].gender == 0) {
        gender1 = "أنـثـى";
      } else {
        gender1 = "ذكـر";
      }
      html +=
        '<tr>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].name_org +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].registration_no +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].name_director +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        typeInTD +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].phone +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].email_org +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].address +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].name +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        nat +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].pass_nid +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        gender1 +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].email_obs +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].phone_obs +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        office1 +
        ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
        allResults[i].ob_num +
        " </td>\
              </tr>";
    }
    return new Handlebars.SafeString(html);
  }
);

/////////////////////////////
router.get("/observers", userHelpers.isRoot, function (req, res, next) {
  var templateHtml = fs.readFileSync(
    path.join(__dirname, "../views/reports/observers.html"),
    "utf8"
  );
  var template = Handlebars.compile(templateHtml);

  // var html = fs.readFileSync(
  //   path.join(__dirname, "../views/reports/observers.html"),
  //   "utf8"
  // );
  var options = {
    format: "A3",
    orientation: "landscape",
    border: "5mm",
  };
  var now = new Date();
  var nowdate =
    now.getDate() +
    " / " +
    parseFloat(now.getMonth() + 1) +
    " / " +
    now.getFullYear();
  reportMgr.getAllObsAndOrg(function (results) {
    // jsr
    var html = template({
      allResults: results,
      national: nationality,
      officePar: office,
      typeOfOrg: type,
      title: "بيانات تفصيلية لجميع المعتمدين",
      date: nowdate,
      typeo: "المراقب",
    });
    var document = {
      html: html,
      data: {
        allResults: results,
        national: nationality,
        officePar: office,
        typeOfOrg: type,
        title: "بــيـانـات تفصيلية لجميع المعتمدين",
        date: nowdate,
        typeo: " الـمـراقـب",
      },
      path: "./output.pdf",
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //   .render({
    //     template: {
    //       content: fs.readFileSync(
    //         path.join(__dirname, "../views/reports/observers.html"),
    //         "utf8"
    //       ),
    //       phantom: {
    //         format: "A3",
    //         orientation: "landscape",
    //       },
    //       recipe: "phantom-pdf",
    //       helpers: drawAllResults.toString(),
    //     },
    //     data: {
    //       allResults: results,
    //       national: nationality,
    //       officePar: office,
    //       typeOfOrg: type,
    //       title: "بــيـانـات تفصيلية لجميع المعتمدين",
    //       date: nowdate,
    //       typeo: " الـمـراقـب",
    //     },
    //   })
    //   .then(function (response) {
    //     response.result.pipe(res);
    //   });
  });
});
router.get(
  "/observerstype/:type",
  userHelpers.Login,
  function (req, res, next) {
    var title = [
      "بيانات تفصيلية / الـمـراقـبـيـن",
      "بــيـانـات تـــفـــصــيـــلــــية / الاعلاميين",
      "بيانات تفصيلية / الضيوف",
    ];
    var now = new Date();
    var nowdate =
      now.getDate() +
      " / " +
      parseFloat(now.getMonth() + 1) +
      " / " +
      now.getFullYear();
    var typet = ["الـمـراقـب", "الاعلامي", "الضيف"];
    reportMgr.getAllObsAndOrgtype(req.params.type, function (results) {
      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/observers.html"),
        "utf8"
      );
      var template = Handlebars.compile(templateHtml);

      var options = {
        format: "A3",
        orientation: "landscape",
        border: "5mm",
      };
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();
      reportMgr.getAllObsAndOrg(function (results) {
        // jsr
        var html = template({
          allResults: results,
          national: nationality,
          officePar: office,
          typeOfOrg: type,
          title: title[req.params.type - 4],
          date: nowdate,
          typeo: typet[req.params.type - 4],
        });
        var document = {
          html: html,
          data: {
            allResults: results,
            national: nationality,
            officePar: office,
            typeOfOrg: type,
            title: title[req.params.type - 4],
            date: nowdate,
            typeo: typet[req.params.type - 4],
          },
          path: "./output.pdf",
          type: "",
        };
        pdf
          .create(document, options)
          .then((resw) => {
            // res.send(res.filename);
            fs.readFile(resw.filename, function (err, data) {
              res.contentType("application/pdf");
              res.send(data);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  }
);
// this noOfLocaleObs // widght A4
router.get("/noOfLocaleObs", userHelpers.isRoot, function (req, res, next) {
  reportMgr.getAllNoOfLocaleObs(function (arr1, arr2, arr3, arr4, arr5, arr6) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/noOfLocaleObs.html"),
      "utf8"
    );
    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A3",
      orientation: "portrait",
      border: "5mm",
    };
    var html = template({
      office: office,
      arr1: arr1,
      arr2: arr2,
      arr3: arr3,
      arr4: arr4,
      arr5: arr5,
      arr6: arr6,
      officePar: office,
    });
    var document = {
      html: html,
      data: {
        office: office,
        arr1: arr1,
        arr2: arr2,
        arr3: arr3,
        arr4: arr4,
        arr5: arr5,
        arr6: arr6,
        officePar: office,
      },
      path: "./noOfLocaleObs.pdf",
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // jsr
    //   .render({
    //     template: {
    //       content: fs.readFileSync(
    //         path.join(__dirname, "../views/reports/noOfLocaleObs.html"),
    //         "utf8"
    //       ),
    //       phantom: {
    //         orientation: "landscape",
    //       },
    //       recipe: "phantom-pdf",
    //       helpers: resultsNoOfLocaleObs.toString(),
    //     },
    //     data: {
    //       office: office,
    //       arr1: arr1,
    //       arr2: arr2,
    //       arr3: arr3,
    //       arr4: arr4,
    //       arr5: arr5,
    //       arr6: arr6,
    //       officePar: office,
    //     },
    //   })
    //   .then(function (response) {
    //     response.result.pipe(res);
    //   });
  });
});

// this noOfInternationalObs // widght A4
router.get(
  "/noOfInternationalObs",
  userHelpers.isRoot,
  function (req, res, next) {
    reportMgr.appNoOfInternationalObs(function (result) {
      obj = {};
      for (k in result) {
        if (obj[result[k].type] == undefined) {
          obj[result[k].type] = [];
          obj[result[k].type].push(result[k].num);
        }
      }
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();
      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/noOfInternationalObs.html"),
        "utf8"
      );
      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "5mm",
      };
      var html = template({
        resultt: obj,
        date: nowdate,
      });
      var document = {
        html: html,
        data: {
          resultt: obj,
          date: nowdate,
        },
        path: "./noOfInternationalObs.pdf",
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
);

// this obsByNationality // widght A4
router.get(
  "/obsByNationality/:nat",
  userHelpers.isRoot,
  function (req, res, next) {
    reportMgr.obsByNationality(req.params.nat, function (results) {
      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/obsByNationality.html"),
        "utf8"
      );
      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm",
      };
      var path = "./pdf/obsByNationality" + req.session.id_user + ".pdf";
      var html = template({});
      var document = {
        html: html,
        data: {},
        path: path,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
);

// this noOfInternationalObsEn // widght A4 need test
router.get(
  "/noOfInternationalObsEn",
  userHelpers.isRoot,
  function (req, res, next) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/noOfInternationalObsEn.html"),
      "utf8"
    );
    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A4",
      orientation: "portrait",
      border: "5mm",
    };
    var pathl = "./pdf/noOfInternationalObsEn" + req.session.id_user + ".pdf";
    var html = template({ allResults: results, national: nationality });
    var document = {
      html: html,
      data: { allResults: results, national: nationality },
      path: pathl,
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

// this obsByType // widght A4
router.get("/obsByType/:type", userHelpers.isRoot, function (req, res, next) {
  reportMgr.obsBytype(req.params.type, function (results) {
    if (results.length > 0) {
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();
      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/obsByType.html"),
        "utf8"
      );
      var pathl = "./pdf/obsByType" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "5mm",
      };
      var html = template({ allResults: results, date: nowdate });
      var document = {
        html: html,
        data: {
          allResults: results,
          date: nowdate,
        },
        path: pathl,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.redirect("/reports?msg=1");
    }
  });
});

// this noOfLocaleObsEn // widght A4 html is static
router.get("/noOfLocaleObsEn", userHelpers.isRoot, function (req, res, next) {
  reportMgr.getAllObsAndOrg(function (results) {
    console.log(results);
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/noOfLocaleObsEn.html"),
      "utf8"
    );
    var pathl = "./pdf/noOfLocaleObsEn" + req.session.id_user + ".pdf";

    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "5mm",
    };
    var html = template({ results });
    var document = {
      html: html,
      data: {
        results,
      },
      path: pathl,
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

// this statisticsOfficesByType // widght A4
router.get(
  "/statisticsOfficesByType",
  userHelpers.isRoot,
  function (req, res, next) {
    reportMgr.statisticsOfficesByType(function (result) {
      obj = {};
      for (k in result) {
        if (obj[result[k].id_office] == undefined) {
          obj[result[k].id_office] = [];
        }
        if (obj[result[k].id_office][result[k].type] == undefined) {
          obj[result[k].id_office][result[k].type] = [];
          obj[result[k].id_office][result[k].type].push(result[k].num);
        }
      }
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();

      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/statisticsOfficesByType.html"),
        "utf8"
      );
      var pathl =
        "./pdf/statisticsOfficesByType" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "5mm",
      };
      var html = template({
        offic: office,
        result: obj,
        date: nowdate,
      });
      var document = {
        html: html,
        data: {
          offic: office,
          result: obj,
          date: nowdate,
        },
        path: pathl,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
);

// this noOfWomenAndMen // normale A4
router.get("/noOfWomenAndMen", userHelpers.isRoot, function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/noOfWomenAndMen.html"),
      "utf8"
    );
    var pathl = "./pdf/noOfWomenAndMen" + req.session.id_user + ".pdf";

    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A4",
      orientation: "landscape",
      border: "5mm",
    };
    var html = template({
      allResults: results,
    });
    var document = {
      html: html,
      data: {
        allResults: results,
      },
      path: pathl,
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
// this noOfWomenAndMen // normale A4
router.get("/noOfWomenAndMenEn", userHelpers.isRoot, function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/noOfWomenAndMenEn.html"),
      "utf8"
    );
    var pathl = "./pdf/noOfWomenAndMenEn" + req.session.id_user + ".pdf";

    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A4",
      orientation: "landscape",
      border: "5mm",
    };
    var html = template({
      allResults: results,
    });
    var document = {
      html: html,
      data: {
        allResults: results,
      },
      path: pathl,
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

router.get(
  "/statisticsOfficesByTypeGender",
  userHelpers.isRoot,
  function (req, res, next) {
    reportMgr.statisticsOfficesByTypeGender(function (result) {
      obj = {};
      for (k in result) {
        if (obj[result[k].id_office] == undefined) {
          obj[result[k].id_office] = [];
        }
        if (obj[result[k].id_office][result[k].type] == undefined) {
          obj[result[k].id_office][result[k].type] = [];
          // obj[result[k].id_office][result[k].type].push(result[k].num);
        }
        if (
          obj[result[k].id_office][result[k].type][result[k].gender] ==
          undefined
        ) {
          obj[result[k].id_office][result[k].type][result[k].gender] = [];
          obj[result[k].id_office][result[k].type][result[k].gender].push(
            result[k].num
          );
        }
      }
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();

      var templateHtml = fs.readFileSync(
        path.join(
          __dirname,
          "../views/reports/statisticsOfficesByTypeGender.html"
        ),
        "utf8"
      );
      var pathl =
        "./pdf/statisticsOfficesByTypeGender" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm",
      };
      var html = template({
        office: office,
        obj: obj,
        date: nowdate,
      });
      var document = {
        html: html,
        data: {
          office: office,
          obj: obj,
          date: nowdate,
        },
        path: pathl,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
);
//draw observers counts by gender  /noOfWomenAndMen
Handlebars.registerHelper("noOfWomenAndMen", function (allResults) {
  var html = "";
  html +=
    '<tr>\
                <td style="background-color:#FFFFC2 !important;"> ' +
    allResults[0][0].man +
    ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
    allResults[1][0].woman +
    " </td>\
              </tr>";
  return new Handlebars.SafeString(html);
});

//draw observers counts by gender  /noOfWomenAndMen
function obsByNat(allResults, national) {
  var html = "";
  var nat;
  var typeInTD = "";
  // var type1 = ["منظمة عالمية","ضيف","إعلامي دولي","منظمة محلية","إعلامي محلي","وكيل"];
  var type1 = [
    "وكيل",
    "منظمة محلية",
    "إعلامي محلي",
    "منظمة عالمية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  for (var j = 0; j < national.length; j++) {
    if (allResults[0].nationality == national[j].id) {
      nat = national[j].name;
      break;
    }
  }

  html +=
    '<tr style="border-top-style: solid; border-top-width: 1px;" >\
              <th colspan="2" class="text-center" style="background-color:#B2E6FF !important;">  ' +
    nat +
    '  </th>\
            </tr>\
            <tr style="border-top-style: solid; border-top-width: 1px;" >\
              <th class="text-center" style="background-color:#B2E6FF !important;"> اسـم الـمـراقـب </th>\
              <th class="text-center"  style="background-color:#B2E6FF !important;"> نـوع الـمـنـظـمـة </th>\
            </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';

  for (i in allResults) {
    // for (var k = 0; k <= type1.length; k++) {
    //   if(allResults[k].type-1 == k ){
    //     typeInTD = type1[k];
    //     break;
    //   }
    // }
    html +=
      '<tr>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].name +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      type1[allResults[i] - 1] +
      " </td>\
              </tr>";
  }

  return html;
}

//by type
Handlebars.registerHelper("obsBytype", function (allResults) {
  var html = "";
  var type1 = [
    "وكيل",
    "منظمة محلية",
    "إعلامي محلي",
    "منظمة دـولية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  var typeh = [
    "المترشح",
    "الـمـنـظـمـة",
    "المؤسسة الإعلامية",
    "الـمـنـظـمـة",
    "المؤسسة الإعلامية",
    "الهيئة",
  ];

  html +=
    '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> ' +
    type1[allResults[0].type - 1] +
    ' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم ' +
    typeh[allResults[0].type - 1] +
    ' </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسم المدير  </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الهاتف </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> البريد الالكتروني </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> عـدد الـمـراقـبـيـن </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
  j = 0;
  for (var i in allResults) {
    j++;
    html +=
      "<tr>\
          </tr>\
          <td>" +
      j +
      "</td>" +
      '<td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].name_org +
      ' </td> \
          <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].name_director +
      ' </td> \
          <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].phone +
      ' </td> \
          <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].email +
      ' </td> \
            <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].ObsCount +
      " </td>";
  }
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper(
  "statisticsOfficesByTypeGender",
  function (obj, office) {
    var sumAll = 0;
    var sumAllM = 0;
    var sumAllF = 0;

    var sumgF = [0, 0, 0];
    var sumgM = [0, 0, 0];
    var html = "";
    for (i in office) {
      if (i != 0) {
        var sum = 0;
        var sumM = 0;
        var sumF = 0;
        html +=
          '<tr><td colspan="2" style="height:1px; background-color:#FFFFC2 !important;"> ' +
          office[i].office_name_ar +
          " </td>";
        if (obj[office[i].office_id] != undefined) {
          for (k = 1; k < 4; k++) {
            if (
              obj[office[i].office_id][k] != undefined ||
              obj[office[i].office_id][k] != null
            ) {
              if (obj[office[i].office_id][k][1] != null) {
                sum += parseInt(obj[office[i].office_id][k][1]);
                sumM += parseInt(obj[office[i].office_id][k][1]);
                sumgM[k - 1] += parseInt(obj[office[i].office_id][k][1]);
                html +=
                  '<td style="height:1px;background-color:#FFFFC2 !important;"> ' +
                  obj[office[i].office_id][k][1] +
                  " </td>";
              } else {
                html +=
                  '<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>';
              }
              if (obj[office[i].office_id][k][0] != null) {
                sum += parseInt(obj[office[i].office_id][k][0]);
                sumF += parseInt(obj[office[i].office_id][k][0]);
                sumgF[k - 1] += parseInt(obj[office[i].office_id][k][0]);
                html +=
                  '<td style="height:1px;background-color:#FFFFC2 !important;"> ' +
                  obj[office[i].office_id][k][0] +
                  " </td>";
              } else {
                html +=
                  '<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>';
              }
            } else {
              html +=
                '<td style="height:1px;background-color:#FFFFC2 !important;"> - </td><td style="background-color:#FFFFC2 !important;"> - </td>';
            }
          }
          html +=
            '<td style="height:1px;background-color:#F0F0EF !important;"> ' +
            sumM +
            ' </td><td style="height:1px;background-color:#F0F0EF !important;"> ' +
            sumF +
            ' </td><td style="height:1px;background-color:#F0F0EF !important;"> ' +
            sum +
            " </td>";
        } else {
          html +=
            '<td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#FFFFC2 !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>\
        <td style="height:1px;background-color:#F0F0EF !important;"> - </td>';
        }
        html += "</tr>";

        sumAll += sum;
        sumAllF += sumF;
        sumAllM += sumM;
      }
    }
    html +=
      '</tbody ><tbody >\
          <tr>\
            <td colspan="2" style="background-color:#F0F0EF !important;border: 1px solid;">  </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgM[0] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgF[0] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgM[1] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgF[1] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgM[2] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumgF[2] +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumAllM +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumAllF +
      ' </td>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> ' +
      sumAll +
      " </td>\
          </tr>\
        </tbody></table>";

    html += '<table class="table condensed"><thead>';
    html +=
      '<tr height="1%" style="border-top-style: solid; border-top-width: 1px;" >\
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
    sum = 0;
    sumM = 0;
    sumF = 0;
    html +=
      '<tr><td colspan="2" style="background-color:#FFFFC2 !important;"> ' +
      office[0].office_name_ar +
      " </td>";
    i = 0;
    if (obj[office[i].office_id] != undefined) {
      for (k = 4; k < 7; k++) {
        if (
          obj[office[i].office_id][k] != undefined ||
          obj[office[i].office_id][k] != null
        ) {
          if (obj[office[i].office_id][k][1] != null) {
            sum += parseInt(obj[office[i].office_id][k][1]);
            sumM += parseInt(obj[office[i].office_id][k][1]);
            html +=
              '<td style="background-color:#FFFFC2 !important;"> ' +
              obj[office[i].office_id][k][1] +
              " </td>";
          } else {
            html += '<td style="background-color:#FFFFC2 !important;"> - </td>';
          }
          if (obj[office[i].office_id][k][0] != null) {
            sum += parseInt(obj[office[i].office_id][k][0]);
            sumF += parseInt(obj[office[i].office_id][k][0]);
            html +=
              '<td style="background-color:#FFFFC2 !important;"> ' +
              obj[office[i].office_id][k][0] +
              " </td>";
          } else {
            html += '<td style="background-color:#FFFFC2 !important;"> - </td>';
          }
        } else {
          html +=
            '<td style="background-color:#FFFFC2 !important;"> - </td><td style="background-color:#FFFFC2 !important;"> - </td>';
        }
      }
      html +=
        '<td style="background-color:#F0F0EF !important;"> ' +
        sumM +
        ' </td><td style="background-color:#F0F0EF !important;"> ' +
        sumF +
        ' </td><td style="background-color:#F0F0EF !important;"> ' +
        sum +
        " </td></tr>";
    } else {
      html +=
        '<td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#FFFFC2 !important;"> - </td>\
        <td style="background-color:#F0F0EF !important;"> - </td><td style="background-color:#F0F0EF !important;"> - </td><td style="background-color:#F0F0EF !important;"> - </td></tr>';
    }
    html += "</tbody></table>";
    return new Handlebars.SafeString(html);
  }
);
router.get("/orgObs/:id", userHelpers.isRoot, function (req, res, next) {
  obsMgr.getOrgObs(req.params.id, function (results) {
    if (results.length > 0) {
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();

      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/orgObs.html"),
        "utf8"
      );
      var pathl = "./pdf/orgObs" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
        orientation: "landscape",
        border: "5mm",
      };
      var html = template({
        allResults: results,
        date: nowdate,
        office: office,
      });
      var document = {
        html: html,
        data: {
          allResults: results,
          date: nowdate,
          office: office,
        },
        path: pathl,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.redirect("/reports?msg=1");
    }
  });
});
Handlebars.registerHelper("orgObs", function (data, offic) {
  var html = "";
  html +=
    '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> بيانات المعتمدين في ' +
    data[0].name_org +
    ' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;">  اسم المراقب </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الهاتف </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> البريد الالكتروني </th>';
  if (data[0].type > 3) {
    html +=
      '<th class="text-center"  style="background-color:#B2E6FF !important;"> الـلـجـنـة </th>';
  }

  html +=
    '<th class="text-center"  style="background-color:#B2E6FF !important;"> رقم البطاقة  </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
  j = 0;
  for (var i in data) {
    j++;
    html +=
      "<tr>\
          </tr>\
          <td>" +
      j +
      "</td>" +
      '<td style="background-color:#FFFFC2 !important;"> ' +
      data[i].name +
      ' </td> \
          <td style="background-color:#FFFFC2 !important;"> ' +
      data[i].phone_obs +
      ' </td> \
          <td style="background-color:#FFFFC2 !important;"> ' +
      data[i].email_obs +
      " </td> ";
    if (data[0].type > 3) {
      if (data[i].office_obs < 0) {
        html +=
          '<td style="background-color:#FFFFC2 !important;"> ' +
          offic[0].office_name_ar +
          "<br>" +
          offic[0].office_name +
          " </td> ";
      } else {
        html +=
          '<td style="background-color:#FFFFC2 !important;"> ' +
          offic[data[i].office_obs].office_name_ar +
          " </td> ";
      }
    }
    html +=
      '<td style="background-color:#FFFFC2 !important;"> ' +
      data[i].ob_num +
      " </td>";
  }
  return new Handlebars.SafeString(html);
});
router.get(
  "/obsByTypezip/:type",
  userHelpers.isRoot,
  function (req, res, next) {
    reportMgr.obsBytype(req.params.type, function (results) {
      if (results.length > 0) {
        var now = new Date();
        var nowdate =
          now.getDate() +
          " / " +
          parseFloat(now.getMonth() + 1) +
          " / " +
          now.getFullYear();

        var templateHtml = fs.readFileSync(
          path.join(__dirname, "../views/reports/obsByTypezip.html"),
          "utf8"
        );
        var pathl = "./pdf/obsByTypezip" + req.session.id_user + ".pdf";

        var template = Handlebars.compile(templateHtml);
        var options = {
          format: "A4",
          orientation: "portrait",
          border: "5mm",
        };
        var html = template({
          allResults: results,
          date: nowdate,
          offic: office,
        });
        var document = {
          html: html,
          data: {
            allResults: results,
            date: nowdate,
            offic: office,
          },
          path: pathl,
          type: "",
        };
        pdf
          .create(document, options)
          .then((resw) => {
            // res.send(res.filename);
            fs.readFile(resw.filename, function (err, data) {
              res.contentType("application/pdf");
              res.send(data);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        res.redirect("/reports?msg=1");
      }
    });
  }
);
Handlebars.registerHelper("obsBytypezip", function (allResults, offic) {
  var html = "";
  var type1 = [
    "وكيل",
    "منظمة محلية",
    "إعلامي محلي",
    "منظمة دـولية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  // for (var k = 0; k <= type1.length; k++) {
  //   if(allResults[k].type-1 == k ){
  //     typeInTD = type1[k];
  //     break;
  //   }
  // }
  html +=
    '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> ' +
    type1[allResults[0].type - 1] +
    ' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم الـمـنـظـمـة </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> عـدد الـمـراقـبـيـن </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
  j = 0;
  for (var i in allResults) {
    j++;
    html +=
      "<tr>\
          </tr>\
          <td>" +
      j +
      "</td>" +
      '<td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].name_org +
      ' </td> \
            <td style="background-color:#FFFFC2 !important;"> ' +
      allResults[i].ObsCount +
      " </td>";
    // if(allResults[i].id_office<0){
    // html+='<td style="background-color:#FFFFC2 !important;"> '+offic[0].office_name_ar+' </td> ';
    // }else{
    //   html+='<td style="background-color:#FFFFC2 !important;"> '+offic[allResults[i].id_office].office_name_ar+' </td> ';
    // }
  }
  return new Handlebars.SafeString(html);
});
router.get("/orgObszip/:id", userHelpers.isRoot, function (req, res, next) {
  reportMgr.getOrgObszip(req.params.id, function (results) {
    if (results.length > 0) {
      var now = new Date();
      var nowdate =
        now.getDate() +
        " / " +
        parseFloat(now.getMonth() + 1) +
        " / " +
        now.getFullYear();

      var templateHtml = fs.readFileSync(
        path.join(__dirname, "../views/reports/orgObszip.html"),
        "utf8"
      );
      var pathl = "./pdf/orgObszip" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm",
      };
      var html = template({
        allResults: results,
        date: nowdate,
        office: office,
      });
      var document = {
        html: html,
        data: {
          allResults: results,
          date: nowdate,
          office: office,
        },
        path: pathl,
        type: "",
      };
      pdf
        .create(document, options)
        .then((resw) => {
          // res.send(res.filename);
          fs.readFile(resw.filename, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.redirect("/reports?msg=1");
    }
  });
});

router.get("/test", function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/test.html"),
            "utf8"
          ),
          phantom: {
            // width: "6047.244095",
            // height: "9070.866142",
            format: "A4",
          },
          recipe: "phantom-pdf",
          // helpers:noOfWomenAndMen.toString()
        },
        data: { allResults: results },
        // data:obj
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});

router.get("/svg", function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/svg.html"),
            "utf8"
          ),
          phantom: {
            format: "A4",
          },
          recipe: "phantom-pdf",
          // helpers:noOfWomenAndMen.toString()
        },
        data: { allResults: results },
        // data:obj
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});
Handlebars.registerHelper("orgObszip", function (data, offic) {
  var html = "";
  html =
    '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> بيانات المعتمدين في ' +
    data[0].name_org +
    " </th>";
  html +=
    ' </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الـلـجـنـة </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> العـدد </th>\
              </tr>\
            </thead>\
            <tbody style="border: 1px solid #000;">';
  j = 0;
  for (var i in data) {
    j++;
    html += "<tr>\
          </tr>\
          <td>" + j + "</td>";
    if (data[i].id_office < 0) {
      html +=
        '<td style="background-color:#FFFFC2 !important;"> ' +
        offic[0].office_name_ar +
        " </td> ";
    } else {
      html +=
        '<td style="background-color:#FFFFC2 !important;"> ' +
        offic[data[i].id_office].office_name_ar +
        " </td> ";
    }
    html +=
      '<td style="background-color:#FFFFC2 !important;"> ' +
      data[i].num +
      " </td> ";
  }
  return new Handlebars.SafeString(html);
});
router.post("/printloc", userHelpers.Login, function (req, res) {
  obsMgr.getprint(req.body.id_print, function (result) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reports/test2.html"),
      "utf8"
    );
    var pathl = "./pdf/test2" + req.session.id_user + ".pdf";

    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A4",
      orientation: "portrait",
      border: "5mm",
    };
    var html = template({
      allResults: result,
    });
    var document = {
      html: html,
      data: {
        allResults: result,
      },
      path: pathl,
      type: "",
    };
    pdf
      .create(document, options)
      .then((resw) => {
        // res.send(res.filename);
        fs.readFile(resw.filename, function (err, data) {
          res.contentType("application/pdf");
          res.send(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
Handlebars.registerHelper("printloc", function (result) {
  var typear = [
    "وكيل",
    "مراقب محلي",
    "إعلام محلي",
    "مراقب دولي",
    "إعلام دولي",
    "ضيف",
  ];
  var html = "";
  if (result[0] != undefined) {
    html +=
      '<div class="col-xs-6">\
          <h4 class="vertical-number first-v-no">' +
      result[0].ob_num +
      '</h4>\
          <div class="row">\
            <div class="col-xs-6 first-col-right text-center">\
              <h4 class="first-word">' +
      typear[result[0].type - 1] +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-12 second-col-right text-center">\
              <h4 class="second-word">' +
      result[0].name +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-12 third-col-right text-center">\
              <h4 class="third-word">' +
      result[0].name_org +
      "</h4>\
            </div>\
          </div>\
        </div>";

    //   html+='<span class="vertical-text" style="padding-right:180px;padding-top:120px; !important">'+
    //     result[0].ob_num+
    //   '</span>\
    //   <div class="col-xs-7">\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 225px; !important;">\
    //         <p class="text-center"><span class="font-size">'+typear[result[0].type-1]+'</span></p>\
    //       </div>\
    //     </div>\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 35px; !important;">\
    //         <p class="text-center"><span class="font-size">'+result[0].name+'</span></p>\
    //       </div>\
    //     </div>\
    //     <div class="row">\
    //       <div class="col-xs-12   "style="padding-top: 45px; !important;">\
    //         <p class="text-center"><span class="font-size">'+result[0].name_org+'</span></p>\
    //       </div>\
    //     </div>\
    //   </div>';
  }
  if (result[1] != undefined) {
    html +=
      '<div class="col-xs-6">\
          <h4 class="vertical-number second-v-no">' +
      result[1].ob_num +
      '</h4>\
          <div class="row">\
            <div class="col-xs-6 first-col-left text-center">\
              <h4 class="first-word">' +
      typear[result[1].type - 1] +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-10 text-center">\
              <h4 class="second-word">' +
      result[1].name +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-10 text-center">\
              <h4 class="third-word">' +
      result[1].name_org +
      "</h4>\
            </div>\
          </div>\
        </div>";
  }
  html += '</div><div class="row last-tow">';
  if (result[2] != undefined) {
    html +=
      '<div class="col-xs-6">\
          <h4 class="vertical-number third-v-no">' +
      result[2].ob_num +
      '</h4>\
          <div class="row">\
            <div class="col-xs-6 first-col-right-1 text-center">\
              <h4 class="first-word-1">' +
      typear[result[2].type - 1] +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-12 second-col-right-1 text-center">\
              <h4 class="second-word">' +
      result[2].name +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-12 third-col-right-1 text-center">\
              <h4 class="third-word">' +
      result[2].name_org +
      "</h4>\
            </div>\
          </div>\
        </div>";

    // html+='<span class="vertical-text" style="padding-right:245px;padding-top:160px; !important">'+
    //   result[2].ob_num+
    //   '</span>\
    //   <div class="col-xs-7">\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
    //         <p class="text-center">'+typear[result[2].type-1]+'</p>\
    //       </div>\
    //     </div>\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 35px; !important;">\
    //         <p class="text-center">'+result[2].name+'</p>\
    //       </div>\
    //     </div>\
    //     <div class="row">\
    //       <div class="col-xs-12   "style="padding-top: 25px; !important;">\
    //         <p class="text-center">'+result[2].name_org+'</p>\
    //       </div>\
    //     </div>\
    //   </div>';
  }
  if (result[3] != undefined) {
    html +=
      '<div class="col-xs-6">\
          <h4 class="vertical-number forth-v-no">' +
      result[3].ob_num +
      '</h4>\
          <div class="row">\
            <div class="col-xs-6 first-col-left-1 text-center">\
              <h4 class="first-word">' +
      typear[result[3].type - 1] +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-9 text-center">\
              <h4 class="second-word">' +
      result[3].name +
      '</h4>\
            </div>\
          </div>\
          <div class="row">\
            <div class="col-xs-9 text-center">\
              <h4 class="third-word">' +
      result[3].name_org +
      "</h4>\
            </div>\
          </div>\
        </div>";

    //   html+='<span class="vertical-text" style="padding-left:120px;padding-bottom: 580px; !important">'+
    //   result[3].ob_num+
    //   '</span>\
    //   <div class="col-xs-3">\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
    //         <p class="text-center">'+typear[result[3].type-1]+'</p>\
    //       </div>\
    //     <div class="row">\
    //       <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
    //         <p class="text-center">'+result[3].name+'</p>\
    //       </div>\
    //     </div>\
    //     <div class="row">\
    //       <div class="col-xs-12   "style="padding-top: 35px; !important;">\
    //         <p class="text-center">'+result[3].name_org+'</p>\
    //       </div>\
    //     </div>\
    //   </div>\
    // </div>\
    // <div class="row">\
    //   <div class="col-xs-6"></div>\
    //   <div class="col-xs-6"></div>\
    // ';
  }
  html += "</div>";
  return new Handlebars.SafeString(html);
});
module.exports = router;
