$(document).ready(function () {
    
    //Click al botón de Guardar
    $("#addProductFormSubmit").click(function (e) {
        var boton = document.getElementById("addProductFormSubmit");
        boton.disabled = true;

        (async () => {
            try {
                envio = await ajaxEnvio(
                    "/formAddProduct",
                    "POST",
                    $(this)
                );
        
                envio == 0 ? (boton.disabled = false) : "";
            } catch (error) { }
        })()
    })
})