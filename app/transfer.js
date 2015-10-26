var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.trnMgr = {
  addTrn : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `transfer` SET ?',body,  function(err, result) {
        conn.query('UPDATE `observers` SET `registration_org`=? WHERE `registration_org`=?',[body.id_org_new,body.id_org_old],  function(err, result) {
          conn.query('UPDATE `organisaition` SET `status` = 0 WHERE `id_org` = ?',body.id_org_old,  function(err, result) {
            conn.query('UPDATE `transfer` SET `id_org_new` = ? WHERE `id_org_new` = ?',[body.id_org_new,body.id_org_old],  function(err, result) {
              conn.release();
              if(err) {
                cb(err);
              } else {
                cb(result);
              }
            });
          });
        });
      });
    });
  },

};
