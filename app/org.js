var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.orgMgr = {
  getOrg : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `type`= ? ',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getOrgs : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  addOrg : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `organisaition` SET ?',body,  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

};