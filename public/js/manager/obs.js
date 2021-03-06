$(document).ready(function() {
  $('#table').bootstrapTable({
    method: 'get',
    url: '/manager/getAllObsAndNameOrg',
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
        field: 'gender',
        sortable:true,
        title: 'الجنس',
        formatter:gender
    }, {
        field: 'phone',
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
    }],
  });


  function operateFormatter(value, row, index) {
    return  [
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteObs" data-toggle="modal" href="#deleteObsModule" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  function gender(value, row, index) {
    if(value==1){
      var gender="ذكر";
    }else{
      var gender="أنثى";
    }
    return  [gender].join('');
  }

  /* Go to orgTable needs view or edit */
  $('body').on('click', '#deleteObs ', function () {
    var id = $(this).val();
    $('#confdelete').val(id);
  });

  /* Go to orgTable needs view or edit */
  $('#confdelete').click(function() {
    var id = $(this).val();
    $.get('/admin/delObs/'+id, function(result){
      window.location.href="/manager/obs/";
    });
  });

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

});
