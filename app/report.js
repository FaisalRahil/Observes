var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');
exports.reportMgr = {
  getAllObsAndOrg : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT *,`org`.`email` AS email_org ,`obs`.`email` AS email_obs,`org`.`id_office` AS id_office_org,`obs`.`creation_date` AS cd FROM `organisaition` org, `observers` obs WHERE `org`.`id_org` = `obs`.`registration_org`;',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getAllObsAndOrgtype : function(type,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT *,`org`.`email` AS email_org ,`obs`.`email` AS email_obs FROM `organisaition` org, `observers` obs WHERE  `org`.`id_org` = `obs`.`registration_org` AND `org`.`type`=?;',[type],  function(err, result) {
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
      conn.query('SELECT count(*) AS num,`org`.`type` FROM `observers` obs,`organisaition` org WHERE `org`.`id_org`=`obs`.`registration_org` AND `obs`.`status`=1  group by `org`.`type` ', function(err, result) {
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
      conn.query('SELECT count(*) AS num,`org`.`type`,`obs`.`id_office` FROM `observers` obs,`organisaition` org WHERE `org`.`id_org`=`obs`.`registration_org` AND `obs`.`status`=1 group by `obs`.`id_office`,`org`.`type` ', function(err, result) {
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
      conn.query('SELECT COUNT( * ) AS man FROM  `observers` obs WHERE  `obs`.`gender` =1 AND `obs`.`status`=1 ; SELECT COUNT( * ) AS woman FROM  `observers` obs WHERE  `obs`.`gender` =0 AND `obs`.`status`=1;',function(err, result) {
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
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
      });
    });
  },
  obsBytype : function(type,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `org`.*,COUNT(obs.id_ob) AS ObsCount FROM `organisaition` as `org` LEFT JOIN `observers` as `obs` ON(`obs`.`registration_org` = `org`.`id_org` AND `obs`.`status`=1) where `org`.`status` =1 AND `org`.`type`=? GROUP BY (org.`id_org`)',type,function(err, result) {
          conn.release();
          if(err) {
            util.log(err);
          } else {
            cb(result);
          }
      });
    });
  },
  statisticsOfficesByTypeGender :function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(*) AS num,`org`.`type`,`obs`.`id_office`,`obs`.`gender` FROM `observers` obs,`organisaition` org WHERE `org`.`id_org`=`obs`.`registration_org` AND `obs`.`status`=1    group by `obs`.`id_office`,`org`.`type`,`obs`.`gender`', function(err, result) {
         conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getOrgObszip : function(id_org,cb){ //get observers in organisaitions
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT count(*) AS num,`obs`.`id_office`,`org`.`name_org` FROM `observers` obs,`organisaition` org WHERE `org`.`id_org`=`obs`.`registration_org` AND `obs`.`status`=1 AND `org`.`id_org` = ? group by `obs`.`id_office`  ', id_org,  function(err, result) {
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