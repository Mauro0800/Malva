window.onload = function () {

    const $ = id => document.getElementById(id);
    const formAddProduct = $('formDashboardProduct');
    const name = $('name');
    const price = $('price');
    const discount = $('discount');
    const stock = $('stock');
    const description = $('description');
    const selectBrand = $('brand');
    const selectCategory = $('category');
    const selectMaterial = $('material');
    const image = $('image');
    const imageUser = $('imageUser');
    const images = $('images')

    let regExLetter = /^[A-Z]+$/i;
    let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;
    
    const checkedFields = () => {
      const elements = $('registerForm').elements;
      $('errorImageUser').innerHTML = null;
    
      for (let i = 0; i < elements.length - 2; i++) {
        if (elements[i].classList.contains('isInvalid')) {
          $('errorImageUser').innerHTML = "Hay campos con errores o están vacíos.";
        }
      }
    };

    const verifyEmail = async (email) => {
        try {
          let response = await fetch('/api/users/email', {
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

    const errorMessage = (element, message, { target }) => {
        $(element).innerHTML = message
        target.classList.add('isInvalid')
    }

    const cleanError = (element, { target }) => {
        target.classList.remove('isInvalid')
        target.classList.remove('isValid')
        $(element).innerHTML = null
    }

    const formsDisplayNone = () => {
        $("formDashboardProduct").classList.remove("form-dashboard")
        $("formDashboardProduct").classList.add("none")

        $("formDashboardUser").classList.remove("form-dashboard")
        $("formDashboardUser").classList.add("none")

        $("formDashboardBrand").classList.remove("form-dashboard")
        $("formDashboardBrand").classList.add("none")

        $("formDashboardMaterial").classList.remove("form-dashboard")
        $("formDashboardMaterial").classList.add("none")

        $("formDashboardCategory").classList.remove("form-dashboard")
        $("formDashboardCategory").classList.add("none")
    }

    const tablesDisplayNone = () => {
        $("tableProduct").classList.remove("body__section--attendance")
        $("tableProduct").classList.add("none")

        $("tableUser").classList.remove("body__section--attendance")
        $("tableUser").classList.add("none")

        $("tableBrand").classList.remove("body__section--attendance")
        $("tableBrand").classList.add("none")

        $("tableMaterial").classList.remove("body__section--attendance")
        $("tableMaterial").classList.add("none")

        $("tableCategory").classList.remove("body__section--attendance")
        $("tableCategory").classList.add("none")
    }

    const formToggleDisplay = (form) => {
        formsDisplayNone();
        tablesDisplayNone();
        if($(form).classList.contains("form-dashboard")){
        $(form).classList.remove("form-dashboard")
        $(form).classList.add("none")
       }else{
        $(form).classList.remove("none")
        $(form).classList.add("form-dashboard")
       }
    }

    const tableToggleDisplay = (table) => {
        formsDisplayNone();
        tablesDisplayNone();
       if($(table).classList.contains("body__section--attendance")){
        $(table).classList.remove("body__section--attendance")
        $(form).classList.add("none")
       }else{
        $(table).classList.remove("none")
        $(table).classList.add("body__section--attendance")
       }
    }

    $("viewProducts").addEventListener("click", function(e){
        tableToggleDisplay("tableProduct")
    })
    $("viewUsers").addEventListener("click", function(e){
        tableToggleDisplay("tableUser")
    })
    $("viewBrands").addEventListener("click", function(e){
        tableToggleDisplay("tableBrand")
    })
    $("viewMaterials").addEventListener("click", function(e){
        tableToggleDisplay("tableMaterial")
    })
    $("viewCategories").addEventListener("click", function(e){
        tableToggleDisplay("tableCategory")
    })

    $("addProduct").addEventListener("click",function(e){
        formToggleDisplay("formDashboardProduct")
    })

    $("addUser").addEventListener("click",function(e){
        formToggleDisplay("formDashboardUser")
    })

    $("addBrand").addEventListener("click",function(e){
        formToggleDisplay("formDashboardBrand")
    })

    $("addMaterial").addEventListener("click",function(e){
        formToggleDisplay("formDashboardMaterial")
    })

    $("addCategory").addEventListener("click",function(e){
        formToggleDisplay("formDashboardCategory")
    })

    $("addBrandInput").addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('addBrandError', 'El nombre de la marca es obligatorio', event)
                break;
            case this.value.trim().length < 3:
                errorMessage('addBrandError', 'El nombre del producto debe tener al menos 3 caracteres', event)
            default:
                this.classList.add('isValid')
                break;
        }
    })

    $("addBrandInput").addEventListener('focus', function (event) {
        cleanError('addBrandError', event)
    })
    
    $("formDashboardBrand").addEventListener('submit', function (event) {
        event.preventDefault();
        let error = false;
        for (let i = 0; i < this.elements.length - 2; i++) {
            if (!this.elements[i].value || this.elements[i].classList.contains('isInvalid')) {
                error = true
            }
        }
        !error ? this.submit() : $('addBrandError').innerHTML = 'Los campos señalados son obligatorios'
    })


    $("addMaterialInput").addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('addMaterialError', 'El nombre de la marca es obligatorio', event)
                break;
            case this.value.trim().length < 3:
                errorMessage('addMaterialError', 'El nombre del producto debe tener al menos 3 caracteres', event)
            default:
                this.classList.add('isValid')
                break;
        }
    })

    $("addMaterialInput").addEventListener('focus', function (event) {
        cleanError('addMaterialError', event)
    })
    
    $("formDashboardMaterial").addEventListener('submit', function (event) {
        event.preventDefault();
        let error = false;
        for (let i = 0; i < this.elements.length - 2; i++) {
            if (!this.elements[i].value || this.elements[i].classList.contains('isInvalid')) {
                error = true
            }
        }
        !error ? this.submit() : $('addMaterialError').innerHTML = 'Los campos señalados son obligatorios'
    })

    $("addCategoryInput").addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('addCategoryError', 'El nombre de la marca es obligatorio', event)
                break;
            case this.value.trim().length < 3:
                errorMessage('addCategoryError', 'El nombre del producto debe tener al menos 3 caracteres', event)
            default:
                this.classList.add('isValid')
                break;
        }
    })

    $("addCategoryInput").addEventListener('focus', function (event) {
        cleanError('addCategoryError', event)
    })
    
    $("formDashboardCategory").addEventListener('submit', function (event) {
        event.preventDefault();
        let error = false;
        for (let i = 0; i < this.elements.length - 2; i++) {
            if (!this.elements[i].value || this.elements[i].classList.contains('isInvalid')) {
                error = true
            }
        }
        !error ? this.submit() : $('addCategoryError').innerHTML = 'Los campos señalados son obligatorios'
    })
    
    name.addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('nameError', 'el nombre del producto es obligatorio', event)
                break;
            case this.value.trim().length < 3:
                errorMessage('nameError', 'el nombre del producto debe tener al menos 3 caracteres', event)
            case this.value.trim().length > 20:
                errorMessage('nameError', 'el nombre del producto debe tener maximo 20 caracteres', event)
            default:
                this.classList.add('isValid')
                break;
        }
    })
    
    name.addEventListener('focus', function (event) {
        cleanError('nameError', event)
    })
    
    price.addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('priceError', 'el precio del producto es obligatorio', event)
                break;
            case this.value < 0:
                errorMessage('priceError', 'el precio del producto debe ser mayor a 0', event)
            default:
                this.classList.add('isValid')
                break;
        }
    })
    price.addEventListener('focus', function (event) {
        cleanError('priceError', event)
    })

    discount.addEventListener('blur', function (event) {
        if (this.value < 0) {
            errorMessage('discountError', 'Solo números positivos', event)
        } else {
            this.classList.add('isValid')
        }
    })
    discount.addEventListener('focus', function (event) {
        cleanError('discountError', event)
    })

    stock.addEventListener('blur', function (event) {
        if (this.value < 1) {
            errorMessage('stockError', 'Minimo un producto en stock', event)
        } else {
            this.classList.add('isValid')
        }
    })
    stock.addEventListener('focus', function (event) {
        cleanError('stockError', event)
    })

    description.addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('descriptionError', 'La descripcion es obligatoria', event)
                break;
            case this.value.trim().length < 20:
                errorMessage('descriptionError', 'Minimo 20 caracteres', event)
                break;
            case this.value.trim().length > 1000:
                errorMessage('descriptionError', 'Maximo 1000 caracteres', event)
                break;
            default:
                this.classList.add('isValid')
                break;
        }
    })

    let numberCharacters = 0;

    description.addEventListener('focus', function (event) {
        cleanError('descriptionError', event)
    })

    let textValidation

    description.addEventListener('keyup', function (event) {
        if (textValidation && event.key !== 'Backspace') {
            this.value = textValidation
            errorMessage('descriptionError', 'Maximo 1000 caracteres', event)
            return null
        }
        numberCharacters = this.value.length;

        $('numberCharacters').innerHTML = numberCharacters;

        if (numberCharacters === 0) {
            textValidation = this.value.trim()
        } else {
            textValidation
        }

        if (numberCharacters <= 0) {
            $('descrptionInfo').hidden = true;
            errorMessage('descriptionError', 'Máximo 1000 caracteres', event)
        } else {
            $('descrptionInfo').hidden = false;
            cleanError('descriptionError', event)
        }
    })


    selectBrand.addEventListener('blur', function (event) {
        if (!this.value) {
            errorMessage('brandError', 'Debes seleccionar una marca', event)
        } else {
            this.classList.add('isValid')
        }
    })

    selectBrand.addEventListener('focus', function (e) {
        cleanError('brandError', e)
    })

    selectCategory.addEventListener('blur', function (event) {
        if (!this.value) {
            errorMessage('categoryError', 'Debes seleccionar una categoria', event)
        } else {
            this.classList.add('isValid')
        }
    })

    selectCategory.addEventListener('focus', function (event) {
        cleanError('categoryError', event)
    })

    selectMaterial.addEventListener('blur', function (event) {
        if (!this.value) {
            errorMessage('materialError', 'Debes seleccionar un material', event)
        } else {
            this.classList.add('isValid')
        }
    })

    selectMaterial.addEventListener('focus', function (event) {
        cleanError('materialError', event)
    })

    const extension = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

    image.addEventListener('change', function (e) {
        if (!extension.exec(this.value)){
                $('imageError').innerHTML = "Solo se admiten archivos jpg | jpeg | png | gif | webp"
                this.classList.add('isInvalid')
        }else{
                cleanError('imageError', e);
        }
    })
    images.addEventListener('change', function (e) {
        switch (true) {
            case !extension.exec(this.value):
                $('imagesError').innerHTML = "Solo se admiten archivos jpg | jpeg | png | gif | webp"
                this.classList.add('isInvalid')
                break;
            case this.files.length > 3: 
                $('imagesError').innerHTML = "Máximo 3 imágenes"
                this.classList.add('isInvalid')
                break;
            default:
                cleanError('imagesError', e);
                break;
        }
    })

    formAddProduct.addEventListener('submit', function (event) {
        event.preventDefault();
        let error = false;
        for (let i = 0; i < this.elements.length - 3; i++) {
            if (!this.elements[i].value || this.elements[i].classList.contains('isInvalid')) {
                error = true
            }
        }

        if (!error) {
            this.submit()
        } else {
            for (let i = 0; i < this.elements.length - 2; i++) {
                !this.elements[i].value && this.elements[i].classList.add('isInvalid')
                switch (true) {

                    case (this.elements[i].id === 'image'  && this.elements[i].files.length === 0):
                        image.classList.add('imageButton')
                        break;

                    case (this.elements[i].id === 'images' && this.elements[i].files.length === 0):
                        images.classList.add('imageButton')
                        break;
                        
                    default:
                        break;
                }
            }
            $('formError').innerHTML = 'Los campos señalados son obligatorios'
        }
    })
      
      $('nameUser').addEventListener('blur', function (e) {
        switch (true) {
          case !this.value.trim():
            errorMessage('errorNameUser', "El nombre es obligatorio", e);
            break;
          case this.value.trim().length < 2 || this.value.trim().length > 50:
            errorMessage('errorNameUser', "El nombre debe tener un mínimo de 2 y un máximo de 50 caracteres", e);
            break;
          case !regExLetter.test(this.value.trim()):
            errorMessage('errorNameUser', "Solo se aceptan caracteres alfabéticos", e);
            break;
      
          default:
            this.classList.add('isValid');
            checkedFields();
            break;
        }
      });
      
      $('nameUser').addEventListener('focus', function (e) {
        cleanError('errorNameUser', e);
      });
      
      
      
      $('surname').addEventListener('blur', function (e) {
        switch (true) {
          case !this.value.trim():
            errorMessage('errorSurname', "El apellido es obligatorio", e);
            break;
          case this.value.trim().length < 2 || this.value.trim().length > 50:
            errorMessage('errorSurname', "El apellido debe tener un mínimo de 2 y un máximo de 50 caracteres", e);
            break;
          case !regExLetter.test(this.value.trim()):
            errorMessage('errorSurname', "Solo se aceptan caracteres alfabéticos", e);
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
      
      
      
      $('email').addEventListener('blur', async function (e) {
        switch (true) {
          case !this.value.trim():
            errorMessage('errorEmail', "El e-mail es obligatorio", e);
            break;
          case !regExEmail.test(this.value.trim()):
            errorMessage('errorEmail', "Tiene que ser un e-mail válido", e);
            break;
          case await verifyEmail(this.value.trim()):
            errorMessage('errorEmail', "Este e-mail ya se encuentra registrado", e)
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
      
      
      
      password.addEventListener('blur', function (e) {
        $("msgPassword").hidden = true;
        switch (true) {
          case !this.value.trim():
            errorMessage('errorPass', "La contraseña es obligatoria", e);
            break;
          case !regExPass.test(this.value.trim()):
            errorMessage('errorPass', "La contraseña debe tener entre 8 y 12 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial", e);
            break;
          default:
            this.classList.add('isValid');
            checkedFields();
            break;
        }
      });
      
      password.addEventListener('focus', function (e) {
        cleanError('errorPass', e);
        $('msgPassword').hidden = false;
      });
      
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
      
      password.addEventListener('keyup', function () {
        validPassword('mayu', exRegs.exRegMayu, this.value);
        validPassword('minu', exRegs.exRegMinu, this.value);
        validPassword('num', exRegs.exRegNum, this.value);
        validPassword('esp', exRegs.exRegEsp, this.value);
        validPassword('min', exRegs.exRegMin, this.value);
        validMaxPassword('max', exRegs.exRegMax, this.value);
      });
       
       
       
      $('password2').addEventListener('blur', function (e) {
        switch (true) {
          case !this.value.trim():
            errorMessage('errorPass2', "Debes confirmar la contraseña", e);
            break;
          case this.value.trim() !== password.value.trim():
            errorMessage('errorPass2', "Las contraseñas no coinciden", e);
            break;
          case !regExPass.test(this.value.trim()):
            errorMessage('errorPass2', "La contraseña debe tener entre 8 y 12 caracteres, tener una mayúscula, una minúscula, un número y un carácter especial", e);
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
      
      
      
      const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
      
      imageUser.addEventListener('change', function (e) {
        
          if (!imageUser) {
            this.classList.add('isValid');
            checkedFields();
          } else {
            switch (true) {
              case !regExExt.exec(this.value):
                this.classList.add('isInvalid');
                $('errorImageUser').innerHTML = "Solo se admiten imágenes en formato .jpg, .jpeg, .png, .gif y .webp"
                break;
              default:
                this.classList.remove('isInvalid');
                this.classList.add('isValid')
                $('errorImageUser').innerHTML = " "
                checkedFields()
                break;
            }
          }
        });
        
        
      
      
      
      $('formDashboardUser').addEventListener('submit', function (e) {
        e.preventDefault();
        let error = false;
      
        for (let i = 0; i < this.elements.length - 2; i++) {
          if (
            (!this.elements[i].value.trim() ||
            this.elements[i].classList.contains('isInvalid'))
          ) { 
            error = true;
            this.elements[i].classList.add('isInvalid');
            $('errorImageUser').innerHTML = "Hay campos con errores o están vacíos.";
          }
        }
        !error && this.submit();
      });

}