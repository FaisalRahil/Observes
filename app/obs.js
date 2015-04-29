var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.obsMgr = {
  
  getOb : function(id,cb){ //sort by organisaition type
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`type` = ? ', id, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getObs : function(cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `observers` WHERE `status`= 1 ',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getOrgObs : function(cb){ //get observers in organisaitions
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`id_org` = ? ', id_org,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  addOb : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `observers` SET ?',body,  function(err, result) {
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