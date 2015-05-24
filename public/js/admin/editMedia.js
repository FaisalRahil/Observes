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
      if(!v) return 'الرجاء ادخال رقم الاشهار';
      if(v.length<5) return "يجب أن يكون رقم الاشهار اكثر من رقمين";
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
    validate: function(v) {
      if(!v) return 'الرجاء ادخال العنوان';
      if(v.length<5) return "يجب أن يكون العنوان أكثر من 5 حروف";
    }
  });
  
  $('#phone').editable({
    url: '/admin/editOrg_phone/',
    type: 'text',
    pk: 1,
    name: 'phone',
    title: 'Enter center phone',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال رقم الهاتف';
      if(v.length<10) return "يجب أن يكون رقم الهاتف على الاقل 10 ارقام";
    }
  });


  $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getObs',
      cache: false,
      height: 400,
      striped: true,
      pagination: true,
      pageSize: 50,
      silent: true,
      pageList: [10, 25, 50, 100],
      search: true,
      showColumns: true,
      showRefresh: true,
      minimumCountColumns: 2,
      clickToSelect: true,
      columns: [{
          field: 'name',
          sortable:true,
          title: 'اﻹسم'
      }, {
          field: 'pass_nid',
          sortable:true,
          title: 'رقم الهوية'
      }, {
          field: 'name_org',
          sortable:true,
          title: 'اسم المنظمة'
      }, {
          field: 'phone_obs',
          sortable:true,
          title: 'رقم الهاتف'
      }, {
          field: 'director',
          align: 'center',
          valign: 'middle',
          title: 'المدير',
          formatter: status
      }, {
          field: 'print',
          align: 'center',
          valign: 'middle',
          title: 'حالة الطباعة',
          formatter: status
      }, {
          field: 'id_ob',
          align: 'center',
          valign: 'middle',
          title: 'عرض',
          formatter: operateFormatter
      }, {
          field: 'id_ob',
          align: 'center',
          valign: 'middle',
          title: 'مسح',
          formatter: operateFormatter1
      }],
    });
  
    function operateFormatter(value, row, index) {
    return  [
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteOrg" data-toggle="modal" href="#deleteOrgModule" class="btn btn-xs btn-danger" value="'+value+'" href="deleteOrg"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

    function status(value, row, index) {
      if (value == 1){
        return  [
              '<i class="glyphicon glyphicon-ok"></i>'
            ].join('');
      } 
      else {
        return  [
              ''
            ].join('');
      }
  }

});
