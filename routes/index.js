var express = require("express");
var router = express.Router();
var userMgr = require("../app/users").userMgr;
var userHelp = require("../app/userHelpers");
var office = require("../office.json");
var login = require("../app/login")(router);
var userHelpers = require("../app/userHelpers");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("login", { title: "تسجيل الدخول" });
});

router.get("/adduser", userHelpers.isRoot, function (req, res) {
  res.render("adduser", { title: "اضافة مستخدم ", offices: office });
});

router.get("/adminOrManager", userHelpers.isRoot, function (req, res) {
  res.render("adminOrManager", { title: "اضافة مستخدم ", offices: office });
});

router.get("/edituser/:id", userHelpers.isRoot, function (req, res) {
  userMgr.getUserById(req.params.id, function (result) {
    res.render("edituser", {
      title: "تعديل مستخدم ",
      offices: office,
      user: result[0],
    });
  });
});

/*    edit user name   . */
router.post("/user_name", userHelpers.isRoot, function (req, res) {
  userMgr.user_name(req.body, function (result) {
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post("/last_name", function (req, res) {
  userMgr.last_name(req.body, function (result) {
    res.send(result);
  });
});
/*    edit user firstname   . */
router.post("/first_name", userHelpers.isRoot, function (req, res) {
  userMgr.first_name(req.body, function (result) {
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post("/password", userHelpers.isRoot, function (req, res) {
  userMgr.password(req.body, function (result) {
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post("/last_name", userHelpers.isRoot, function (req, res) {
  userMgr.last_name(req.body, function (result) {
    res.send(result);
  });
});
/*    edit user last_name   . */
router.post("/phone_no", userHelpers.isRoot, function (req, res) {
  userMgr.phone_no(req.body, function (result) {
    res.send(result);
  });
});
router.post(
  "/addUser",
  userHelpers.isRoot,
  userHelpers.isRoot,
  function (req, res) {
    userHelp.addUser(req.body, function (results) {
      res.redirect("/adduser");
    });
  }
);

router.post("/id_office", userHelpers.isRoot, function (req, res) {
  userMgr.id_office(req.body, function (result) {
    res.send(result);
  });
});
router.get("/user_office", userHelpers.isRoot, function (req, res) {
  res.send(office);
});

router.post("/checkUser", userHelpers.isRoot, function (req, res) {
  userMgr.getUserByUserName(req.body.user, function (result) {
    if (!result) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});
module.exports = router;
