$(document).ready(function() {
  $.get('/admin/getNatOrg',function(result){
    $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getNatOrg',
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
          title: 'اسم المنظمه'
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
          title: 'الباريد الالكتروني'
      }, {
          field: 'phone',
          sortable:true,
          title: 'رقم الهاتف'
      }, {
          field: 'id_org',
          sortable:true,
          align: 'center',
          valign: 'middle',
          title: 'عرض',
          formatter: operateFormatter
      }, {
          field: 'id_org',
          sortable:true,
          align: 'center',
          valign: 'middle',
          clickToSelect: false,
          title: 'مسح',
          formatter: operateFormatter1
      }],
      data: result,
    });
  });

  function operateFormatter(value, row, index) {
    return  [
              '<button id="deleteOrg" class="btn btn-xs btn-primary" value="'+value+'"><i class="glyphicon glyphicon-eye-open"></i></button>'
            ].join('');
  }

  // $('body').on('click', '#deleteOrg ', function () {
  //   var id = $(this).data("value"); //  /admin/editOrg/4
  //   $.get('/admin/getPhoneManager/'+id, function(result){
  //     $('#body').empty();
  //     $('#emaill').empty();
  //     $('#emaill').append("<tr><td><strong>البريد الالكتروني </strong></td><td>"+result[0].email+"</td></tr>");
  //     for ( var i = 0; i < result.length;  i++ ) {
  //       $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td><td>"+result[i].p_type+"</td></tr>");
  //     } 
  //   });
  // });

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="viewOrg" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  // $('body').on('click', '#viewOrg ', function () {
    // var id = $(this).data("value");  //  /admin/editOrg/4
  //   $.get('/admin/getPhoneManager/'+id, function(result){
  //     $('#body').empty();
  //     $('#emaill').empty();
  //     $('#emaill').append("<tr><td><strong>البريد الالكتروني </strong></td><td>"+result[0].email+"</td></tr>");
  //     for ( var i = 0; i < result.length;  i++ ) {
  //       $('#body').append("<tr><td>"+result[i].phone_number+"</td><td>"+result[i].type+"</td><td>"+result[i].p_type+"</td></tr>");
  //     } 
  //   });
  // });

////////////////////////////

  $("#natOrg").validate({
    rules:{
      name_org:{
        required: true,
      },
      email:{
        required: true,
        email: true,
      },
      phone:{
        required: true,
      },
      registration_no:{
        required : true,
      },
      name_director:{
        required : true,
      },
      address: {
        required: true,
      },
    },
    messages:{
      name_org:{
        required: "Please enter the full name_org !",
      },
      email:{
        required: "Please enter the email !",
        email: "Please enter the email true !",
      },
      phone:{
        required: "Please enter your phone !",
      },
      registration_no:{
        required: "Please enter the registration_no !",
      },
      name_director:{
        required: "Please enter the name_director !",
      },
      address:{
        required: "Please enter your address !",
      },
    },
    highlight: function(element) {
      $(element).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated shake');
      });
    },
  });
///////////////////////



});
