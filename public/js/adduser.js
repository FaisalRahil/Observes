$(document).ready(function(){
  $("#form").validate({
    rules: {
      user_name: {
        required: true,
        remote: {
          url :"/checkUser",
          type : "post",
          data: {
            user: function() {
              return $( "#user_name" ).val();
            }
          }
        }
      },
      first_name:{
        required: true
      },
      last_name:{
        required: true
      },
      email: {
        required: true,
        email: true,
      },
      phone_no: {
        required: true,
		    minlength: 10,
		    number: true,
      },
      password: {
        required: true,
      },
      password_confirmation: {
        required: true,
        equalTo: "#password"
      },
      id_office:{
        required: true
      }
    },

    messages: {
      user_name: {
        required: "الرجاء ادخال اسم المستخدم",
        remote: "هذا الاسم  تم تسجيله من قبل الرجاء اختيار اسم آخر"
      },
      first_name: {
        required: "الرجاء ادخال الاسم "
      },
      last_name: {
        required: "الرجاء ادخال اللقب "
      },
      email: {
        required: " هذا ليس بريد اليكتروني ",
        email: "هذا ليس بريد اليكتروني"
      },
      phone_no: {
        required: "الرجاء ادخال رقم الهاتف",
        minlength: " يجب أن يكون الهاتف لا يقل عن 10 ارقام ",
        number: "الرجاء ادخال رقم الهاتف ",
      },
      password: {
        required: "الرجاء ادخال الرمز البسري",
      },
      password_confirmation: {
        required: "الرجاء إدخال كلمة المور",
        equalTo: "يرجى إدخال كلمة المرور نفسها ."
      },
      id_office: {
        required: "الرجاء الاختيار ",
      }
    }
  });
});
