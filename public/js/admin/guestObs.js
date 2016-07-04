$(document).ready(function() {
  $.nat = new Array();
  $.get('/admin/nationality/', function(result){
      i=0;
      for(key in result){
      var k = new Object({id : i,value : key, text : result[key]});
      i++;
      $.nat.push(k);
    }
    });
  $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getGuestObs',
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
        title: 'الجنسية',
        formatter:nationality
    }, {
        field: 'phone_obs',
        sortable:true,
        title: 'رقم الهاتف'
    },
    //  {
    //     field: 'director',
    //     align: 'center',
    //     valign: 'middle',
    //     title: 'مدير',
    //     formatter: status
    // },
     {
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
              '<a id="viewMedia" class="btn btn-xs btn-primary" href="/admin/editGuestObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteGuest" data-toggle="modal" href="#deleteGuestObsModule" class="btn btn-xs btn-danger" value="'+value+'" href="deleteOrg"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }
  $('body').on('click', '#print', function (e) {
    e.preventDefault();
    $('#formprint').submit();
  });

  $("#formprint").submit(function(e) {
    e.preventDefault();
    var id = $("#formprint").serialize();
    $.post("/admin/printnat", $("#formprint").serialize(),function(data){

    });
   
  });
  /* Go to media needs view or edit */
  $('body').on('click', '#deleteGuest ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to media needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/delObs/'+id, function(result){
      window.location.href="/admin/obs/guestObs";
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
  function nationality(value, row, index) {
    console.log($.nat);
    return  [
            $.nat[value-1].text.name
          ].join('');
  }


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

////////////////////////////

  $("#guestObsId").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      name:{
        required: true,
      },
      email:{
        required: true,
        email: true,
      },
      phone_obs:{
        required: true,
        minlength: 10,
        number: true,
      },
      registration:{
        required : true,
      },
      nationality:{
        required: true,
      },
      pass_nid:{
        required : true,
        maxlength: 13,
      },
    },
    messages:{
      name:{
        required: "الرجاء إدخال أسم المراقب",
      },
      email:{
        required: "الرجاء إدخال البريد الالكتروني",
        email: "يجب أن تكون صيغة البريد الالكتروني صحيحه",
      },
      phone_obs:{
        required: "يجب إدخال رقم الهاتف",
        minlength: "يجب أن تكون المدخلات على الاقل 10 أرقام ",
        number: "يجب أن تكون المدخلات أرقام ",
      },
      registration:{
        required:"الرجاء إختيار المنظمة التابعة لها",
      },
      nationality:{
        required: "الرجاء إختيار الجنسية",
      },
      pass_nid:{
        required: "الرجاء إدخال رقم الهوية ",
        maxlength:"هذا الحقل لا يسمح بادخال اكثر من 13 الرمز"
      },
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
