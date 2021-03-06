$(document).ready(function() {
  $.nat = new Array();
  $.get('/admin/nationality/', function(result){
      i=0;
      for(key in result){
      var k = new Object({id : i,value : key, text : result[key]});
      i++;
      $.nat.push(k);
    }
  }); 
  $('#table').bootstrapTable({
    method: 'get',
    url: '/admin/getAllObsAndNameOrg',
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
        title: 'الجنسية',
        formatter: nationality
    }, {
        field: 'gender',
        sortable:true,
        title: 'الجنس',
        formatter:gender
    }, {
        field: 'phone',
        sortable:true,
        title: 'رقم الهاتف'
    }, 
    // {
    //     field: 'director',
    //     align: 'center',
    //     valign: 'middle',
    //     title: 'مدير',
    //     formatter: status
    // }, 
    {
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
              '<a id="viewOrg" class="btn btn-xs btn-primary" href="/admin/editObs/'+value+'"><i class="glyphicon glyphicon-eye-open"></i></a>'
            ].join('');
  }

  

  function operateFormatter1(value, row, index) {
    return  [
              '<button id="deleteObs" data-toggle="modal" href="#deleteObsModule" class="btn btn-xs btn-danger" value="'+value+'"><i class="glyphicon glyphicon-trash"></i></button>'
            ].join('');
  }
  function nationality(value, row, index) {
    return  [
            $.nat[value-1].text.name
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
      window.location.href="/admin/obs/";
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
