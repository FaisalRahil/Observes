$(document).ready(function() {

  var defaults = {
    disabled: true,
  };
  $.extend($.fn.editable.defaults, defaults);
  
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#orgTable .editable').editable('toggleDisabled');
  });
  
  
  $('#name_org').editable({
    url: '/manager/editOrg_name_org/',
    type: 'text',
    pk: 1,
    name: 'name_org',
    title: 'Enter name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اﻹسم';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفين";
    }
  });
  
  $('#name_director').editable({
    url: '/manager/editOrg_name_director/',
    type: 'text',
    pk: 1,
    name: 'name_director',
    title: 'Enter name director',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اﻹسم';
    }
  });
  
  $('#email').editable({
    url: '/manager/editOrg_email/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter email',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال البريد اﻹلكتروني';
      var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      var valid = emailReg.test(v);
      if(!valid) return 'هذا ليس بريد اليكتروني';
    }
  });
  
  $('#phone').editable({
    url: '/manager/editOrg_phone/',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
    validate: function(v) {
     var flag = /^[0-9\b]+$/.test(v);
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون الهاتف  لا يقل عن 10 ارقام";
      if(!flag) return "هذا ليس رقم هاتف";
    }
  });

  $('#address').editable({
    url: '/manager/editOrg_address/',
    type: 'text',
    pk: 1,
    name: 'address',
    title: 'Enter address',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال العنوان';
    }
  });
  
});
