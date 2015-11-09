$(document).ready(function() {

  var defaults = {
    disabled: true,
  };
  $.extend($.fn.editable.defaults, defaults);
  
  $("[name='discount_flag']").bootstrapSwitch('state', false);
  $("[name='discount_flag']").on('switchChange.bootstrapSwitch', function (e, data) {
    $('#orgTable .editable').editable('toggleDisabled');
  });
  
  registration_no
   $('#registration_no').editable({
    url: '/manager/editOrg_registration_no/',
    type: 'text',
    pk: 1,
    name: 'name_org',
    title: 'Enter name',
    validate: function(v) {
      if(!v) return 'الرجاء ادخال اﻹسم';
      if(v.length<2) return "يجب أن يكون الاسم أكثر من حرفين";
    }
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
  $('#table').bootstrapTable({
      method: 'get',
      url: '/manager/getObsIdOrg/'+$('#confdelete').data('id_o'),
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
          title: 'مندوب',
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editOrgObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteObs" data-toggle="modal" href="#" class="remove btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
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
 var ids;
  /* Go to orgTable needs view or edit */
  $('body').on('click', '#deleteObs ', function () {
    var id = $(this);
    $('#confdelete').val(id.val());
    var id_o=$('#confdelete').data('id_o');
    $('#deleteObsModule').modal('show');
    $('#confdelete').click(function() {
      $.get('/manager/delObs/'+id.val(), function(result){
        id.parents('tr').remove();        
      });
    });
  });

});
