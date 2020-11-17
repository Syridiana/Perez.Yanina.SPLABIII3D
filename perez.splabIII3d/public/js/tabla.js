import {getOneAnuncio} from './accesoADatos.js';

export default function crearTabla(lista){ // devuelve una tabla

    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-bordered', 'table-striped', 'table-hover');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}


function crearCabecera(item){ // devuelve thead
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    for (const key in item) {
       let th = document.createElement('th');
       let texto = document.createTextNode(key);
       let checkbox = document.createElement('input');

       checkbox.type = "checkbox";
       checkbox.name = key;
       checkbox.value = key;
       checkbox.id = "CB" + key;
       checkbox.checked  = true;

       checkbox.addEventListener('change', manejadorCheckBox);
       
       checkbox.classList.add('checkboxMargin');
       th.appendChild(texto);
       th.appendChild(checkbox);
       
      // th.classList.add('col');

       tr.appendChild(th);

    }


    thead.appendChild(tr);
    thead.classList.add('thead-dark', 'text-capitalize');

    return thead;

}





function crearCuerpo(lista){ // devuelve tbody
    const tbody = document.createElement('tbody');

    lista.forEach(element => {
       // console.log(element);
        const tr = document.createElement('tr');
        tr.classList.add('cursorPointer', 'text-capitalize', 'anuncio-entrada');

        for (const key in element) {
            const td = document.createElement('td');
            td.classList.add(key);
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);

            if(key =='id'){
               // console.log(element[key]);
                tr.setAttribute('data-id', element[key]);
            }
        }

       /*  if(element.hasOwnProperty('id')){
            tr.setAttribute('data-id', element['id']);
        } */
        
        agregarManejadorTR(tr);
        tbody.appendChild(tr);

    });

    return tbody;

}


function agregarManejadorTR(tr){
    if(tr){

        tr.addEventListener('click', function(e) {


            const id = e.target.parentElement.getAttribute('data-id');
               
            
            document.getElementById("txtID").value = id;

            getOneAnuncio(id);
            


        });
    }

}



function manejadorCheckBox(e){

    var appBanners = document.getElementsByClassName(e.target.name);

    if(e.target.checked == false){
        for (var i = 0; i < appBanners.length; i ++) {

            appBanners[i].style.opacity = '0';
        }
    } else if(e.target.checked == true){
        for (var i = 0; i < appBanners.length; i ++) {

            appBanners[i].style.opacity = '1';
        }
    }





}


function aplicarFiltro(arr, transaccion){
    return arr.filter(p=> p.transaccion === transaccion); // retorna array con la transaccion pedida
}








