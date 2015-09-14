var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.reportMgr = {
  getAllObsAndOrg : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT *,`org`.`email` AS email_org ,`obs`.`email` AS email_obs FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org`;',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getAllNoOfLocaleObs : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',4,  function(err, result1) {
        conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',5,  function(err, result2) {
          conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',6,  function(err, result3) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(result1,result2,result3);
            }
          });
        });
      });
    });
  },
  
};