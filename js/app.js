let comidas = [
    {
        id: 1,
        nombre: "Mila Común",
        precio: 650,
        cantidad: 1,
        img: "./assets/images/milacomun.jpg"
    },
    {
        id: 2,
        nombre: "Mila Completa",
        precio: 800,
        cantidad: 1,
        img: "./assets/images/milacompleta.jpeg"
    },
    {
        id: 3,
        nombre: "Mila Napolitana",
        precio: 1000,
        cantidad: 1,
        img: "./assets/images/napolitana.jpeg"
    }, {
        id: 4,
        nombre: "Agregado de papas",
        precio: 100,
        cantidad: 1,
        img: "./assets/images/papas.jpeg"
    }
];

let pedido = [];



const contenedorComidas = document.getElementById("comidas");

const contenedorPedido = document.getElementById("lista-pedido");

const carritoCount = document.getElementById("carritoCount");

const precioTotal = document.getElementById("precioTotal");

comidas.forEach((comida) => {
    const div = document.createElement("div");
    div.classList.add("comidas__eleccion");
    div.innerHTML = `
    <div  class="d-flex flex-column flex-sm-row" >
        <img class="comidas__img" src="${comida.img}" alt="">
        <h4 class="text-center align-self-sm-center" for="">$ ${comida.precio} ${comida.nombre}</h4>
        <button class="btn btn-warning align-self-center" id= "agregar${comida.id}">Agregar</button>
    </div>
`
    contenedorComidas.appendChild(div);

    const boton = document.getElementById(`agregar${comida.id}`);
    boton.addEventListener('click', () => {
        agregarComida(comida.id)
    });

});

const agregarComida = (comidaId) => {

    const existe = pedido.some(comida => comida.id === comidaId)

    if (existe) {
        const comida = pedido.map(comida => {
            if (comida.id === comidaId) {
                comida.cantidad++;

            }
        })
    } else {

        const item = comidas.find((comida) => comida.id === comidaId);
        pedido.push(item);
    }
    agregarALaLista();

};

const eliminarDelCarrito = (comidaId) => {
    const item = pedido.find((comida) => comida.id === comidaId)
    const indice = pedido.indexOf(item);
    pedido.splice(indice, 1);
    agregarALaLista();
}

const agregarALaLista = () => {

    contenedorPedido.innerHTML = ""

    pedido.forEach((comida) => {
        const div = document.createElement('tr');
        div.className = ('pedido');
        div.innerHTML = `
        
            <th>
                <img class="pedido__img" src="${comida.img}" alt="">
            </th>
            <th class="pedido__titulo--columna">
                <h4 class="pedido__titulo" for="">$ ${comida.precio} ${comida.nombre}</h4>
            </th>
            <th>
                <span class="pedido__cantidad">${comida.cantidad}</span>
            </th>
            <th>
                <button onclick = "eliminarDelCarrito(${comida.id})" class="pedido__eliminar"><i class="bi bi-trash-fill"></i></button>
            </th>
        
        `
        contenedorPedido.appendChild(div);
    })
    localStorage.setItem('pedido', JSON.stringify(pedido));

    carritoCount.innerText = pedido.length;
    precioTotal.innerText = pedido.reduce((acc, comida) => acc + comida.cantidad * comida.precio, 0);



};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('pedido')) {
        pedido = JSON.parse(localStorage.getItem('pedido'))
        agregarALaLista();
    }
});

const confirmar = document.querySelector('#confirmarPedido');
confirmar.addEventListener('click', () => (

    Swal.fire({
        title: 'Pedido Confirmado',
        icon: 'succes',
        text: 'Puede retirar su pedido en aprox. 30 minutos',
        confirmButtonText: 'OK'
    })
));

