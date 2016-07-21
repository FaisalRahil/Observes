$(document).ready(function() {
  $.nat = new Array();

  var defaults = {
    disabled: true,
  };
  $.getJSON("/user_office", function( json ) {
    var i = 0;
    for(key in json){
      var k = new Object({id : i,value : json[key].office_id, text : json[key].office_name_ar});
      i++;
      $.nat.push(k);
    }
      
    $('#id_office').editable({
        url: '/id_office',
        source:$.nat,
        pk: 1,
        name: 'id_office',
        validate: function(v) {
          if(!v) return 'الرجاء اختيار صفة الموظف';
        }
    }); 
       
  });

  $.extend($.fn.editable.defaults, defaults);
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#obs .editable').editable('toggleDisabled');
  });
  
  $('#user_name').editable({
    url: '/user_name',
    type: 'text',
    pk: 1,
    name: 'user_name',
    title: 'Enter center user_name',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال أسم المستخدم';
    }
  });
  
  $('#first_name').editable({
    url: '/first_name',
    type: 'text',
    pk: 1,
    name: 'first_name',
    title: 'Enter center first_name',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال الأسم';
    }
  });

  $('#last_name').editable({
    url: '/last_name',
    type: 'text',
    pk: 1,
    name: 'last_name',
    title: 'Enter center last_name',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال اللقب';
    }
  });

  $('#password').editable({
    url: '/password',
    type: 'text',
    pk: 1,
    name: 'password',
    title: 'Enter center password',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال أسم المستخدم';
    }
  });

  
  $('#phone_no').editable({
    url: '/phone_no',
    type: 'text',
    pk: 1,
    name: 'phone_no',
    title: 'Enter center phone_no',
    validate: function(v) {
      if(!v) return 'الرجاء إدخال رقم الهاتف';
    }
  });

});
