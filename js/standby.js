$('#blah').hide();
$('#remove').hide();  
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        if( $('#imgInp').val()!=""){

            $('#remove').show();
            $('#blah').show('slow');
      }
        else{ $('#remove').hide();$('#blah').hide('slow');}
        readURL(this);
    });


$('#remove').click(function(){
          $('#imgInp').val('');
          $(this).hide();
          $('#blah').hide('slow');
 $('#blah').attr('src','http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/No_pub.svg/150px-No_pub.svg.png');
});

function readPath(input) {

  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function(){
  readPath(this);
});
