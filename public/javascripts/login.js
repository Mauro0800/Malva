const $ = (id) => document.getElementById(id)
const email = $('email')
const password = $('password')

let regExLetter = /^[A-Z]+$/i;
let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

const msgError = (element, message, {target}) => {
    $(element).innerHTML = message
    target.classList.add('isInvalid')
}

const cleanError = (element, {target}) => {
    target.classList.remove('isInvalid')
    target.classList.remove('isValid')
    $(element).innerHTML = null
}

/* const verifyPass = async (email, password) => {
    try {
      let response = await fetch("/api/users/password", {
        method: "POST",
        body: JSON.stringify({
          email:email,
          password:password
        }),
        headers: {                                            EN MANTENIMIENTO(pero funciona)
          "Content-Type" : "application/json"
        }
        });
  
        let result = await response.json();
        console.log(result);
        return !result.data.password
    } catch (error) {
      console.error
    }
  } */


email.addEventListener('blur', function(e){
    
    switch (true) {
        case !this.value.trim():
            msgError('errorEmail', "El email es obligatorio", e)
            break;
        case !regExEmail.test(this.value.trim()):
            msgError('errorEmail', "Tiene que ser un email válido",e)
        break
        default:
            this.classList.add('isValid')
            break;
    }
  });

  email.addEventListener('focus', function(e) {
    cleanError('errorEmail', e)
  })

  password.addEventListener('blur', async function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorPass', "La contraseña es obligatoria", e)
            break;
        // case await verifyPass(email.value.trim(),this.value.trim()) :
        //   msgError('errorPass', "Credenciales inválidas", e)               EN MANTENIMIENTO(pero funciona)
        // break; 
        default:
            this.classList.add('isValid')
            break;
    }
  });

  password.addEventListener('focus', function(e) {
    cleanError('errorPass', e)
  })

  $('login__form').addEventListener('submit', function(e){
    e.preventDefault();

    let error = false

    for (let i = 0; i < this.elements.length -1; i++) {
        if(!this.elements[i].value.trim() || this.elements[i].classList.contains('isInvalid')) {
            error = true
        }
        
    }

    !error && this.submit()

  })