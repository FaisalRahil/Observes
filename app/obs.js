var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.obsMgr = {
  
  getOb : function(id,cb){ //sort by organisaition type
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM  `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`type` = ? AND obs.`registration_org` = org.`registration_no`', id, function(err, result) {
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

    delMediaObs : function(id,cb){
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

    delOrgObs : function(id,cb){
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

    delGuestObs : function(id,cb){
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

  // ///////////////////////////////////////////////////////
  // start edit obs in media 
  
    editMediaObs_pass_nid : function(body,cb){
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

    editMediaObs_name_obs : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `name_obs` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editMediaObs_email : function(body,cb){
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

    editMediaObs_phone : function(body,cb){
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

  // end edit obs in media
  // ///////////////////////////////////////////////

  // ///////////////////////////////////////////////
  // start edit obs in org 

    editOrgObs_pass_nid : function(body,cb){
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

    editOrgObs_name_obs : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `name_obs` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editOrgObs_email : function(body,cb){
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

    editOrgObs_phone : function(body,cb){
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

  // end edit obs in org 
  // ////////////////////////////////////////////////////////

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

    editObs_name_obs : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `name_obs` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
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

  // /////////////////////////////////////////////////////////
  // start edit obs in guest 
    editGuestObs_pass_nid : function(body,cb){
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

    editGuestObs_name_obs : function(body,cb){
      mysqlMgr.connect(function (conn) {
        var date = new Date();
        conn.query('UPDATE `observers` SET `name_obs` = ? , `modify_date` = ? WHERE `status`= 1 AND `id_ob` = ?',[body.value,date,body.pk],  function(err, result) {
          conn.release();
          if(err) {
            cb(err,null);
          } else {
            cb(null,result);
          }
        });
      });
    },

    editGuestObs_email : function(body,cb){
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

    editGuestObs_phone : function(body,cb){
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

  // end edit obs in guest 
  // ////////////////////////////////////////////////////////

};