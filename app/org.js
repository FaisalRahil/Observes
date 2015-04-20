var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.orgMgr = {
	getOrg : function(cb){
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
  }
};