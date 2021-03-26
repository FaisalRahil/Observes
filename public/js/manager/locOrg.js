$(document).ready(function () {
  $("#table").bootstrapTable({
    method: "get",
    url: "/manager/getOrg4",
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
    columns: [
      {
        field: "name_org",
        sortable: true,
        title: "اسم المنظمه",
      },
      {
        field: "name_director",
        sortable: true,
        title: "اسم الرئيس",
      },
      {
        field: "address",
        sortable: true,
        title: "العنوان",
      },
      {
        field: "registration_no",
        sortable: true,
        title: "رقم الاشهار",
      },
      {
        field: "email",
        sortable: true,
        title: "البريد الالكتروني",
      },
      {
        field: "phone",
        sortable: true,
        title: "رقم الهاتف",
      },
      {
        field: "id_org",
        align: "center",
        valign: "middle",
        title: "عرض",
        formatter: operateFormatter,
      },
      {
        field: "id_org",
        align: "center",
        valign: "middle",
        title: "مسح",
        formatter: operateFormatter1,
      },
    ],
  });

  function operateFormatter(value, row, index) {
    return [
      '<a id="viewOrg" class="btn btn-xs btn-primary" href="/manager/editLocOrg/' +
        value +
        '"><i class="glyphicon glyphicon-eye-open"></i></a>',
    ].join("");
  }

  function operateFormatter1(value, row, index) {
    return [
      '<button id="deleteOrg" data-toggle="modal" href="#deleteOrgModule" class="btn btn-xs btn-danger" value="' +
        value +
        '"><i class="glyphicon glyphicon-trash"></i></button>',
    ].join("");
  }

  /* Go to orgTable needs view or edit */
  $("body").on("click", "#deleteOrg ", function () {
    var id = $(this).val();
    $.get("/manager/checkOrg/" + id, function (result) {
      if (result) {
        $("#confdelete").val(id);
      } else {
        $("#mbody").empty();
        $("#mbody").append("<h2><p>لا يمكن المسح لوجود مراقبين</p></h2>");
        $("#confdelete").prop("disabled", true);
      }
    });
  });

  /* Go to orgTable needs view or edit */
  $("#confdelete").click(function () {
    var id = $(this).val();
    $.get("/manager/delOrg/" + id, function (result) {
      window.location.href = "/manager/org/locOrg";
    });
  });

  ////////////////////////////

  $("#natOrg").validate({
    rules: {
      name_org: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 10,
        number: true,
      },
      registration_no: {
        required: true,
      },
      name_director: {
        required: true,
      },
      address: {
        required: true,
      },
    },
    messages: {
      name_org: {
        required: "الرجاء ادخال اسم المنظمه",
      },
      email: {
        required: "الرجاء إدخال الباريد الالكتروني",
        email: "الرجاء إدخال الباريد الالكتروني بصورته الصحيحه",
      },
      phone: {
        required: "الرجاء إدخال رقم الهاتف",
        minlength: "يجب أن تكون المدخلات على الاقل 10 أرقام",
        number: "يجب أن تكون المدخلات أرقام",
      },
      registration_no: {
        required: "الرجاء إدخال رقم الاشهار",
      },
      name_director: {
        required: "الرجاء إدخال اسم مدير المنظمه",
      },
      address: {
        required: "الرجاء إدخال عنوان المنظمه ",
      },
    },
    errorClass: "custom-error",
    errorPlacement: function (error, element) {
      if ($(element).is("select")) {
        element.next().after(error);
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element) {
      $(element)
        .addClass("animated shake")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $(this).removeClass("animated shake");
          }
        );
    },
  });
  ///////////////////////
});
