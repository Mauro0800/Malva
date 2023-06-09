    const $ = id => document.getElementById(id);
    const formEditProduct = $('formDashboardProduct');
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
        target.classList.add('isInvalid')
    }
    
    const cleanError = (element, { target }) => {
        target.classList.remove('isInvalid')
        target.classList.remove('isValid')
        $(element).innerHTML = null
    }

    name.addEventListener('blur', function (e) {
        switch (true) {
            case !this.value.trim():
                errorMessage('nameError', 'El nombre es obligatorio', e)
                break;
            case this.value.trim().length < 5:
                errorMessage('nameError', 'El nombre debe contener al menos 5 caracteres', e)
                break;
            default:
                this.classList.add('isValid')
                break;
        }
    })
    name.addEventListener('focus', function (e) {
        cleanError('nameError', e)
    })

    price.addEventListener('blur', function (e) {
        switch (true) {
            case !this.value.trim():
                errorMessage('priceError', 'El precio es obligatorio', e)
                break;
            case this.value <= 0:
                errorMessage('priceError', 'El precio debe ser mayor a 0', e)
                break;
            default:
                this.classList.add('isValid')
                break;
        }
    })
    price.addEventListener('focus', function (e) {
        cleanError('priceError', e)
    })

    discount.addEventListener('blur', function (e) {
        if (this.value < 0) {
            errorMessage('discountError', 'Solo números mayores a 0', e)
        } else {
            this.classList.add('isValid')
        }
    })
    discount.addEventListener('focus', function (e) {
        cleanError('discountError', e)
    })

    stock.addEventListener('blur', function (e) {
        if (this.value < 1) {
            errorMessage('stockError', 'Minimo un producto ', e)
        } else {
            this.classList.add('isValid')
        }
    })
    stock.addEventListener('focus', function (e) {
        cleanError('stockError', e)
    })

    description.addEventListener('blur', function (e) {
        switch (true) {
            case !this.value.trim():
                errorMessage('descriptionError', 'La descripcion es obligatoria', e)
                break;
            case this.value.trim().length < 20:
                errorMessage('descriptionError', 'Minimo 20 caracteres', e)
                break;
            case this.value.trim().length > 1000:
                errorMessage('descriptionError', 'Maximo 1000 caracteres', e)
                break;
            default:
                this.classList.add('isValid')
                break;
        }
    })

    let numberCharacters = 0;

    description.addEventListener('focus', function (e) {
        cleanError('descriptionError', e)
    })

    let textValidation

    description.addEventListener('keyup', function (e) {
        if (textValidation && e.key !== 'Backspace') {
            this.value = textValidation
            errorMessage('descriptionError', 'Maximo 1000 caracteres', e)
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
            errorMessage('descriptionError', 'Máximo 1000 caracteres', e)
        } else {
            $('descrptionInfo').hidden = false;
            cleanError('descriptionError', e)
        }
    })


    selectBrand.addEventListener('blur', function (e) {
        if (!this.value) {
            errorMessage('brandError', 'Debes seleccionar una marca', e)
        } else {
            this.classList.add('isValid')
        }
    })

    selectBrand.addEventListener('focus', function (e) {
        cleanError('brandError', e)
    })

    selectCategory.addEventListener('blur', function (e) {
        if (!this.value) {
            errorMessage('categoryError', 'Debes seleccionar una categoria', e)
        } else {
            this.classList.add('isValid')
        }
    })

    selectCategory.addEventListener('focus', function (e) {
        cleanError('categoryError', e)
    })

    selectMaterial.addEventListener('blur', function (e) {
        if (!this.value) {
            errorMessage('materialError', 'Debes seleccionar un material', e)
        } else {
            this.classList.add('isValid')
        }
    })

    selectMaterial.addEventListener('focus', function (e) {
        cleanError('materialError', e)
    })

    const extensiones = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

    image.addEventListener('change', function (e) {
        switch (true) {
            case !extensiones.exec(this.value):
                $('imageError').innerHTML = "Solo se admiten archivos jpg | jpeg | png | gif | webp"
                this.classList.add('isInvalid')
                break;
            case this.files.length > 1:
                $('imageError').innerHTML = 'Máximo 1 imágen'
                this.classList.add('isInvalid')
                break;
            default:
                cleanError('imageError', e);
                this.classList.add('isValid')
                break;
        }
        if(!this.value){
            cleanError('imageError', e);
        }
    })

    
    images.addEventListener('change', function (e) {
        switch (true) {
            case !extensiones.exec(this.value):
                $('imagesError').innerHTML = "Solo se admiten archivos jpg | jpeg | png | gif | webp"
                this.classList.add('isInvalid')
                break;
            case this.files.length > 3:
                $('imagesError').innerHTML = 'Máximo 3 imágenes'
                this.classList.add('isInvalid')
                break;
            default:
                cleanError('imagesError', e);
                this.classList.add('isValid')
                break;
        }
        if(!this.value){
            cleanError('imagesError', e);
        }
    })

    formEditProduct.addEventListener('submit', function (e) {
        e.preventDefault();
        let error = false;
            for (let i = 0; i < this.elements.length - 4; i++) {
                if (this.elements[i].classList.contains('isInvalid')) {
                    error = true;
                    $('formError').innerHTML = 'Estos campos son obligatorios';
                }
            }
        !error&&this.submit();
    });

    
