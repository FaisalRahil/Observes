$(document).ready(function(){

  $('body').on('click', '#btnSubmit', function (e) {
    e.preventDefault();
    $('#formTrn').submit();
  });

  $("#formTrn").submit(function(e) {
    // var isvalidate=$("#formTrn").valid();
    // isvalidate=true;
    // if(isvalidate){
      $.post("/admin/moveOrg", $("#formTrn").serializeObject(), function(data, error){

        if(data!=false){
             $.notify({
              message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تم التعديل بنجاح </p>"
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
                enter: 'animated bounceInDown',
                exit: 'animated bounceOutUp'
              },
            });
       
          }
       });
      return false;
  });
  
  
});
