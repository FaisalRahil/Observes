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
  user_name : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `user_name`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  user_name : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `user_name`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  first_name : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `first_name`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  last_name : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `last_name`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  password : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `password`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  phone_no : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `phone_no`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  id_office : function(body,cb){ //get all observers
    mysqlMgr.connect(function (conn) {
      conn.query(' UPDATE `user` SET `id_office`= ?  WHERE `id_user`= ? ',[body.value,body.pk],  function(err, result) {
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