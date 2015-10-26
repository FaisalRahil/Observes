$(document).ready(function() {
  $('#table').bootstrapTable({
    method: 'get',
    url: '/admin/getOrgsAdmin',
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/admin/editOrgs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
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
    $.get('/admin/getOrgObs/'+id, function(data){
      if(data.length==0){
        $.get('/admin/delOrg/'+id, function(result){
          window.location.href="/admin/org/";
        });
      }else{
       $.notify({
          title: "<strong>خطأ:</strong> ",
          message: "لا يمكن مسح المنضمة لوجود مراقبين"
        },{
          type: 'danger',
          allow_dismiss: true,
          showProgressbar: false,
          placement: {
            from: 'top',
            align: 'center'
          },
          mouse_over: null,
          newest_on_top: true,
          animate: {
            enter: 'animated flipInY',
            exit: 'animated flipOutX'
          },
        });
      } 
    });
  });

});
