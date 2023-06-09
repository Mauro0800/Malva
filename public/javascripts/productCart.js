const btnAddCart = document.querySelectorAll('.btn-addCart')
const URL_API_SERVER = "http://localhost:2023/api";

Array.from(btnAddCart).forEach(btn => {
  btn.addEventListener('click',async () => {
    const id = btn.getAttribute('data-id')
    try {
      const objProductId = {
        productId: id,
      };
      const { ok } = await fetch(`${URL_API_SERVER}/cart/addProduct`, {
        method: "POST",
        body: JSON.stringify(objProductId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    
      await Swal.fire({
        title: ok ? "Producto agregado al carrito" : "Debes iniciar sesión",
        icon: ok ? "success" : "warning",
        showConfirmButton: false,
        timer: 1200,
      });
    
      !ok && (location.href = "/users/login");
    } catch (error) {
      console.log(error);
    }
  })
})


