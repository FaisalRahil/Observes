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

  appNoOfInternationalObs : function(cb){
    mysqlMgr.connect(function (conn) {
      // select ob.id_office,org.type from observers as ob,organisaition as org where org.type in (1,2,3,4,5,6) and org.id_org = ob.registration_org order by org.type
      conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? ;',4,  function(err, result1) {
        conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ?;',5,  function(err, result2) {
          conn.query('SELECT COUNT(*) FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org` AND `org`.`type` = ? ;',6,  function(err, result3) {
            conn.release();
            if(err) {
              util.log(err);
            } else {
              console.log("result1,result2,result3");
              console.log(result1,result2,result3);
              console.log("result1,result2,result3");
              cb(result1,result2,result3);
            }
          });
        });
      });
    });
  },

  getAllNoOfLocaleObs : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('select ob.id_office,org.type from observers as ob,organisaition as org where org.type in (1,2,3,4,5,6) and org.id_org = ob.registration_org order by org.type', function(err, result1) {
        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==1){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr1=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr1.push({id_office:typeOffice1[i],number:c})
        }
        }

        



        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==2){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr2=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr2.push({id_office:typeOffice1[i],number:c})
        }
        }




        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==3){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr3=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr3.push({id_office:typeOffice1[i],number:c})
        }
        }



        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==4){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr4=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr4.push({id_office:typeOffice1[i],number:c})
        }
        }



        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==5){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr5=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr5.push({id_office:typeOffice1[i],number:c})
        }
        }



        var typeOffice1=[];
        var not=[];
        for(var i=0;i<result1.length;i++){
          if(result1[i].type==6){
            typeOffice1.push(result1[i].id_office);
          }
        }
        var arr6=[];
        for(var i=0;i<typeOffice1.length;i++){
           var x=true;
           for(var l=0;l<not.length;l++){
            if(not[l]==typeOffice1[i]){
              x=false
            }
          }
          var c=0;
          if(x){
          for(var j=i;j<typeOffice1.length;j++){
            if(typeOffice1[i]==typeOffice1[j]){
              c++;
            }
          }
          not.push(typeOffice1[i]);
          arr6.push({id_office:typeOffice1[i],number:c})
        }
        }
          conn.release();
            if(err) {
              util.log(err);
            } else {
              cb(arr1,arr2,arr3,arr4,arr5,arr6);
            }
    });
  });
  },
  statisticsOfficesByType :function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(*) AS num,`org`.`type`,`obs`.`id_office` FROM `observers` obs,`organisaition` org WHERE `org`.`id_org`=`obs`.`registration_org` group by `obs`.`id_office`,`org`.`type` ', function(err, result) {
         conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  noOfWomenAndMen : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT COUNT( * ) AS man FROM  `observers` obs WHERE  `obs`.`gender` =1 LIMIT 0 , 30; SELECT COUNT( * ) AS woman FROM  `observers` obs WHERE  `obs`.`gender` =2 LIMIT 0 , 30;',function(err, result) {
        console.log(result[0][0].man);
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
      });
    });
  },
  obsByNationality : function(nat,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  `observers`.`name`, `observers`.`nationality`,`observers`.`registration_org`, `observers`.`status` , `organisaition`.`id_org` , `organisaition`.`type` FROM `observers`  LEFT JOIN  `organisaition` ON `observers`.`registration_org`=`organisaition`.`id_org` WHERE  `observers`.`status` = 1 && `observers`.`nationality`=?',nat,function(err, result) {
        console.log("is");
        console.log(result[0]);
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