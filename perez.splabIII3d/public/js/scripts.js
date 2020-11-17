//import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";
import {addAnuncio, 
    getAnuncios, modifyAnuncio, borrarAnuncio, promedioTransacciones } from "./accesoADatos.js";





window.addEventListener('load', inicializarManejadores);

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnEliminar = document.getElementById("btnEliminar");
const promedioPicker = document.getElementById("txtTransaccionElegida");
const formChangesEvent = document.querySelectorAll(".alertChanges");





function inicializarManejadores() {


   getAnuncios();

};



btnGuardar.addEventListener('click', function (e) {

    const camposCompletos = document.getElementById('myForm').checkValidity();

    e.preventDefault();

    if (camposCompletos) {

        let txtId = document.getElementById("txtID");
        txtId.value = "";


        altaUnAnuncio();

        formChangesEvent.forEach(element => {
            element.value = "";
        });

    } else {
        alert("Debe completar todos los datos correctamente");
    }

});

promedioPicker.addEventListener('change', function (e) {

    promedioPrecios();
});


btnActualizar.addEventListener('click', function (e) {


    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    if (selectedId) {



        const titulo = document.getElementById("txtTitulo").value;
        const descripcion = document.getElementById("txtDescripcion").value;
        const precio = document.getElementById("txtPrecio").value;
        const puertas = document.getElementById("txtPuertas").value;
        const km = document.getElementById("txtKM").value;
        const potencia = document.getElementById("txtPotencia").value;

        let tran;

        if (document.getElementById("TVenta").checked) {
            tran = "venta";
        } else {
            tran = "alquiler";
        }


        const anuncioNuevo = new Anuncio_Auto(titulo, tran, descripcion, precio, puertas, km, potencia);

        if (confirm("Seguro que desea guardar los cambios?")) {
            modifyAnuncio(anuncioNuevo, selectedId);
            getAnuncios();
        }



    } else {
        alert("Debe seleccionar primero un anuncio para modificar");
    }


});


btnEliminar.addEventListener('click', function (e) {

    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;


    if (selectedId) {
        if (confirm("Seguro que desea eliminar el anuncio?")) {
            borrarAnuncio(selectedId);
        }

    } else {
        alert("Debe seleccionar primero un anuncio para eliminar");
    }


getAnuncios();

});






function altaUnAnuncio() {


    const titulo = document.getElementById("txtTitulo").value;
    const descripcion = document.getElementById("txtDescripcion").value;
    const transaccion = document.querySelector('input[name="transaccion"]:checked').value;
    const precio = document.getElementById("txtPrecio").value;
    const puertas = document.getElementById("txtPuertas").value;
    const km = document.getElementById("txtKM").value;
    const potencia = document.getElementById("txtPotencia").value;


    const nuevoAnuncio = new Anuncio_Auto(titulo, transaccion, descripcion, precio, puertas, km, potencia);

    addAnuncio(nuevoAnuncio);

    getAnuncios();
}



 function promedioPrecios(trans) {


    let transaccion = document.getElementById("txtTransaccionElegida").value.toLowerCase();
    getAnuncios()
    .then(function(res){

        let array = res;

        let arrPorTrans = array.filter(item => item.transaccion == transaccion);
        return arrPorTrans;
       })
       .then(function(res){

        let arrayPrecios = res.map(function (arrayPrecios) {
            
           return arrayPrecios.precio;
            
        });

 
        let nuevo = average(arrayPrecios);

        console.log(nuevo);
      
        document.getElementById("txtPromedio").value = "$ " + nuevo;
       });




    /* let precios = document.querySelectorAll("td.precio");

    let array = Array.from(precios);
    
    let nuevoArray = [];

    array.forEach(element => {
        nuevoArray.push(parseInt(element.innerHTML));
    });

    let nuevo = average(nuevoArray);

    document.getElementById("txtPromedio").value = "$ " + nuevo; */

} 






function average(nums) {

    let suma = nums.reduce(function (a, b) {

        return (a + b);

    });

    return suma / nums.length;
}



