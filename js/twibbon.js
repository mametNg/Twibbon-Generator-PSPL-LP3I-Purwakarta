$(document).ready(function() {

  bsCustomFileInput.init();

  $("#my-caption").val(myCaption());

  $("#twibbon-technology").click(function() {
    openLoad();
    setFrame($("#twibbon-frame-technology").attr('src'));
  });

  $("#twibbon-business").click(function() {
    openLoad();
    setFrame($("#twibbon-frame-business").attr('src'));
  });

  $("#twibbon-finance").click(function() {
    openLoad();
    setFrame($("#twibbon-frame-finance").attr('src'));
  });

  $("#back-get-twibbon").click(function() {
    openGet();
  });

  $("#go-create-twibbon").click(function() {
    openCreate();
  });

  $("#back-load-twibbon").click(function() {
    openLoad();
  });

  $("#go-save-twibbon").click(function() {
    openDownload();
  });

  $("#back-to-create").click(function() {
    openCreate2();
  });

  $("#copyed-caption").click(function() {
    let allow = true;
    allow = filtName(`#fullname`, `#msg-fullname`);
    allow = filtName(`#school`, `#msg-school`);
    allow = filtName(`#motivation`, `#msg-motivation`);
    if (!allow) return false;
    $(".air-badge").html(airBadge("Copyed" , 'success'));
    copy('#my-caption');
  });

  $("#twibbon-file").change(function() {
    const myFile = $(this).prop('files')[0];

    if (imgExtension(myFile) == false ) {
      $(".air-badge").html(airBadge("The file must be an image!" , 'danger'));
      return false;
    }

    const reader = new FileReader();

    reader.onload = function() {
      const img = new Image;
      img.onload = function() {
        if (img.width > 5000 && img.height > 5000) {
          $(".air-badge").html(airBadge("Upload JPG or PNG image. 5000 x 5000 required!" , 'danger'));
          $("#preview-file").html('');
          $("#file-twb").val("");
          return false;
        }

        $("#preview-file").html('<img class="card-img-top" src="'+reader.result+'" alt="User Picture">');
        setProfile(reader.result);
      };

      img.onerror = function() {
        $(".air-badge").html(airBadge("Malicious files detected!" , 'danger'));
        $("#preview-file").html('');
        $("#file-twb").val("");
        return false;
      };
      img.src = reader.result;
    }

    reader.readAsDataURL(myFile);
  });

});