var input, coordinatesAside, coordinatesMenu, widthMenu, observe, buttonName
var secondPath, cargaErr, cargaCor, errorArray, errorArray = [];
const split = "</&split&/>";

/*Funciones*/
async function ajaxEnvio(urlAjaxEnvio, typeAjaxEnvio, dataAjaxEnvio) {
  var formElement = dataAjaxEnvio.closest("form")[0];
  var formData = new FormData(formElement);

  return new Promise((resolve, reject) => {
    jQuery
      .ajax({
        url: urlAjaxEnvio,
        type: typeAjaxEnvio,
        data: formData,
        contentType: false,
        processData: false,
      })
      .done(function (response) {
        errorArray = response.split(split);

        errorArray[0] != "" ? showError(errorArray[0], errorArray[1]) : "";
        errorArray[0] != "" ? resolve(errorArray[0]) : "";
        if (
          errorArray[0] == 1 &&
          errorArray[3] != null &&
          errorArray[3] != ""
        ) {
          setTimeout(function () {
            document.location.href =
              errorArray[2] != "reload"
                ? errorArray[2]
                : document.location.href;
          }, errorArray[3]);
        }
      })
      .fail(function (response) {
        showError(0, "Ha ocurrido un error inesperado. Inténtelo más tarde");
        reject(0);
      });
  });
}

function showError(type, message) {
  if (type == 0) {
    $(".error").addClass("show");
    $(".exito").removeClass("show");
  } else if (type == 1) {
    $(".error").removeClass("show");
    $(".exito").addClass("show");
  }

  $(".error").html("");
  $(".error").html(message);
}