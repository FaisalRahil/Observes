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
      conn.query('SELECT *,`obs`.`email` AS email_obs,`obs`.`id_office` AS office_obs FROM  `observers` obs, `organisaition` org WHERE `org`.`status` =1 AND obs.`status` =1 AND `org`.`id_org` = `obs`.`registration_org` AND org.`id_org` = ? ', id_org,  function(err, result) {
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

  addOb : function(body,id_u,cb){
    mysqlMgr.connect(function (conn) {
      body['id_ob']=new Date().getTime();
      var num='';
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `id_org`=?',body['registration_org']  ,function(err, result) {
        if(id_u<0){
          num+="00";
        }else if(id_u>0 && id_u<10){
          num+="0"+id_u;
        }else if(id_u>9){
          num+=id_u;
        }
        num+='.0'+result[0].type+'.'+new Date().getTime();
        body['ob_num']=num;
        conn.query('INSERT INTO `observers` SET ?',body,  function(err, result) {
          conn.release();
          if(err) {
            console.log(err);
            cb(err);
          } else {
            result['id_o']=body['id_ob'];
            cb(result);
          }
        });
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
  checkDir : function(id,cb){ //sort by organisaition type
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs WHERE  obs.`status` =1  AND obs.`registration_org` = ? AND obs.`director`=1', [id], function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  
  getprint : function(id,cb){ //get observers in organisaitions
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND obs.`id_ob` in (?) AND obs.`registration_org` = org.`id_org`', [id],  function(err, result) {
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