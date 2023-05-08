window.onload = function () {

    const $ = id => document.getElementById(id);
    const formAddProduct = $('form-add-product');
    const name = $('name');
    const price = $('price');
    const discount = $('discount');
    const stock = $('stock');
    const description = $('description');
    const selectBrand = $('brand');
    const selectCategory = $('category');
    const selectMaterial = $('material');
    const image = $('image');
    const images = $('images')

    const errorMessage = (element, message, { target }) => {
        $(element).innerHTML = message
        target.classList.add('input_error')
    }

    const cleanError = (element, { target }) => {
        target.classList.remove('input_error')
        target.classList.remove('input_success')
        $(element).innerHTML = null
    }

    name.addEventListener('blur', function (event) {
        switch (true) {
            case !this.value.trim():
                errorMessage('nameError', 'el nombre del producto es obligatorio', event)
                break;
            case this.value.trim().length < 3:
                errorMessage('nameError', 'el nombre del producto debe tener al menos 3 caracteres', event)
            default:
                this.classList.add('input_success')
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
                this.classList.add('input_success')
                break;
        }
    })
    price.addEventListener('focus', function () {
        cleanError('priceError', event)
    })

    discount.addEventListener('blur', function (event) {
        if (this.value < 0) {
            errorMessage('discountError', 'Solo números positivos', event)
        } else {
            this.classList.add('input_success')
        }
    })
    discount.addEventListener('focus', function () {
        cleanError('discountError', event)
    })

    stock.addEventListener('blur', function (event) {
        if (this.value < 1) {
            errorMessage('stockError', 'Minimo un producto en stock', event)
        } else {
            this.classList.add('input_success')
        }
    })
    stock.addEventListener('focus', function () {
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
                this.classList.add('input_success')
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
            console.log(event)
        } else {
            this.classList.add('input_success')
        }
    })

    selectBrand.addEventListener('focus', function () {
        cleanError('brandError', event)
    })

    selectCategory.addEventListener('blur', function (event) {
        console.log(event)
        if (!this.value) {
            errorMessage('categoryError', 'Debes seleccionar una categoria', event)
        } else {
            this.classList.add('input_success')
        }
    })

    selectCategory.addEventListener('focus', function () {
        cleanError('categoryError', event)
    })

    selectMaterial.addEventListener('blur', function (event) {
        if (!this.value) {
            errorMessage('materialError', 'Debes seleccionar un material', event)
        } else {
            this.classList.add('input_success')
        }
    })

    selectMaterial.addEventListener('focus', function () {
        cleanError('materialError', event)
    })

    const extension = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

    image.addEventListener('change', function (e) {
        switch (true) {
            case !extension.exec(this.value):
                $('imageError').innerHTML = "Solo se admiten archivos jpg | jpeg | png | gif | webp"
                this.classList.add('input_error')

                break;
            case this.files.length > 3:
                $('imageError').innerHTML = 'Máximo 3 imágenes'
                this.classList.add('input_error')

            default:
                cleanError('imageError', event);
                break;
        }
    })

    formAddProduct.addEventListener('submit', function (event) {
        event.preventDefault();
        let error = false;
        for (let i = 0; i < this.elements.length - 2; i++) {
            if (!this.elements[i].value || this.elements[i].classList.contains('input_error')) {
                error = true
            }
        }

        if (!error) {
            this.submit()
        } else {
            for (let i = 0; i < this.elements.length - 3; i++) {
                !this.elements[i].value && this.elements[i].classList.add('input_error')

                if (this.elements[i].id === 'image' || this.elements[i].id === 'images' && this.elements[i].files.length === 0) {
                    image.classList.add('imageButton')
                    images.classList.add('imageButton')
                }
            }
        }
        $('formError').innerHTML = 'Los campos señalados son obligatorios'
    })
}