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

  getOrg_Id : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `id_org` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_registration_no : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `registration_no` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_name_org : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `name_org` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_name_director : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `name_director` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_email : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `email` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_address : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `address` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editOrg_phone : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `organisaition` SET `phone` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_org` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  delMedia : function(id,cb){
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

  delGuest : function(id,cb){
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
