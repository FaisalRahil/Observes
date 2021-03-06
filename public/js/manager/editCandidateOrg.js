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

  $('#table').bootstrapTable({
      method: 'get',
      url: '/manager/getOb6',
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
          title: 'مدير',
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editAgentObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteObs" data-toggle="modal" href="#deleteObsModule" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
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
    $('#director').checkboxpicker({
    onLabel:"لا", offLabel:"نعم"
  });

  $('#gender').checkboxpicker({
    onLabel:"أنثى", offLabel:"ذكر"
  });

  $("#agent").validate({
    rules:{
      name:{
        required: true,
      },
      pass_nid:{
        required: true,
      },
      registration_org:{
        required: true,
      },
      phone_obs:{
        required: true,
        number: true,
      },
      email:{
        required : true,
        email : true
      }
    },
    messages:{
      name:{
        required: "الرجاء إدخال اﻹسم !",
      },
      pass_nid:{
        required: "الرجاء إدخال رقم الهوية !",
      },
      email:{
        required: "الرجاء إدخال البريد اﻹلكتروني !",
        email: "هذا ليس بريد إلكتروني !",
      },
      phone_obs:{
        required: "الرجاء إدخال رقم الهاتف !",
        number: "الرجاء ادخال رقم الهاتف ",
      },
      registration_org:{
        required: "الرجاء اختيار المرشح !",
      }  
    },
  });
  $('body').on('click', '#deleteObs ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to orgTable needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/manager/delObs/'+id, function(result){
      window.location.href="/manager/org/candidate";
    });
  });
  
});
