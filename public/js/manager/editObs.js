$(document).ready(function() {

  var defaults = {
    disabled: true,
  };

  $.extend($.fn.editable.defaults, defaults);
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#obs .editable').editable('toggleDisabled');
  });
  
  
  $('#name').editable({
    url: '/manager/editObs_name/',
    type: 'text',
    pk: 1,
    name: 'name',
    title: 'Enter name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اﻹسم';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفين";
    }
  });
  
  $('#pass_nid').editable({
    url: '/manager/editObs_pass_nid/',
    type: 'text',
    pk: 1,
    name: 'pass_nid',
    title: 'Enter pass_nid',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال الرقم الوطني / جواز سفر';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 ارقام";
    }
  });
  
  $('#email').editable({
    url: '/manager/editObs_email/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال البريد اﻹلكتروني';
      if(v.length<5) return "يجب أن يكون البريد اﻹلكتروني أكثر من 7 حروف";
    }
  });
  
  $('#phone_obs').editable({
    url: '/manager/editObs_phone_obs/',
    type: 'text',
    pk: 1,
    name: 'phone_obs',
    title: 'Enter phone',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون رقم الهاتف أكثر من 9 أرقام ";
    }
  });
  
});
