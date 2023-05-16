const $ = (id) => document.getElementById(id);
const name = $('name');
const surname = $('surname');
const email = $('email');
const password = $('password');
const password2 = $('password2');
const image = $('image');
const terms = $('terminos-condiciones');
const registerForm = $('registerForm');


let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/; // Mayúscula, número y 8 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;


const msgError = (element, message, { target }) => {
  $(element).innerHTML = message;
  target.classList.add('isInvalid');
};

const cleanError = (element, { target }) => {
  target.classList.remove('isInvalid');
  target.classList.remove('isValid');
  $(element).innerHTML = null;
};

const checkedFields = () => {
  const elements = $('registerForm').elements;
  $('errorCreate').innerHTML = null;

  for (let i = 0; i < elements.length - 2; i++) {
    if (elements[i].classList.contains('isInvalid')) {
      $('errorCreate').innerHTML = "Hay campos con errores o están vacíos.";
    }
  }
};

const verifyEmail = async (email) => {
  try {
    let response = await fetch('/api/users/verify-email', {
      method: 'POST',
      body: JSON.stringify({
        email: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let result = await response.json();
    return result.data.existUser
  } catch (error) {
    console.error
  }
}


// Nombre

$('name').addEventListener('blur', function (e) {
  switch (true) {
    case !this.value.trim():
      msgError('errorName', "El nombre es obligatorio", e);
      break;
    case this.value.trim().length < 2 || this.value.trim().length > 50:
      msgError('errorName', "El nombre debe tener un mínimo de 2 y un máximo de 50 caracteres", e);
      break;
    case !regExLetter.test(this.value.trim()):
      msgError('errorName', "Solo se aceptan caracteres alfabéticos", e);
      break;

    default:
      this.classList.add('isValid');
      checkedFields();
      break;
  }
});

$('name').addEventListener('focus', function (e) {
  cleanError('errorName', e);
});


// Apellido

$('surname').addEventListener('blur', function (e) {
  switch (true) {
    case !this.value.trim():
      msgError('errorSurname', "El apellido es obligatorio", e);
      break;
    case this.value.trim().length < 2 || this.value.trim().length > 50:
      msgError('errorSurname', "El apellido debe tener un mínimo de 2 y un máximo de 50 caracteres", e);
      break;
    case !regExLetter.test(this.value.trim()):
      msgError('errorSurname', "Solo se aceptan caracteres alfabéticos", e);
      break;

    default:
      this.classList.add('isValid');
      checkedFields();
      break;
  }
});

$('surname').addEventListener('focus', function (e) {
  cleanError('errorSurname', e);
});


// E-mail

$('email').addEventListener('blur', async function (e) {
  switch (true) {
    case !this.value.trim():
      msgError('errorEmail', "El e-mail es obligatorio", e);
      break;
    case !regExEmail.test(this.value.trim()):
      msgError('errorEmail', "Tiene que ser un e-mail válido", e);
      break;
    case await verifyEmail(this.value.trim()):
      msgError('errorEmail', "Este e-mail ya se encuentra registrado", e)
      break
    default:
      this.classList.add('isValid');
      checkedFields();
      break;
  }
});

$('email').addEventListener('focus', function (e) {
  cleanError('errorEmail', e);
});


// Contraseña

const exRegs = {
  exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /[0-9]/,
  exRegEsp: /[$@!%*?&_-]/,
  exRegMin: /.{8,}/,
  exRegMax: /.{13}/,
};

const validPassword = (element, exReg, value) => {
  if (!exReg.test(value)) {
    $(element).classList.add('text-danger');
  } else {
    $(element).classList.add('text-success');
    $(element).classList.remove('text-danger');
  }
};

const validMaxPassword = (element, exReg, value) => {
  if (exReg.test(value)) {
    $(element).classList.add('text-danger');
  } else {
    $(element).classList.add('text-success');
    $(element).classList.remove('text-danger');
  }
};

$('password').addEventListener('keyup', function () {
  validPassword('mayu', exRegs.exRegMayu, this.value);
  validPassword('minu', exRegs.exRegMinu, this.value);
  validPassword('num', exRegs.exRegNum, this.value);
  validPassword('esp', exRegs.exRegEsp, this.value);
  validPassword('min', exRegs.exRegMin, this.value);
  validMaxPassword('max', exRegs.exRegMax, this.value);
});

$('password').addEventListener('blur', function (e) {
  switch (true) {
    case !this.value.trim():
      msgError('errorPass', "La contraseña es obligatoria", e);
      break;
    case !regExPass2.test(this.value.trim()):
      msgError('errorPass', "La contraseña debe tener entre 8 y 12 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial", e);
      break;
    default:
      this.classList.add('isValid');
      checkedFields();
      break;
  }
});

$('password').addEventListener('focus', function (e) {
  cleanError('errorPass', e);
  $('msgPassword').hidden = false;
});

$('password2').addEventListener('blur', function (e) {
  switch (true) {
    case !this.value.trim():
      msgError('errorPass2', "Debes confirmar la contraseña", e);
      break;
    case this.value.trim() !== $('password').value.trim():
      msgError('errorPass2', "Las contraseñas no coinciden", e);
      break;
    case !regExPass2.test(this.value.trim()):
      msgError('errorPass2', "La contraseña debe tener entre 8 y 12 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial", e);
      break;
    default:
      this.classList.add('isValid');
      checkedFields();
      break;
  }
});

$('password2').addEventListener('focus', function (e) {
  cleanError('errorPass2', e);
});


// Imágen de perfil

const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

image.addEventListener('change', function (e) {
  
    if (!image) {
      this.classList.add('isValid');
      checkedFields();
    } else {
      switch (true) {
        case !regExExt.exec(this.value):
          this.classList.add('isInvalid');
          $('errorImage').innerHTML = "Solo se admiten imágenes en formato .jpg, .jpeg, .png, .gif y .webp"
          break;
        default:
          this.classList.remove('isInvalid');
          this.classList.add('isValid')
          $('errorImage').innerHTML = " "
          checkedFields()
          break;
      }
    }
  });
  
  


// Términos y condiciones

$('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let error = false;

  if (!$('terminos-condiciones').checked) {
    error = true;
    $('errorTermCond').innerHTML = "Debes aceptar los términos y condiciones para registrarte";
    $('terminos-condiciones').classList.add('isInvalid');
  } else {
    cleanError('errorTermCond', e);
  }


  // Crear cuenta

  for (let i = 0; i < this.elements.length - 2; i++) {
    if (
      !this.elements[i].value.trim() ||
      this.elements[i].classList.contains('isInvalid')
    ) {
      error = true;
      this.elements[i].classList.add('isInvalid');
      $('errorCreate').innerHTML = "Hay campos con errores o están vacíos.";
    }
  }
  !error && this.submit();
});
