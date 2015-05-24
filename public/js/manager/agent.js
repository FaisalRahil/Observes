$(document).ready(function() {
    $('#table').bootstrapTable({
      method: 'get',
      url: '/manager/getOb6',
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
          title: 'اﻹسم'
      }, {
          field: 'pass_nid',
          sortable:true,
          title: 'رقم الهوية'
      }, {
          field: 'name_org',
          sortable:true,
          title: 'اسم المنظمة'
      }, {
          field: 'phone_obs',
          sortable:true,
          title: 'رقم الهاتف'
      }, {
          field: 'director',
          align: 'center',
          valign: 'middle',
          title: 'مدير',
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editAgentObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteObs" data-toggle="modal" href="#deleteObsModule" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }

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