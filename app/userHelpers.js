var easyPbkdf2 = require("easy-pbkdf2")(),
  url = require("url"),
  userMgr = require("../app/users").userMgr;

module.exports = {
  /* here we add a new user to the system */
  addUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
      password = body.password; //we generate a new password for every new user
    easyPbkdf2.secureHash(
      password,
      salt,
      function (err, passwordHash, originalSalt) {
        var obj = {
          user_name: body.user_name,
          password: passwordHash,
          salt: originalSalt,
          first_name: body.first_name,
          last_name: body.last_name,
          phone_no: body.phone_no,
          id_office: body.id_office,
        };
        userMgr.addUser(obj, function (err, result) {
          cb(result);
        });
      }
    );
  },
  /* here we check if the user have root access */
  isRoot: function (req, res, next) {
    if (req.isAuthenticated() && req.session.id_office < 0) {
      return next();
    }
    res.redirect("/");
  },

  isLogin: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    if (req.isAuthenticated() && req.session.id_office < 0) {
      res.redirect("/admin/org" + req.session.office_idoffice);
    }
    if (req.isAuthenticated() && req.session.id_office > 0) {
      res.redirect("/manager/org");
    }
  },
  Login: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
};
