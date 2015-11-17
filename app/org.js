var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.orgMgr = {
  getOrg : function(type,cb){
    mysqlMgr.connect(function (conn) {

      conn.query('SELECT * FROM `organisaition`  WHERE  `status` = 1 AND `type`= ?',type,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getToSer : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `upload`=0',  function(err, result) {
        conn.query('SELECT * FROM `observers` WHERE `status`= 1 AND `upload`=0',  function(err, result1) {
          var orgs=[];
          var id_orgs=[];
          for (i in result){
            var k=[];
            k.push(result[i].id_org,result[i].registration_no,result[i].name_org,result[i].name_director,result[i].type,result[i].phone,result[i].email,result[i].address,result[i].modify_date,result[i].status,result[i].upload,result[i].upload_date,result[i].id_office);
            id_orgs.push(result[i].id_org);
            orgs.push(k);
          }
          var obss=[];
          var id_ob=[];
          var id_oborg =[];
          for (j in result1){
            var w=[];
            w.push(result1[j].id_ob,result1[j].name,result1[j].nationality,result1[j].pass_nid,result1[j].registration_org,result1[j].gender,result1[j].email,result1[j].phone_obs,result1[j].modify_date,result1[j].status,result1[j].upload,result1[j].upload_date,result1[j].director,result1[j].print,result1[j].id_office);
            id_ob.push(result1[j].id_ob);
            id_oborg.push(result1[j].registration_org);
            obss.push(w);
          }
          if(orgs.length!=0 ||obss.length!=0){
            mysqlMgr.conserver(function (err,connw) {
              if(err){
                cb(0);
              }else{
                if(orgs.length!=0){
                  connw.query('INSERT INTO `organisaition`(`id_org`, `registration_no`, `name_org`, `name_director`, `type`, `phone`, `email`, `address`, `modify_date`, `status`, `upload`, `upload_date`, `id_office`) VALUES ?',[orgs],function(err, resl) {
                    if(err) {
                      util.log(err);
                    }else{
                      var date = new Date();
                      conn.query('UPDATE `organisaition` SET `upload`=1,`upload_date`=? WHERE `id_org` in (?)',[date,id_orgs]);
                    }

                  });
                }
                if(obss.length!=0){
                  connw.query('INSERT INTO `observers`(`id_ob`, `name`, `nationality`, `pass_nid`, `registration_org`, `gender`, `email`, `phone_obs`, `modify_date`, `status`, `upload`, `upload_date`, `director`, `print`, `id_office`) VALUES ?',[obss],function(err, resl) {
                    if(err) {
                    util.log(err);
                    }else{
                      for (k in id_oborg){
                        connw.query('UPDATE `observers` SET `registration_org`=(SELECT `id_org_new` FROM `transfer` WHERE `id_org_old` = ?) WHERE `registration_org`=(SELECT `id_org_old` FROM `transfer` WHERE `id_org_old` = ?)',[id_oborg[k],id_oborg[k]]);
                      }
                      var date = new Date();
                      conn.query('UPDATE `observers` SET `upload`=1,`upload_date`=? WHERE `id_ob` in (?)',[date,id_ob]);
                    }
                  });
                }
                cb(2);
              }      
            });
          }else{
            cb(1);
          }
        });
      });
    });
  },


  getOrgs : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `type` IN ( 4,5, 6 )',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getOrgsAdmin : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT * FROM `organisaition` WHERE `status`= 1 AND `type` IN ( 1, 2, 3 ) ',  function(err, result) {
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
      body['id_org']=new Date().getTime();
      conn.query('INSERT INTO `organisaition` SET ?',body,  function(err, result) {
        conn.release();
        if(err) {
          cb(err,null);
        } else {
          result['id_o']=body['id_org'];
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
  getCount : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(*) AS num FROM `organisaition` WHERE `status`=1 AND `type` IN(?)',id,  function(err, result) {
        conn.release();
        if(err) {
          cb(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCountAll : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(*) AS num FROM `organisaition` WHERE `status`=1 AND `type` IN(1,2,3)',  function(err, result) {
        conn.release();
        if(err) {
          cb(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCountOb : function(id,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(`obs`.`id_ob`) AS num FROM `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND org.`type` = ? AND obs.`registration_org` = org.`id_org`',id,  function(err, result) {
        conn.release();
        if(err) {
          cb(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCountAllOb : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(`obs`.`id_ob`) AS num FROM `observers` obs, `organisaition` org WHERE org.`status` =1 AND obs.`status` =1 AND `type` IN(1,2,3) AND obs.`registration_org` = org.`id_org`',  function(err, result) {
        conn.release();
        if(err) {
          cb(err);
        } else {
          cb(result);
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
