const $ = (el) => document.querySelector(el);
const cardsContainer = $("#cards-container");
const clearCart = $("#clear-cart");
const btnBuy = $("#btn-buy");
const outputTotal = $("#output-total");
const URL_API_SERVER = "http://localhost:2023/api";

const getOrder = () => {
    return fetch(`${URL_API_SERVER}/cart/getOrderPending`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  
  const convertFormatPeso = (n) =>
    n.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

    const paintProducts = ({ products }) => {
        cardsContainer.innerHTML = "";
        if (products.length) {
          products.forEach(
            ({ name, image, Cart, id, price, discount }) => {
              const priceWithDiscount = discount
                ? price - (price * discount) / 100
                : price;
              const priceFormatARG = convertFormatPeso(priceWithDiscount);
              const template = `
              <article class="main__section__article-cart">
              <button onclick="removeProductToCart(${id})" class="main__section__article__button--trash"><i class="fa-solid fa-trash-can"></i></button>
              <div class="main__section__article__div--img">
                <img src="/images/products/${image}" alt="">
              </div>

              <div class="main__section__article__div--box2">
                <h2 class="main__section__article__h2--nombre">${name}</h2>

                <div class="contador-box">
                  <div class="main__section__article__div--contador">

                    <span class="main__section__article__div__span-left">
                      <button onclick="lessProduct(${id},${
          Cart.quantity
        })" class="main__section__article__div__button--menos">-</button>
                    </span>

                    <span class="main__section__article__div__button--numero">${Cart.quantity}</span>

                    <span class="main__section__article__div__span-right">
                      <button onclick="moreProduct(${id})" class="main__section__article__div__button--mas">+</button>
                    </span>

                  </div>
                </div>

                <p class="main__section__article__p--precio">${priceFormatARG}</p>
              </div>
            </article>`;
              cardsContainer.innerHTML += template;
            }
          );
          return;
        }
        cardsContainer.innerHTML = "<h1>No existen productos en el carrito</h1>";
      };





      const paintTotal = (n) => {
        outputTotal.textContent = convertFormatPeso(n);
      };
      
      window.addEventListener("load", async () => {
        try {
          const { ok, data } = await getOrder();
          if (ok) {
            paintProducts({ products: data.cart });
            paintTotal(data.total);
          }
          console.log(getOrder())
          console.log({ ok, data });
        } catch (error) {
          console.log(error);
        }
      });
      
      const moreProduct = async (id) => {
        const objProductId = {
          productId: id,
        };
        const { ok } = await fetch(`${URL_API_SERVER}/cart/moreQuantity`, {
          method: "PUT",
          body: JSON.stringify(objProductId),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      
        if (ok) {
          const { ok, data } = await getOrder();
          if (ok) {
            paintProducts({ products: data.cart });
            paintTotal(data.total);
          }
        }
      };
      
      const lessProduct = async (id, quantity) => {
        const objProductId = {
          productId: id,
        };
      
        if (quantity > 1) {
          const { ok } = await fetch(`${URL_API_SERVER}/cart/lessQuantity`, {
            method: "PUT",
            body: JSON.stringify(objProductId),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
      
          if (ok) {
            const { ok, data } = await getOrder();
            if (ok) {
              paintProducts({ products: data.cart });
              paintTotal(data.total);
            }
          }
        }
      };
      
      const removeProductToCart = async (id) => {
        try {
          const result = await Swal.fire({
            title: "¿Estas seguro de quitar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Quitar",
          });
      
          if (result.isConfirmed) {
            const objProductId = {
              productId: id,
            };
            const { ok } = await fetch(`${URL_API_SERVER}/cart/removeProduct`, {
              method: "DELETE",
              body: JSON.stringify(objProductId),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => res.json());
      
            if (ok) {
              const { ok, data } = await getOrder();
              if (ok) {
                paintProducts({ products: data.cart });
                paintTotal(data.total);
              }
      
              Swal.fire({
                title: "Producto eliminado del carrito",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      clearCart.addEventListener("click", async () => {
        try {
          const result = await Swal.fire({
            title: "¿Estas seguro de borrar todo el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Quitar",
          });
      
          if (result.isConfirmed) {
            const { ok } = await fetch(`${URL_API_SERVER}/cart/clearCart`, {
              method: "DELETE",
            }).then((res) => res.json());
      
            if (ok) {
              const { ok, data } = await getOrder();
      
              if (ok) {
                paintProducts({ products: data.cart });
                paintTotal(data.total);
              }
      
              Swal.fire({
                title: "Proceso completado",
                icon: "success",
                showConfirmButton: false,
                timer: 1400,
              })
            }
          }
        } catch (error) {
          console.log(error)
        }
      });
      
      btnBuy.addEventListener("click", async () => {
        const result = await Swal.fire({
          title: "¿Estas seguro realizar la compra?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
        });
      
        if (result.isConfirmed) {
          const { ok } = await fetch(`${URL_API_SERVER}/cart/statusOrder`, {
            method: "PUT",
            body: JSON.stringify({ status: "completed" }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
      
          let timerInterval;
          const result = await Swal.fire({
            title: "Procesando la compra",
            text: "Esperar mientras se realiza la compra",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
      
          if (result.dismiss === Swal.DismissReason.timer) {
            
            await Swal.fire({
              title: ok ? "Gracias por su compra" : "Upss hubo error",
              icon: ok ? 'success': 'error',
              showConfirmButton:false,
              timer:1000
            })
      
            ok && (location.href = "/")
      
          }
        }
      });

      