$(document).ready(function() {
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
              '<a id="viewGuest" class="btn btn-xs btn-primary" href="/admin/editOrgs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteGuest" data-toggle="modal" href="#deleteGuest_href" class="btn btn-xs btn-danger" value="'+value+'" href="deleteGuest"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  /* Go to media needs view or edit */
  $('body').on('click', '#deleteGuest ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to media needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/delOrg/'+id, function(result){
      window.location.href="/admin/org/guest";
    });
  });
////////////////////////////

  $("#guest").validate({
    rules:{
      name_org:{
        required: true,
      },
    },
    messages:{
      name_org:{
        required: "الرجاء إدخال أسم الضيف",
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
