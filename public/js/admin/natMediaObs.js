$(document).ready(function() {
  $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getNatMediaObs',
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
        title: 'الاسم'
    }, {
        field: 'name_org',
        sortable:true,
        title: 'أسم المنظمة'
    }, {
        field: 'nationality',
        sortable:true,
        title: 'الجنسية'
    }, {
        field: 'phone',
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
              '<a id="viewMedia" class="btn btn-xs btn-primary" href="/admin/editNatMediaObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteMedia" data-toggle="modal" href="#deleteMediaObsModule" class="btn btn-xs btn-danger" value="'+value+'" href="deleteOrg"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  /* Go to media needs view or edit */
  $('body').on('click', '#deleteMedia ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to media needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/delObs/'+id, function(result){
      window.location.href="/admin/obs/natMediaObs";
    });
  });
  ///////////////////////////////////

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
  // $(':checkbox').checkboxpicker();
  $('#director').checkboxpicker({
    onLabel:"لا", offLabel:"نعم"
  });

  $('#gender').checkboxpicker({
    onLabel:"أنثى", offLabel:"ذكر"
  });
  $.validator.addMethod("selectValidat", function (value) {
    return (value != '-1');
  });

////////////////////////////

  $("#natMediaObsId").validate({
    rules:{
      name:{
        required: true,
      },
      email:{
        required: true,
        email: true,
      },
      phone:{
        required: true,
        minlength: 10,
        number: true,
      },
      registration_org:{
        required : true,
        number: true,
      },
      nationality:{
        required: true,
      },
      pass_nid:{
        required : true,
        number: true,
      },
    },
    messages:{
      name_org:{
        required: "الرجاء إدخال اسم المنظمه",
      },
      email:{
        required: "الرجاء إدخال الباريد الالكتروني",
        email: "يجب أن تكون صيغة الباريد الالكتروني صحيحه",
      },
      phone:{
        required: "يجب إدخال رقم الهاتف",
        minlength: "يجب أن تكون المدخلات على الاقل 10 أرقام ",
        number: "يجب أن تكون المدخلات أرقام ",
      },
      registration_no:{
        required: "الرجاء إدخال رقم الاشهار",
        number: "يجب أن تكون المدخلات أرقام ",
      },
      nationality:{
        required: "يجب إدخال رقم الهاتف",
      },
      pass_nid:{
        required: "الرجاء إدخال رقم الاشهار",
        number: "يجب أن تكون المدخلات أرقام ",
      },
    },
    highlight: function(element) {
      $(element).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated shake');
      });
    },
  });

});
