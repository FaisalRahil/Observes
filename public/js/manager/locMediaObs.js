$(document).ready(function() {
    $('#table').bootstrapTable({
      method: 'get',
      url: '/manager/getOb',
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editMediaObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
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

  /* Go to orgTable needs view or edit */
  $('body').on('click', '#deleteObs ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to orgTable needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/manager/delObs/'+id, function(result){
      window.location.href="/manager/obs/locMedia";
    });
  });

  // $(':checkbox').checkboxpicker();
  $('#director').checkboxpicker({
    onLabel:"لا", offLabel:"نعم"
  });

  $('#gender').checkboxpicker({
    onLabel:"أنثى", offLabel:"ذكر"
  });
  
  $("#natMediaObs").validate({
    rules:{
      name:{
        required: true,
      },
      pass_nid:{
        required: true,
      },
      registration_no:{
        required: true,
      },
      phone:{
        required: true,
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
      phone:{
        required: "الرجاء إدخال رقم الهاتف !",
      },
      registration_no:{
        required: "الرجاء إدخال الرقم اﻹشهار !",
      }  
    },
  });

});
