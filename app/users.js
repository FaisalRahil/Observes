var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.userMgr = {
  addUser : function(body,cb){ 
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `user` SET ?',body,  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },
  getUserByUserName : function(userName,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE `user_name`=? ',userName,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  },
  getUserById : function(id,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `user` WHERE `id_user`=? ',id,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
};