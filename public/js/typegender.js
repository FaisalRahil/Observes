$(document).ready(function(){
  alert('data');
  $.get('http://localhost:3003/reports/typegender',function(data){
    sumAll=0;
    var html='';
    office=data.office;
    obj=data.obj;
    for(i in office){
      var sum = 0;
      html+='<tr><td colspan="2" style="background-color:#FFFFC2 !important;"> '+office[i].office_name_ar+' </td>';
      if(obj[office[i].office_id]!=undefined){
        for(k=4;k<7;k++){
          if(obj[office[i].office_id][k]!=undefined||obj[office[i].office_id][k]!=null){
            
            if(obj[office[i].office_id][k][1]!=null){
              // sum+=parseInt(obj[office[i].office_id][k][1]);
              html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][1]+' </td>'; 
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> - </td>';
            }
            if(obj[office[i].office_id][k][0]!=null){
              // sum+=parseInt(obj[office[i].office_id][k][0]);
              html+='<td style="background-color:#FFFFC2 !important;"> '+obj[office[i].office_id][k][0]+' </td>'; 
            }else{
              html+='<td style="background-color:#FFFFC2 !important;"> - </td>';
            }  
          }else{
            html+='<td style="background-color:#FFFFC2 !important;"> - </td><td style="background-color:#FFFFC2 !important;"> - </td>';
          }
        }
      html+='<td style="background-color:#F0F0EF !important;"> '+sum+' </td>';  
    }else{
      html+='<td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#FFFFC2 !important;"> - </td>\
      <td style="background-color:#F0F0EF !important;"> - </td>';
    }
    html+='</tr>';
    sumAll+=sum;
  }
  $('#tbody').append(html)
});

});