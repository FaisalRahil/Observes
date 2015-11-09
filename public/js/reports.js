$(document).ready(function(){
  $("#reports").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      obsByNationality:{
        required: true,
      }
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء اختيار بيانات المراقبين حسب الجنسية","warning-sign","bounceIn","bounceOut");
      }
    },
  });

  $("#report").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      obsByType:{
        required: true,
      }
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء اختيار بيانات المراقبين حسب النوع","warning-sign","bounceIn","bounceOut");
      }
    },
  });
  $('#natbtn').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#reports").valid();
    if(isvalidate){
      alert($('#nat').val());
      var win = window.open("/reports/obsByNationality/"+$('#nat').val(), '_blank');
      win.focus();
    }
  });
  $('#typebtn').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#report").valid();
    if(isvalidate){
      var win = window.open("/reports/obsByType/"+$('#obsByType').val(), '_blank');
      win.focus();
    }
  });
  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  if(qs["msg"]==1){
    custNotify("danger","خطأ","لا توجد بيانات","warning-sign","bounceIn","bounceOut");
    var pageUrl = '/reports'
    window.history.pushState("","",pageUrl);
  }
});