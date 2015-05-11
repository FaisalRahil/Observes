$(document).ready(function() {

  var defaults = {
    disabled: true,
  };

  
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#media .editable').editable('toggleDisabled');
  });
  
  
  $('#registration_no').editable({
    url: '/admin/editOrg_registration_no/',
    type: 'text',
    pk: 1,
    name: 'registration_no',
    title: 'Enter center registration_no',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 حروف";
    }
  });
  
  $('#name_org').editable({
    url: '/admin/editOrg_name_org/',
    type: 'text',
    pk: 1,
    name: 'name_org',
    title: 'Enter center name_org',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 حروف";
    }
  });
  
  $('#name_director').editable({
    url: '/admin/editOrg_name_director/',
    type: 'text',
    pk: 1,
    name: 'name_director',
    title: 'Enter center name_director',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اسم الموظف';
      if(v.length<5) return "يجب أن يكون الاسم أكثر من 5 حروف";
    }
  });
  
  $('#email').editable({
    url: '/admin/editOrg_email/',
    type: 'text',
    pk: 1,
    name: 'email',
    title: 'Enter center email',
  });
  
  $('#address').editable({
    url: '/admin/editOrg_address/',
    type: 'text',
    pk: 1,
    name: 'address',
    title: 'Enter center address',
  });
  
  $('#phone').editable({
    url: '/admin/editOrg_phone/',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter center phone',
  });
  
});
