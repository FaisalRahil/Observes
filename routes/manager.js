var express = require("express");
var router = express.Router();
var obsMgr = require("../app/obs").obsMgr;
var orgMgr = require("../app/org").orgMgr;
var userHelpers = require("../app/userHelpers");
/* GET home page. */
router.get("/", userHelpers.Login, function (req, res) {
  res.render("manager/manager");
});

/* GET home page. */
router.get("/org", userHelpers.Login, function (req, res) {
  res.render("manager/org", { user: req.session.id_user });
});
router.get("/editObs/:id", userHelpers.Login, function (req, res) {
  obsMgr.getObs_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editObs", {
        title: "تعديل المراقبين",
        obs: result,
        nav: "navbar-inverse",
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/obs");
    }
  });
});
/* GET home page. */
router.get("/obs", userHelpers.Login, function (req, res) {
  res.render("manager/obs", { user: req.session.id_user });
});

/* GET home page. */
router.get("/report", userHelpers.Login, function (req, res) {
  res.render("report");
});

/* GET home page. */
router.get("/org/locMedia", userHelpers.Login, function (req, res) {
  res.render("manager/locMedia", { user: req.session.id_user });
});

/* GET home page. */
router.get("/org/locOrg", userHelpers.Login, function (req, res) {
  res.render("manager/locOrg", { user: req.session.id_user });
});

/* GET home page. */
router.get("/org/candidate", userHelpers.Login, function (req, res) {
  orgMgr.getOrg(1, req.session.id_office, function (result) {
    res.render("manager/candidate", {
      title: "المرشحين",
      orgs: result,
      user: req.session.id_user,
    });
  });
});
/* GET home page. */
router.get("/editOrg/:id", userHelpers.Login, function (req, res) {
  res.render("editOrg");
});

/* GET home page. */
router.get("/obs/locOrg", userHelpers.Login, function (req, res) {
  orgMgr.getAllOrg(2, function (result) {
    res.render("manager/locOrgObs", {
      title: "مراقب محلي",
      orgs: result,
      user: req.session.id_user,
    });
  });
});

/* GET home page. */
router.get("/obs/locMedia", userHelpers.Login, function (req, res) {
  orgMgr.getAllOrg(3, function (result) {
    res.render("manager/locMediaObs", {
      title: "المنظمات",
      orgs: result,
      user: req.session.id_user,
    });
  });
});

/* GET home page. */
router.get("/obs/agent", userHelpers.Login, function (req, res) {
  orgMgr.getAllOrg(1, function (result) {
    res.render("manager/agent", {
      title: "الوكيل",
      orgs: result,
      user: req.session.id_user,
    });
  });
});

/* EDIT. */
router.get("/editMediaObs/:id", userHelpers.Login, function (req, res) {
  obsMgr.getObs_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editMediaObs", {
        title: "المراقبين",
        obs: result,
        nav: "navbar-orange",
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/obs");
    }
  });
});

router.get("/editLocOrg/:id", userHelpers.Login, function (req, res) {
  orgMgr.getOrg_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editOrg", {
        title: "تعديل المنضمة",
        org: result,
        nav: "navbar-inverse",
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/org");
    }
  });
});
/* EDIT. */
router.get("/editAgentObs/:id", userHelpers.Login, function (req, res) {
  obsMgr.getObs_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editAgentObs", {
        title: "المراقبين",
        obs: result,
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/obs");
    }
  });
});
/* EDIT. */
router.get("/editlocMeadia/:id", userHelpers.Login, function (req, res) {
  orgMgr.getOrg_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editlocMeadia", {
        title: "الاعلام المحلي",
        org: result,
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/org");
    }
  });
});
router.get("/editCandidateOrg/:id", userHelpers.Login, function (req, res) {
  orgMgr.getOrg_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editOrg", {
        title: "تعديل المنضمة",
        org: result,
        nav: "navbar-red",
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/org");
    }
  });
});
router.get("/editOrgObs/:id", userHelpers.Login, function (req, res) {
  obsMgr.getObs_Id(req.params.id, function (err, result) {
    if (result[0].upload == 0 || req.session.id_office < 0) {
      res.render("manager/editOrgObs", {
        title: "المراقبين",
        obs: result,
        user: req.session.id_user,
      });
    } else {
      res.redirect("/manager/obs");
    }
  });
});

/* GET home page. */
router.post("/editObs_name", userHelpers.Login, function (req, res) {
  obsMgr.editObs_name(req.body, function (err, result) {
    res.send(result);
  });
});

/* GET home page. */
router.post("/editObs_pass_nid", userHelpers.Login, function (req, res) {
  obsMgr.editObs_pass_nid(req.body, function (err, result) {
    res.send(result);
  });
});

/* GET home page. */
router.post("/editObs_email", userHelpers.Login, function (req, res) {
  obsMgr.editObs_email(req.body, function (err, result) {
    res.send(result);
  });
});
router.post("/editObs_gender", userHelpers.Login, function (req, res) {
  obsMgr.editObs_gender(req.body, function (err, result) {
    res.send(result);
  });
});
/* GET home page. */
router.post("/editObs_phone_obs", userHelpers.Login, function (req, res) {
  obsMgr.editObs_phone_obs(req.body, function (err, result) {
    res.send(result);
  });
});

// ====================== edit org

/* GET home page. */
router.post("/editOrg_registration_no", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_registration_no(req.body, function (err, result) {
    res.send(result);
  });
});
router.post("/editOrg_name_org", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_name_org(req.body, function (err, result) {
    res.send(result);
  });
});

/* GET home page. */
router.post("/editOrg_name_director", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_name_director(req.body, function (err, result) {
    res.send(result);
  });
});

/* GET home page. */
router.post("/editOrg_email", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_email(req.body, function (err, result) {
    res.send(result);
  });
});
/* GET home page. */
router.post("/editOrg_phone", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_phone(req.body, function (err, result) {
    res.send(result);
  });
});

/* GET home page. */
router.post("/editOrg_address", userHelpers.Login, function (req, res) {
  orgMgr.editOrg_address(req.body, function (err, result) {
    res.send(result);
  });
});

// ====================== end edit org
/* GET home page. */
router.get("/delObs/:id", function (req, res) {
  obsMgr.delObs(req.params.id, function (result) {
    res.send("result");
  });
});

/* GET home page. */
router.get("/delOrg/:id", function (req, res) {
  orgMgr.delOrg(req.params.id, function (err, result) {
    res.send(true);
  });
});

router.get("/checkOrg/:id", userHelpers.Login, function (req, res) {
  obsMgr.getObsIdOrg(req.params.id, function (result) {
    if (result[0]) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});
router.get("/getObsIdOrg/:id", userHelpers.Login, function (req, res) {
  obsMgr.getOrgObs(req.params.id, function (result) {
    res.send(result);
  });
});

/* GET home page. */
router.get("/getOb", userHelpers.Login, function (req, res) {
  obsMgr.getAllObsAndNameOrgByType(3, req.session.id_office, function (result) {
    res.send(result);
  });
});

router.get("/getAllObsAndNameOrg", userHelpers.Login, function (req, res) {
  obsMgr.getAllObsAndNameOrg(
    [1, 2, 3],
    req.session.id_office,
    function (result) {
      res.send(result);
    }
  );
});
/* GET home page. */
router.get("/getOb4", userHelpers.Login, function (req, res) {
  obsMgr.getAllObsAndNameOrgByType(2, req.session.id_office, function (result) {
    res.send(result);
  });
});

router.get("/getOb6", userHelpers.Login, function (req, res) {
  obsMgr.getAllObsAndNameOrgByType(1, req.session.id_office, function (result) {
    res.send(result);
  });
});
router.get("/getOrg6", userHelpers.Login, function (req, res) {
  orgMgr.getOrg(1, req.session.id_office, function (result) {
    res.send(result);
  });
});
router.get("/getOrg5", userHelpers.Login, function (req, res) {
  orgMgr.getOrg(3, req.session.id_office, function (result) {
    res.send(result);
  });
});
router.get("/getOrg4", userHelpers.Login, function (req, res) {
  orgMgr.getOrg(2, req.session.id_office, function (result) {
    res.send(result);
  });
});
router.post(
  "/addObs",
  userHelpers.Login,
  userHelpers.Login,
  function (req, res) {
    type = req.body["Type"];
    delete req.body["Type"];
    req.body.id_office = req.session.id_office;
    req.body["nationality"] = 113;
    if (req.body["gender"]) {
      req.body["gender"] = 0;
    } else {
      req.body["gender"] = 1;
    }
    if (req.body["director"]) {
      req.body["director"] = 1;
    } else {
      req.body["director"] = 0;
    }

    obsMgr.addOb(req.body, req.session.id_office, function (err, result) {
      if (type == 2) {
        res.redirect("/manager/obs/locOrg");
      }
      if (type == 3) {
        res.redirect("/manager/obs/locMedia");
      }
      if (type == 1) {
        res.redirect("/manager/obs/agent");
      }
    });
  }
);

router.post("/addOrg", userHelpers.Login, function (req, res) {
  req.body.id_office = req.session.id_office;
  orgMgr.addOrg(req.body, function (results) {
    if (req.body["type"] == 1) {
      res.redirect("org/candidate");
    } else if (req.body["type"] == 3) {
      res.redirect("org/locMedia");
    } else if (req.body["type"] == 2) {
      res.redirect("org/locOrg");
    }
  });
});
router.get("/getToSer", userHelpers.Login, function (req, res) {
  orgMgr.getToSer(function (results) {
    res.redirect("/manager/org?msg=" + results);
  });
});
router.post("/printloc", userHelpers.Login, function (req, res) {
  obsMgr.getprint(req.body.id_print, function (result) {
    res.send(result);
  });
});
module.exports = router;
