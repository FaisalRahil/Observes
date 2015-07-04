$(document).ready(function() {

  var defaults = {
    disabled: true,
  };

  $.extend($.fn.editable.defaults, defaults);
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#obs .editable').editable('toggleDisabled');
  });
  
  $('#pass_nid').editable({
    url: '/admin/editObs_pass_nid/',
    type: 'text',
    pk: 1,
    name: 'pass_nid',
    title: 'Enter center pass_nid',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال الرقم الوطني أو رقم الجواز';
      if(v.length<5) return "يجب أن يكون الرقم الوطني أو رقم الجواز اكثر من رقمين";
    }
  });
  
  $('#name_obs').editable({
    url: '/admin/editObs_name_obs/',
    type: 'text',
    pk: 1,
    name: 'name_obs',
    title: 'Enter center name_obs',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم المراقب';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 حروف";
    }
  });
  
  $('#email').editable({
    url: '/admin/editObs_email/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
  });
  
  $('#phone').editable({
    url: '/admin/editObs_phone/',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter center phone',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون رقم الهاتف على الاقل 10 ارقام";
    }
  });

});
