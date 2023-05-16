const iconoMenu = document.querySelector('#icono-menu')
const iconoCerrar = document.querySelector('#cerrar')
 menu= document.querySelector('#menu');

 iconoMenu.addEventListener('click', function(){
    menu.classList.toggle('active10');
})

 iconoCerrar.addEventListener('click', function(){
    menu.classList.toggle('active10');
})