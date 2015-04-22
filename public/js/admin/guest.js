$(document).ready(function() {
  $.get('/admin/getGuest',function(result){
    $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getGuest',
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
          title: 'اسم الضيف'
      }],
      data: result,
    });
  });

////////////////////////////

  $("#guest").validate({
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
