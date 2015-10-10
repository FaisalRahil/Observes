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
        


       /* var arr = [20]*[20];
        console.log(arr);
        for(var t=0;t<result1[0].length;t++){
          for(var i=1;i<=17;i++){
            for(var j=1;j<=6;j++){
              if(result1[0].id_office == i){
                if(result1[0].type == 1){
                  arr[i][j] = arr[i][j] + 1;
                }else if(result1[0].type == 2){
                  arr[i][j] = arr[i][j] + 1;
                }else if(result1[0].type == 3){
                  arr[i][j] = arr[i][j] + 1;
                }else if(result1[0].type == 4){
                  arr[i][j] = arr[i][j] + 1;
                }else if(result1[0].type == 5){
                  arr[i][j] = arr[i][j] + 1;
                }else if(result1[0].type == 6){
                  arr[i][j] = arr[i][j] + 1;
                }
              }
            }
          }
        }
        console.log("arr");
        console.log(arr);
        console.log("arr");*/
     

/*        t++;
        array.push({type:t,id_org:result1});
        if(t==6){
          console.log(array[0]);
          console.log(array[1]);
          console.log(array[2]);
          console.log(array[3]);
          console.log(array[4]);
          console.log(array[5]);
          console.log("***********");
         // console.log(array[0].id_org.length);
          for(var y=0;y<6;y++){
            var x=[];
            //console.log(array[y].id_org.length);
          for(var i=0;i<array[y].id_org.length;i++){
            x.push(array[y].id_org[i].id_org);
          }
        conn.query('select id_office from observers where registration_org in ('+x+')', function(err, result2) {
         m++;
         arrayy.push({type :m,id_office :result2})
        // console.log(arrayy[arrayy.length-1]);
         var www=arrayy[arrayy.length-1];
         console.log(www.ype);
         console.log(www.id_office);
        });
        }
      }   
    });
*/
      
    });
});
  },

};