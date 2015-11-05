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
  $("#reports").validate({
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
    $('#view').on('input', function(){
      window.location.assign("http://localhost:3003/reports?obsByNationality/'"+(nat).value+"');
    });

});