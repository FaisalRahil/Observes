var express = require("express");
var router = express.Router();
var obsMgr = require("../app/obs").obsMgr;
var orgMgr = require("../app/org").orgMgr;
var reportMgr = require("../app/reportMgr").reportMgr;
var app = require("express")();
var fs = require("fs");
var path = require("path");
var nationality = require("../Nationality");
var office = require("../office");
var type = require("../type");
var userHelpers = require("../app/userHelpers");
var pdf = require("pdf-creator-node");
const Handlebars = require("handlebars");

router.get("/", userHelpers.Login, function (req, res) {
  reportMgr.getOrgsRport(req.session.id_office, function (Morg) {
    res.render("reportsMgr/reports", {
      title: "الـتـقـاريـر",
      nationalities: nationality,
      offi: office,
      user: req.session.id_user,
      Morg: Morg,
    });
  });
});

router.get("/obsByType/:type", userHelpers.Login, function (req, res, next) {
  reportMgr.obsBytype(
    req.session.id_office,
    req.params.type,
    function (results) {
      if (results.length > 0) {
        var now = new Date();
        var nowdate =
          now.getDate() +
          " / " +
          parseFloat(now.getMonth() + 1) +
          " / " +
          now.getFullYear();

        var templateHtml = fs.readFileSync(
          path.join(__dirname, "../views/reportsMgr/obsByType.html"),
          "utf8"
        );
        var pathl = "./pdf/obsByType" + req.session.id_user + ".pdf";

        var template = Handlebars.compile(templateHtml);
        var options = {
          format: "A4",
          orientation: "landscape",
          border: "5mm",
        };
        var html = template({
          allResults: results,
          date: nowdate,
        });
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
        res.redirect("/reportsMgr?msg=1");
      }
    }
  );
});
router.get(
  "/noOfInternationalObs",
  userHelpers.Login,
  function (req, res, next) {
    reportMgr.appNoOfInternationalObs(req.session.id_office, function (result) {
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
        path.join(__dirname, "../views/reportsMgr/noOfInternationalObs.html"),
        "utf8"
      );
      var pathl = "./pdf/noOfInternationalObs" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
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
      border: "",
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

    // jsr
    //   .render({
    //     template: {
    //       content: fs.readFileSync(
    //         path.join(__dirname, "../views/reports/test2.html"),
    //         "utf8"
    //       ),
    //       phantom: {
    //         // width: "6047.244095",
    //         // height: "9070.866142",
    //         format: "A4",
    //       },
    //       recipe: "phantom-pdf",
    //       helpers: printloc.toString(),
    //     },
    //     data: { allResults: result },
    //     // data:obj
    //   })
    //   .then(function (response) {
    //     response.result.pipe(res);
    //   });
  });
});

router.get("/observers", userHelpers.Login, function (req, res, next) {
  var now = new Date();
  var nowdate =
    now.getDate() +
    " / " +
    parseFloat(now.getMonth() + 1) +
    " / " +
    now.getFullYear();
  reportMgr.getAllObsAndOrg(req.session.id_office, function (results) {
    var templateHtml = fs.readFileSync(
      path.join(__dirname, "../views/reportsMgr/observers.html"),
      "utf8"
    );
    var pathl = "./pdf/observers" + req.session.id_user + ".pdf";

    var template = Handlebars.compile(templateHtml);
    var options = {
      format: "A3",
      orientation: "landscape",
      border: "5mm",
    };
    var html = template({
      allResults: results,
      national: nationality,
      officePar: office,
      typeOfOrg: type,
      title: "بــيـانـات تفصيلية لجميع المعتمدين",
      date: nowdate,
      typeo: " الـمـراقـب",
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
  "/observerstype/:type",
  userHelpers.Login,
  function (req, res, next) {
    var now = new Date();
    var nowdate =
      now.getDate() +
      " / " +
      parseFloat(now.getMonth() + 1) +
      " / " +
      now.getFullYear();
    var title = [
      "بيانات تفصيلية /الوكلاء",
      "بــيـانـات تـــفـــصــيـــلــــية / الـمـراقـبـيـن",
      "بيانات تفصيلية / الاعلاميين",
    ];
    var typet = ["الوكيل", "الـمـراقـب", "الاعلامي"];
    reportMgr.getAllObsAndOrgtype(
      req.session.id_office,
      req.params.type,
      function (results) {
        var templateHtml = fs.readFileSync(
          path.join(__dirname, "../views/reportsMgr/observers.html"),
          "utf8"
        );
        var pathl = "./pdf/observers" + req.session.id_user + ".pdf";

        var template = Handlebars.compile(templateHtml);
        var options = {
          format: "A3",
          orientation: "landscape",
          border: "5mm",
        };
        var html = template({
          allResults: results,
          national: nationality,
          officePar: office,
          typeOfOrg: type,
          title: title[req.params.type - 1],
          date: nowdate,
          typeo: typet[req.params.type - 1],
        });
        var document = {
          html: html,
          data: {
            allResults: results,
            national: nationality,
            officePar: office,
            typeOfOrg: type,
            title: title[req.params.type - 1],
            date: nowdate,
            typeo: typet[req.params.type - 1],
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
      }
    );
  }
);
router.get(
  "/statisticsOfficesByTypeGender",
  userHelpers.Login,
  function (req, res, next) {
    reportMgr.statisticsOfficesByTypeGender(
      req.session.id_office,
      function (result) {
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
            "../views/reportsMgr/statisticsOfficesByTypeGender.html"
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
      }
    );
  }
);
router.get(
  "/statisticsOfficesByType",
  userHelpers.Login,
  function (req, res, next) {
    reportMgr.statisticsOfficesByType(req.session.id_office, function (result) {
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
        path.join(
          __dirname,
          "../views/reportsMgr/statisticsOfficesByType.html"
        ),
        "utf8"
      );
      var pathl =
        "./pdf/statisticsOfficesByType" + req.session.id_user + ".pdf";

      var template = Handlebars.compile(templateHtml);
      var options = {
        format: "A4",
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

// ////////////////////////////////////////////////////////////////////////
function resultsNoOfLocaleObs(
  office,
  arr1,
  arr2,
  arr3,
  arr4,
  arr5,
  arr6,
  officePar
) {
  var html = "";
  var type1 = [
    "وكيل",
    "منظمة محلية",
    "إعلامي محلي",
    "منظمة عالمية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  for (i in arr1) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr1[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 1 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr1[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  for (i in arr2) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr2[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 2 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr2[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  for (i in arr3) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr3[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 3 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr3[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  for (i in arr4) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr4[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 4 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr4[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  for (i in arr5) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr5[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 5 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr5[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  for (i in arr6) {
    html +=
      '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
      office[arr6[i].id_office].office_name_ar +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;"> 6 </td>\
                <td style="background-color:#FFFFC2 !important;"> ' +
      arr6[i].number +
      ' </td>\
                <td style="background-color:#FFFFC2 !important;">  </td>\
              </tr>';
  }
  return html;
}
// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////

// this noOfLocaleObs // widght A4
router.get("/noOfLocaleObs", userHelpers.Login, function (req, res, next) {
  reportMgr.getAllNoOfLocaleObs(function (arr1, arr2, arr3, arr4, arr5, arr6) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/noOfLocaleObs.html"),
            "utf8"
          ),
          phantom: {
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers: resultsNoOfLocaleObs.toString(),
        },
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
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});

// this noOfInternationalObs // widght A4

// this obsByNationality // widght A4
router.get(
  "/obsByNationality/:nat",
  userHelpers.Login,
  function (req, res, next) {
    reportMgr.obsByNationality(req.params.nat, function (results) {
      jsr
        .render({
          template: {
            content: fs.readFileSync(
              path.join(__dirname, "../views/reports/obsByNationality.html"),
              "utf8"
            ),
            phantom: {
              format: "A4",
              orientation: "landscape",
            },
            recipe: "phantom-pdf",
            helpers: obsByNat.toString(),
          },
          data: { allResults: results, national: nationality },
        })
        .then(function (response) {
          response.result.pipe(res);
        });
    });
  }
);

// this noOfInternationalObsEn // widght A4
router.get(
  "/noOfInternationalObsEn",
  userHelpers.Login,
  function (req, res, next) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(
              __dirname,
              "../views/reports/noOfInternationalObsEn.html"
            ),
            "utf8"
          ),
          phantom: {
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
        },
        data: { allResults: results, national: nationality },
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  }
);

// this obsByType // widght A4

// this noOfLocaleObsEn // widght A4
router.get("/noOfLocaleObsEn", userHelpers.Login, function (req, res, next) {
  reportMgr.getAllObsAndOrg(function (results) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/noOfLocaleObsEn.html"),
            "utf8"
          ),
          phantom: {
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
        },
        data: results,
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});

// this statisticsOfficesByType // widght A4

// this noOfWomenAndMen // normale A4
router.get("/noOfWomenAndMen", userHelpers.Login, function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/noOfWomenAndMen.html"),
            "utf8"
          ),
          phantom: {
            format: "A4",
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers: noOfWomenAndMen.toString(),
        },
        data: { allResults: results },
        // data:obj
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});
// this noOfWomenAndMen // normale A4
router.get("/noOfWomenAndMenEn", userHelpers.Login, function (req, res, next) {
  reportMgr.noOfWomenAndMen(function (results) {
    jsr
      .render({
        template: {
          content: fs.readFileSync(
            path.join(__dirname, "../views/reports/noOfWomenAndMenEn.html"),
            "utf8"
          ),
          phantom: {
            format: "A4",
            orientation: "landscape",
          },
          recipe: "phantom-pdf",
          helpers: noOfWomenAndMen.toString(),
        },
        data: { allResults: results },
        // data:obj
      })
      .then(function (response) {
        response.result.pipe(res);
      });
  });
});

//draw observers counts by gender  /noOfWomenAndMen
function noOfWomenAndMen(allResults) {
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
  return html;
}

//draw observers counts by gender  /noOfWomenAndMen
function obsByNat(allResults, national) {
  var html = "";
  var nat;
  var typeInTD = "";
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
      type1[allResults[i].type - 1] +
      " </td>\
              </tr>";
  }

  return html;
}

//by type

router.get("/orgObs/:id", userHelpers.Login, function (req, res, next) {
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
        path.join(__dirname, "../views/reportsMgr/orgObs.html"),
        "utf8"
      );
      var pathl = "./pdf/obsByType" + req.session.id_user + ".pdf";

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
      res.redirect("/reportsMgr?msg=1");
    }
  });
});
Handlebars.registerHelper("orgObsMgr", function (data, offic) {
  var html = "";
  var t = "في";
  var typet = ["الوكيل", "الـمـراقـب", "الاعلامي"];
  if (data[0].type == 1) {
    t = " &nbsp;<span>لـــــــــــــلمــــــتــــــــرشــــــــح</span>";
  }
  html +=
    '<th colspan="6" class="text-center" width="13%" style="background-color:#B2E6FF !important;"> بيانات المعتمدين   ' +
    t +
    "  " +
    data[0].name_org +
    ' </th>\
              </tr>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم ' +
    typet[data[0].type - 1] +
    ' </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> الهاتف </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> البريد الالكتروني </th>';

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

    html +=
      '<td style="background-color:#FFFFC2 !important;"> ' +
      data[i].ob_num +
      "</td>";
  }
  return new Handlebars.SafeString(html);
});
///////////////////////////////////////////////////////////////////
Handlebars.registerHelper("obsBytypeM", function (allResults) {
  var html = "";
  var type1 = [
    "وكـــيـــل",
    "منظمة مــحـــلية",
    "إعلامي مــحـــلي",
    "منظمة عالمية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  var typeh = [
    "المــــــتــــــــرشــــــــح",
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
                <th class="text-center"  style="background-color:#B2E6FF !important;"><span> اسـم ' +
    typeh[allResults[0].type - 1] +
    '</span> </th>\
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
  "resultsNoOfInternationalObs",

  function (resultt) {
    html =
      '<div class="col-xs-12 col-xs-offset-4">\
          <div class="col-xs-5 text-center">\
            <div class="text-center fontSize"> \
              إحصائـــيـــة الجهات المحلية المعتـــمدة \
            </div>\
          </div>\
        </div><div class="col-xs-12">\
        <div class="towSpaces"></div><table class="table condensed">\
            <thead>\
              <tr style="border-top-style: solid; border-top-width: 1px;" >\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;"> مـراقـب مـحـلـي  </th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  إعـلام مـحـلـي  </th>\
                <th class="text-center" width="7%" style="background-color:#B2E6FF !important;">  وكيل </th>\
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
  }
);
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

        if (obj[office[i].office_id] != undefined) {
          html +=
            '<tr><td colspan="2" style="height:1px; background-color:#FFFFC2 !important;"> ' +
            office[i].office_name_ar +
            " </td>";
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
            <td colspan="2" style="background-color:#F0F0EF !important;border: 1px solid;"> المــجــموع </td>\
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

    return new Handlebars.SafeString(html);
  }
);

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
      if (obj[office[i].office_id] != undefined) {
        html +=
          '<tr>\
                <td style="background-color:#E7FFE7 !important;"> ' +
          office[i].office_name_ar +
          " </td>";
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
      }
      sumAll += sum;
    }
  }

  html +=
    '</tbody>\
        <tbody >\
          <tr>\
            <td style="background-color:#F0F0EF !important;border: 1px solid;"> المــجــموع</td>\
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

  sumAll += sum;

  return new Handlebars.SafeString(html);
});
router.get("/obsByTypezip/:type", userHelpers.Login, function (req, res, next) {
  reportMgr.obsBytype(
    req.session.id_office,
    req.params.type,
    function (results) {
      if (results.length > 0) {
        var now = new Date();
        var nowdate =
          now.getDate() +
          " / " +
          parseFloat(now.getMonth() + 1) +
          " / " +
          now.getFullYear();
        var templateHtml = fs.readFileSync(
          path.join(__dirname, "../views/reportsMgr/obsByTypezip.html"),
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
        });
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
        res.redirect("/reportsMgr?msg=1");
      }
    }
  );
});

Handlebars.registerHelper("obsBytypezip", function (allResults) {
  var html = "";
  var type1 = [
    "وكـــيـــل",
    "منظمة مــحـــلية",
    "إعلامي مــحـــلي",
    "منظمة عالمية",
    "إعلامي دولي",
    "الهيئات الدبلوماسية",
  ];
  var typeh = [
    "المــــــتــــــــرشــــــــح",
    "الـمـنـظـمـة",
    "المؤسسة الإعلامية",
    "الـمـنـظـمـة",
    "المؤسسة الإعلامية",
    "الهيئة",
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
                <th class="text-center"  style="background-color:#B2E6FF !important;width:30px;"> رقم </th>\
                <th class="text-center"  style="background-color:#B2E6FF !important;"> اسـم ' +
    typeh[allResults[0].type - 1] +
    ' </th>\
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
  }
  return new Handlebars.SafeString(html);
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
  console.log(result[0].ob_num);
  var html = "";
  if (result[0] != undefined) {
    html +=
      '<div class="one-right"><div class="name">' +
      result[0].name +
      //result[0].ob_num +
      '</div>\
      <div class="org">' +
      result[0].name_org +
      //typear[result[0].type - 1] +
      '</div>\
      <div class="id">' +
      result[0].ob_num +
      //result[0].name +
      "</div>\
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
      '<div class="one-left"><div class="name">' +
      result[1].name +
      //result[0].ob_num +
      '</div>\
    <div class="org">' +
      result[1].name_org +
      //typear[result[0].type - 1] +
      '</div>\
    <div class="id-2">' +
      result[1].ob_num +
      //result[0].name +
      "</div>\
    </div>";
  }
  if (result[2] != undefined) {
    html +=
      '<div class="two-right"><div class="name-2">' +
      result[2].name +
      //result[0].ob_num +
      '</div>\
    <div class="org-2">' +
      result[2].name_org +
      //typear[result[0].type - 1] +
      '</div>\
    <div class="id">' +
      result[2].ob_num +
      //result[0].name +
      "</div>\
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
      '<div class="two-left"><div class="name-2">' +
      result[3].name +
      //result[0].ob_num +
      '</div>\
    <div class="org-2">' +
      result[3].name_org +
      //typear[result[0].type - 1] +
      '</div>\
    <div class="id-2">' +
      result[3].ob_num +
      //result[0].name +
      "</div>\
    </div>";
  }
  return new Handlebars.SafeString(html);
});

// Handlebars.registerHelper("printloc", function (result) {
//   var typear = [
//     "وكيل",
//     "مراقب محلي",
//     "إعلام محلي",
//     "مراقب دولي",
//     "إعلام دولي",
//     "ضيف",
//   ];
//   var html = "";
//   if (result[0] != undefined) {
//     html +=
//       '<div class="col-xs-6">\
//           <h4 class="vertical-number first-v-no">' +
//       result[0].ob_num +
//       '</h4>\
//           <div class="row">\
//             <div class="col-xs-6 first-col-right text-center">\
//               <h4 class="first-word">' +
//       typear[result[0].type - 1] +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-12 second-col-right text-center">\
//               <h4 class="second-word">' +
//       result[0].name +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-12 third-col-right text-center">\
//               <h4 class="third-word">' +
//       result[0].name_org +
//       "</h4>\
//             </div>\
//           </div>\
//         </div>";

//     //   html+='<span class="vertical-text" style="padding-right:180px;padding-top:120px; !important">'+
//     //     result[0].ob_num+
//     //   '</span>\
//     //   <div class="col-xs-7">\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 225px; !important;">\
//     //         <p class="text-center"><span class="font-size">'+typear[result[0].type-1]+'</span></p>\
//     //       </div>\
//     //     </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 35px; !important;">\
//     //         <p class="text-center"><span class="font-size">'+result[0].name+'</span></p>\
//     //       </div>\
//     //     </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12   "style="padding-top: 45px; !important;">\
//     //         <p class="text-center"><span class="font-size">'+result[0].name_org+'</span></p>\
//     //       </div>\
//     //     </div>\
//     //   </div>';
//   }
//   if (result[1] != undefined) {
//     html +=
//       '<div class="col-xs-6">\
//           <h4 class="vertical-number second-v-no">' +
//       result[1].ob_num +
//       '</h4>\
//           <div class="row">\
//             <div class="col-xs-6 first-col-left text-center">\
//               <h4 class="first-word">' +
//       typear[result[1].type - 1] +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-10 text-center">\
//               <h4 class="second-word">' +
//       result[1].name +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-10 text-center">\
//               <h4 class="third-word">' +
//       result[1].name_org +
//       "</h4>\
//             </div>\
//           </div>\
//         </div>";
//   }
//   html += '</div><div class="row last-tow">';
//   if (result[2] != undefined) {
//     html +=
//       '<div class="col-xs-6">\
//           <h4 class="vertical-number third-v-no">' +
//       result[2].ob_num +
//       '</h4>\
//           <div class="row">\
//             <div class="col-xs-6 first-col-right-1 text-center">\
//               <h4 class="first-word-1">' +
//       typear[result[2].type - 1] +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-12 second-col-right-1 text-center">\
//               <h4 class="second-word">' +
//       result[2].name +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-12 third-col-right-1 text-center">\
//               <h4 class="third-word">' +
//       result[2].name_org +
//       "</h4>\
//             </div>\
//           </div>\
//         </div>";

//     // html+='<span class="vertical-text" style="padding-right:245px;padding-top:160px; !important">'+
//     //   result[2].ob_num+
//     //   '</span>\
//     //   <div class="col-xs-7">\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
//     //         <p class="text-center">'+typear[result[2].type-1]+'</p>\
//     //       </div>\
//     //     </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 35px; !important;">\
//     //         <p class="text-center">'+result[2].name+'</p>\
//     //       </div>\
//     //     </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12   "style="padding-top: 25px; !important;">\
//     //         <p class="text-center">'+result[2].name_org+'</p>\
//     //       </div>\
//     //     </div>\
//     //   </div>';
//   }
//   if (result[3] != undefined) {
//     html +=
//       '<div class="col-xs-6">\
//           <h4 class="vertical-number forth-v-no">' +
//       result[3].ob_num +
//       '</h4>\
//           <div class="row">\
//             <div class="col-xs-6 first-col-left-1 text-center">\
//               <h4 class="first-word">' +
//       typear[result[3].type - 1] +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-9 text-center">\
//               <h4 class="second-word">' +
//       result[3].name +
//       '</h4>\
//             </div>\
//           </div>\
//           <div class="row">\
//             <div class="col-xs-9 text-center">\
//               <h4 class="third-word">' +
//       result[3].name_org +
//       "</h4>\
//             </div>\
//           </div>\
//         </div>";

//     //   html+='<span class="vertical-text" style="padding-left:120px;padding-bottom: 580px; !important">'+
//     //   result[3].ob_num+
//     //   '</span>\
//     //   <div class="col-xs-3">\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 300px; !important;">\
//     //         <p class="text-center">'+typear[result[3].type-1]+'</p>\
//     //       </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12 "style=" padding-top: 30px; !important;">\
//     //         <p class="text-center">'+result[3].name+'</p>\
//     //       </div>\
//     //     </div>\
//     //     <div class="row">\
//     //       <div class="col-xs-12   "style="padding-top: 35px; !important;">\
//     //         <p class="text-center">'+result[3].name_org+'</p>\
//     //       </div>\
//     //     </div>\
//     //   </div>\
//     // </div>\
//     // <div class="row">\
//     //   <div class="col-xs-6"></div>\
//     //   <div class="col-xs-6"></div>\
//     // ';
//   }
//   html += "</div>";
//   return new Handlebars.SafeString(html);
// });
module.exports = router;
