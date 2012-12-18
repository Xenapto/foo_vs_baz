var FooVsBaz = FooVsBaz || {};
FooVsBaz.pages = FooVsBaz.pages || {};
FooVsBaz.pages_new = FooVsBaz.pages_new || {};
FooVsBaz.pages_edit = FooVsBaz.pages_edit || {};

FooVsBaz.pages_new.init =
  FooVsBaz.pages_new.init =
  function(){ FooVsBaz.pages.form_init(); }

FooVsBaz.pages.form_init = function(){
  $('#your_vote input').change(function(){
    $('#your_vote label').removeClass('active')
    $(this).closest('label').addClass('active')
  });
}
