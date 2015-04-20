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
          field: 'center_id',
          sortable:true,
          title: 'Item ID'
      }, {
          field: 'name',
          sortable:true,
          title: 'Item Name'
      }, {
          field: 'center_type',
          sortable:true,
          title: 'Item Price'
      }],
      data: result,
    });
  });
});
