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

  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
  
  if(qs["msg"]==0){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> يوجد خطا في الاتصال </p>"
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
        enter: 'animated bounceIn',
        exit: 'animated bounceOut',
      },
    });
    var pageUrl = '/manager/org'
    window.history.pushState("","",pageUrl);
  }else if(qs["msg"]==1){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> لا توجد بيانات جديدة </p>"
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
        enter: 'animated bounceIn',
        exit: 'animated bounceOut',
      },
    });
    var pageUrl = '/manager/org'
    window.history.pushState("","",pageUrl);
  }else if(qs["msg"]==2){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>:</strong> تم التحميل بنجاح </p>"
      },{
      type: 'success',
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated bounceIn',
        exit: 'animated bounceOut',
      },
    });
    var pageUrl = '/manager/org'
    window.history.pushState("","",pageUrl);
  }


});
