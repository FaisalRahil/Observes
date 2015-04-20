$(document).ready(function(){
  $("#addAdmin").validate({
    rules:{
      name:{
        required: true,
      },
      email:{
        required: true,
        email: true,
      },
      reEnterEmail:{
        required: true,
        email: true,
        equalTo: "#email",
      },
      password:{
        required : true,
        minlength: 5,
      },
      confirmPassword:{
        required : true,
        equalTo: "#password",
      },
      level: {
        required: true,
      },
    },
    messages:{
      name:{
        required: "Please enter the full name !",
      },
      email:{
        required: "Please enter the email address !",
      },
      reEnterEmail:{
        required: "Please Re-enter the email address !",
        equalTo: "Please enter the same email address again !",
      },
      password:{
        required: "Please enter the password !",
        minlength: "Should be your password at least 5 characters !",
      },
      confirmPassword:{
        required: "Please enter the confirm password !",
        minlength: "Should be your password at least 5 characters !",
      },
      level:{
        required: "Please choose the admin validity !",
      },
    },
    highlight: function(element) {
      $(element).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated shake');
      });
    },
  });
  // var form = $( "#addAdmin" );
  // form.validate();
  // $( "button" ).click(function() {
  //   $.notify({
  //       title: "<strong>Successful:</strong> ",
  //       message: "Add a new admin has successfully"
  //     },{
  //       type: 'danger',
  //       allow_dismiss: true,
  //       showProgressbar: false,
  //       placement: {
  //         from: 'top',
  //         align: 'center'
  //       },
  //       mouse_over: null,
  //       newest_on_top: true,
  //       animate: {
  //         enter: 'animated flipInY',
  //         exit: 'animated flipOutX'
  //       },
  //     });
  // });
});