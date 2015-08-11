$(document).ready(function() {
 
    $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/getOrg',
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
              '<a id="vieworg" class="btn btn-xs btn-primary" href="/manager/editLocOrg/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteorg" data-toggle="modal" href="#deleteorgModule" class="btn btn-xs btn-danger" value="'+value+'" href="deleteOrg"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

  $('body').on('click', '#deleteorg ', function () {
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
      window.location.href="/manager/org";
    });
  });        
});
