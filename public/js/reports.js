$(document).ready(function(){
  // $("#reports").validate({
  //   ignore: ':not(select:hidden, input:visible, textarea:visible)',
  //   rules:{
  //     obsByNationality:{
  //       required: true,
  //     }
  //   },
  //   invalidHandler: function(event, validator) {
  //     var errors = validator.numberOfInvalids();
  //     if (errors) {
  //       custNotify("danger","خطأ","الرجاء اختيار بيانات المراقبين حسب الجنسية","warning-sign","bounceIn","bounceOut");
  //     }
  //   },
  // });

  $("#reportN").validate({
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
  $("#reportM").validate({
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
  // $('#natbtn').on('click', function (e) {
  //   e.preventDefault();
  //   var isvalidate=$("#reports").valid();
  //   if(isvalidate){
  //     var win = window.open("/reports/obsByNationality/"+$('#nat').val(), '_blank');
  //     win.focus();
  //   }
  // });
  $('#typebtnN').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#reportN").valid();
    if(isvalidate){
      var win = window.open("/reports/obsByType/"+$('#obsByTypeN').val(), '_blank');
      win.focus();
    }
  });
  $('#typebtnM').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#reportM").valid();
    if(isvalidate){
      var win = window.open("/reports/obsByType/"+$('#obsByTypeM').val(), '_blank');
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
  $("#norgform").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      orgobsN:{
        required: true,
      }
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء اختيار المنظمة","warning-sign","bounceIn","bounceOut");
      }
    },
  });
  $("#morgform").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      orgobsM:{
        required: true,
      }
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء اختيار المنظمة","warning-sign","bounceIn","bounceOut");
      }
    },
  });
  $('#orgbtnN').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#norgform").valid();
    if(isvalidate){
      var win = window.open("/reports/orgObs/"+$('#orgobsN').val(), '_blank');
      win.focus();
    }
  });
  $('#orgbtnM').on('click', function (e) {
    e.preventDefault();
    var isvalidate=$("#morgform").valid();
    if(isvalidate){
      var win = window.open("/reports/orgObs/"+$('#orgobsM').val(), '_blank');
      win.focus();
    }
  });
});