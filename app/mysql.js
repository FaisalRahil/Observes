/************************************************************************/
var mysql = require("mysql");
var config = require("../config.json");
var pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  multipleStatements: true,
});
// var servire = mysql.createPool({
//   host: config.ho,
//   user: config.user,
//   password: config.epassword,
//   database: config.db,
//   multipleStatements: true,
// });
var util = require("util");
/************************************************************************/
exports.mysqlMgr = {
  connect: function (callback) {
    pool.getConnection(function (err, connection) {
      console.log(err);
      callback(connection);
    });
  },

  // conserver: function (callback) {
  //   servire.getConnection(function (err, connecti) {
  //     callback(err, connecti);
  //   });
  // },
};
