var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.obsMgr = {
  
  getAllObsAndNameOrg : function(id,cb){ //sort by organisaition type
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`type` in (?) AND obs.`registration_org` = org.`id_org`', [id], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },



  getAllObsAndNameOrgByType : function(type,cb){ //sort by organisaition type
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`type` = ? AND obs.`registration_org` = org.`id_org`', type, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getAllObs : function(cb){ //get all observers
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

  getOrgObs : function(id_org,cb){ //get observers in organisaitions
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE `org`.`status` =1 AND obs.`status` =1 AND `org`.`id_org` = `obs`.`registration_org` AND org.`id_org` = ? ', id_org,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getObsIdOrg : function(id_org,cb){ //get observers in organisaitions
    mysqlMgr.connect(function (conn) {

      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`id_org` = obs.`registration_org` AND org.`id_org` = ? ', id_org,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getObs_Id : function(id,cb){ // get observer by id
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `observers` WHERE `status`= 1 AND `id_ob` = ?',id,  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  addOb : function(body,cb){
    mysqlMgr.connect(function (conn) {
      body['id_ob']=new Date().getTime();
      console.log(body);
      conn.query('INSERT INTO `observers` SET ?',body,  function(err, result) {
        conn.release();
        if(err) {
          cb(err);
        } else {
          cb(result);
        }
      });
    });
  },
  // ////////////////////////////////////////////////////
  // start delete methods

    delObs : function(id,cb){
      mysqlMgr.connect(function (conn) {
        conn.query('UPDATE `observers` SET `status` = 0 WHERE `id_ob` = ?',id,  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

  // end delete methods
  // //////////////////////////////////////////////////////////
  
  // //////////////////////////////////////////////////////////////////
  // ##################################################################
  // Start edit obs 

  editObs_name : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `name` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_pass_nid : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `pass_nid` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_email : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `email` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_phone_obs : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `phone_obs` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_nationality : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `nationality` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_director : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `director` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  editObs_gender : function(body,cb){
    mysqlMgr.connect(function (conn) {
      var date = new Date();
      conn.query('UPDATE `observers` SET `gender` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          cb(null,result);
        }
      });
    });
  },

  // End edit obs
  // #######################################################
  // ///////////////////////////////////////////////////////

  
  // /////////////////////////////////////////////////////////
  // start edit all obs
    editObs_pass_nid : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `pass_nid` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editObs_name : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `name` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editObs_email : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `email` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editObs_phone : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `phone` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

  // end edit all obs
  // ////////////////////////////////////////////////////////

  
};