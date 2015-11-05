$(document).ready(function() {

  $('#gender').checkboxpicker({
    onLabel:"أنثى", offLabel:"ذكر"
  });
  $('#table').bootstrapTable({
      method: 'get',
      url: '/manager/getOrg6',
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
          field: 'name_org',
          sortable:true,
          title: 'اسم الرشح'
      }, {
          field: 'name_director',
          sortable:true,
          title: 'اسم الرئيس'
      }, {
          field: 'address',
          sortable:true,
          title: 'العنوان'
      }, {
          field: 'registration_no',
          sortable:true,
          title: 'رقم الاشهار'
      }, {
          field: 'email',
          sortable:true,
          title: 'البريد الالكتروني'
      }, {
          field: 'phone',
          sortable:true,
          title: 'رقم الهاتف'
      }, {
          field: 'id_org',
          align: 'center',
          valign: 'middle',
          title: 'عرض',
          formatter: operateFormatter
      }, {
          field: 'id_org',
          align: 'center',
          valign: 'middle',
          title: 'مسح',
          formatter: operateFormatter1
      }],
  });
  

  function operateFormatter(value, row, index) {
    return  [
              '<a id="viewMedia" class="btn btn-xs btn-primary" href="/manager/editCandidateOrg/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deletecan" data-toggle="modal" href="#deletecandidate" class="btn btn-xs btn-danger" value="'+value+'" href="deleteOrg"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  $('body').on('click', '#deletecan ', function () {
    var id = $(this).val();
    $.get('/manager/checkOrg/'+id, function(result){
      if(result){
        $('#confdelete').val(id);
      }else{
        $('#mbody').empty();
        $('#mbody').append("<h2><p>لا يمكن المسح لوجود مراقبين</p></h2>");
        $('#confdelete').prop('disabled', true);
      }
    });
  });

  /* Go to orgTable needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/manager/delOrg/'+id, function(result){
      window.location.href="/manager/org/candidate";
    });
  });


$("#candidate").validate({
    rules:{
      name_org:{
        required: true,
      },
      name_director:{
        required: true,
      },
      registration_no:{
        required: true,
      },
      address:{
        required: true,
      },
      phone:{
        required: true,
        number: true,
      },
      email:{
        required : true,
        email : true
      }
    },
    messages:{
      name_org:{
        required: "الرجاء إدخال اﻹسم !",
      },
      name_director:{
        required: "الرجاء إدخال اسم المدير !",
      },
      email:{
        required: "الرجاء إدخال البريد اﻹلكتروني !",
        email: "هذا ليس بريد إلكتروني !",
      },
      address:{
        required: "الرجاء إدخال العنوان !",
      },
      phone:{
        required: "الرجاء إدخال رقم الهاتف !",
        number: "الرجاء ادخال رقم الهاتف ",
      },
      registration_no:{
        required: "الرجاء ادخال رقم المترشح !",
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