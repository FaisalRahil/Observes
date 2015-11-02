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
      var win = window.open("/reports/obsByNationality/"+$('#obsByNationality').val(), '_blank');
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
});