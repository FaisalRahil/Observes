$(document).ready(function() {
  $.get('/admin/get',function(result){
    $('#table').bootstrapTable({
      method: 'get',
      url: '/admin/get',
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
          field: 'name_director:',
          sortable:true,
          title: 'اسم الرئيس'
      }, {
          field: 'center_type',
          sortable:true,
          title: 'Item Price'
      }],
      data: result,
    });
  });
});
