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

  // getAllNoOfLocaleObs : function(cb){
  //   mysqlMgr.connect(function (conn) {
  //     conn.query('SELECT COUNT(*) ,`id_office` FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',4,  function(err, result1) {
  //       conn.query('SELECT COUNT(*) ,`id_office` FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',5,  function(err, result2) {
  //         conn.query('SELECT COUNT(*),`id_office` FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? GROUP BY `obs`.`id_office`;',6,  function(err, result3) {
  //           conn.release();
  //           if(err) {
  //             util.log(err);
  //           } else {
  //             cb(result1,result2,result3);
  //           }
  //         });
  //       });
  //     });
  //   });
  // },

  getAllNoOfLocaleObs : function(cb){
    mysqlMgr.connect(function (conn) {
      var type=[1,2,3,4,5,6];
      var array=[];
      var t=0;
      for(var i=0;i<6;i++){
      conn.query('SELECT `org`.`id_org` FROM `organisaition` org WHERE `org`.`type` = ?;',type[i],  function(err, result1) {
        t++;
        array.push({type:t,id_org:result1});
        if(t==6){
          console.log(array[0]);
          console.log(array[1]);
          console.log(array[2]);
          console.log(array[3]);
          console.log(array[4]);
          console.log(array[5]);
        conn.query('select id_office from observers where registration_org in ('+[1444208440255]+')', function(err, result2) {
          console.log(result2);
        });



      }
        /* conn.query('SELECT `org`.`id_org` FROM `organisaition` org WHERE `org`.`type` = ?;',type[i],  function(err, result1) {

        });*/
      });

      }
    });
  },

};