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

  delOrg : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `organisaition` SET `status` = 0 WHERE `id_org` = ?',id,  function(err, result) {
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