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
      }, {
        field: 'id_ob',
        align: 'center',
        valign: 'middle',
        // checkbox:true,
        title: '<button id="print" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-plus"></span><span class="text-none"> الطباعة</span></button>',
        formatter: operateFormattercheckbox
    }],
    });
  function operateFormattercheckbox(value, row, index) {
    return  [
              '<input name="id_print" type="checkbox" value="'+value+'">'
            ].join('');
  }  
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
  $('body').on('click', '#print', function (e) {
    e.preventDefault();
    $('#formprint').submit();
  });

  $("#formprint").submit(function(e) {
    e.preventDefault();
    $.post("/manager/printloc", $("#formprint").serialize(),function(data){

    });
   
  });
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
  $('#director').prop('disabled',true);
  $('#director').checkboxpicker({
      onLabel:"نعم", offLabel:"لا"
    });
  $('#registration_org').on('change',function(){
      $.get('/admin/checkDir/'+$('#registration_org').val(), function(result){
        if(result){
          $('#director').prop('disabled',false);
        }else{
          $('#director').prop('disabled',true);
        }
      });
    });

  $('#gender').checkboxpicker({
    onLabel:"أنثى", offLabel:"ذكر"
  });
  $.validator.addMethod("selectValidat", function (value) {
    return (value != '-1');
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
        selectValidat: true,
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
      registration_no:{
        required: "الرجاء إدخال الرقم اﻹشهار !",
      }  
    },
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated shake');
      });
    },
  });

});
