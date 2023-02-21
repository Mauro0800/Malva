const formDelete = document.getElementById("form-delete");

formDelete.addEventListener("submit", function (event) {
  event.preventDefault();

  Swal.fire({
    title: "¿Estas seguro de eliminar este producto?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    imageUrl:
      "https://png.pngtree.com/png-vector/20190919/ourmid/pngtree-polygon-delete-icon-vectors-png-image_1739794.jpg",
    imageWidth: 200,
    imageHeight: 200,
    background: "#fff",
    /*  confirmButtonColor: 'red',
    cancelButtonColor: 'blue', */
    customClass: {
      confirmButton: "btn btn-outline-danger me-4",
      cancelButton: "btn btn-outline-primary",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Producto eliminado con éxito", "", "success", 2000);
      formDelete.submit();
    }
  });
});
