$(document).ready(function() {
  $('#table').bootstrapTable({
    method: 'get',
    url: '/admin/getAllObs',
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
        title: 'اسم المنظمه'
    }, {
        field: 'nationality',
        sortable:true,
        title: 'الجنسيه'
    }, {
        field: 'pass_nid',
        sortable:true,
        title: 'رقم الجواز'
    }, {
        field: 'registration_org',
        sortable:true,
        title: 'المنظمه'
    }, {
        field: 'email',
        sortable:true,
        title: 'الباريد الالكتروني'
    }, {
        field: 'phone',
        sortable:true,
        title: 'رقم الهاتف'
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/admin/editOrg/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteOrg" data-toggle="modal" href="#deleteOrgModule" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  /* Go to orgTable needs view or edit */
  $('body').on('click', '#deleteOrg ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to orgTable needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/delObs/'+id, function(result){
      window.location.href="/admin/obs/";
    });
  });

});
