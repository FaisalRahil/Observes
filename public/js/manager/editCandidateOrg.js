$(document).ready(function() {

  var defaults = {
    disabled: true,
  };

  
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#obs .editable').editable('toggleDisabled');
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
      if(!v) return 'الرجاء ادخال الرقم الوطني / جواز سفر';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 ارقام";
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
      if(v.length<5) return "يجب أن يكون البريد اﻹلكتروني أكثر من 7 حروف";
    }
  });
  
  $('#phone').editable({
    url: '/manager/editObs_phone/',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter phone',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون رقم الهاتف أكثر من 9 أرقام ";
    }
  });

  $('#address').editable({
    url: '/manager/editOrg_address/',
    type: 'text',
    pk: 1,
    name: 'address',
    title: 'Enter address',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون رقم الهاتف أكثر من 9 أرقام ";
    }
  });
  
});
