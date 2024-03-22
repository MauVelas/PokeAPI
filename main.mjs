const baseURL = 'https://pokeapi.co/api/v2/'

function crearCarta(pokemon) {
    let article = document.createElement('article')
    article.classList.add('carta')
    article.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites}>
    <ul class="datos">        
        <li>Types: ${pokemon.types[0].type.name}</li>
        <button class="ventanaModal"> Info </button>
    </ul>
    `
    document.getElementById('render').appendChild(article)
}

function crearModal(pokemon) {
    let modal = document.createElement('section')
    modal.classList.add('modal')
    modal.innerHTML = `
    <div class="modalContainer">
        <h3 class="modalTittle">${pokemon.name}</h3>
        <img src="${pokemon.sprites}" class="modalImage">
        <p class="modalParrafo">Types: ${pokemon.types[0].type.name}</p>
        <p class="modalParrafo">Abilities: ${pokemon.habilidades[0].ability.name}</p>
        <p class="modalParrafo">Weigth: ${pokemon.weight}</p>
        <p class="modalParrafo">Heigth: ${pokemon.height}</p>
        <p class="modalParrafo">Base Experience: ${pokemon.experienciaBase}</p>
        <p class="modalParrafo">Base HP: ${pokemon.vida}</p>
        <p class="modalParrafo">Base Attack: ${pokemon.ataque}</p>
        <p class="modalParrafo">Base Defense: ${pokemon.defensa}</p>
        <p class="modalParrafo">Base Special Attack: ${pokemon.ataqueEspecial}</p>
        <p class="modalParrafo">Base Special Defense: ${pokemon.defensaEspecial}</p>
        <p class="modalParrafo">Base Speed: ${pokemon.velocidad}</p>        
        <a href="#" class="modalClose">Cerrar</a>
    </div>
    `
    document.getElementById('prueba33').appendChild(modal);

//Función de abrir Modal dentro del recuadro

    const openModal = document.querySelector('.ventanaModal')
    const modal33 = document.querySelector('.modal'); 
    const closeModal = document.querySelector('.modalClose');

    openModal.addEventListener("click", (e)=>{
        e.preventDefault();
        modal33.classList.add('modal--show');
    });

    closeModal.addEventListener("click", (e)=>{
    e.preventDefault();
    modal33.classList.remove('modal--show');
    });
}

async function obtenerPokemon(nombre) {
    let respuestaAPI = await fetch(`${baseURL}pokemon/${nombre}`)
    let pokemon = await respuestaAPI.json()

    let propiedadesPokemon = {
        name: pokemon.name,
        height: pokemon.height,
        id: pokemon.id,
        weight: pokemon.weight,
        sprites: pokemon.sprites.front_shiny,
        types: pokemon.types,
        vida: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat, 
        ataque: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defensa: pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat,
        ataqueEspecial: pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
        defensaEspecial: pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
        velocidad: pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat,
        experienciaBase: pokemon.base_experience,
        habilidades: pokemon.abilities
    }
    console.log(propiedadesPokemon);
    crearCarta(propiedadesPokemon);
    crearModal(propiedadesPokemon);


    let parseArray = JSON.parse(localStorage.getItem("hola")) || [];        //Obtiene los valores del Local Storage(hola) y los regresa a objetos, si no hay ningún valor, crea un array vacio
    parseArray.push(propiedadesPokemon);                                            //"Sube" los datos al array
    let arrayJSON = JSON.stringify(parseArray);                             //Tranforma los objetos a formato "string" 
    localStorage.setItem("hola", arrayJSON)

}

async function obtenerListado() {
    let respuestaAPI = await fetch(`${baseURL}pokemon/`)

    let listadoPokemons = await respuestaAPI.json()

    //console.log('informacion obtenerListado:',listadoPokemons.results);

    for (let index = 0; index < listadoPokemons.results.length; index++) {
        await obtenerPokemon(listadoPokemons.results[index].name);
    } 
} 



function crearBusqueda(pokemon) {
    let article = document.createElement('article')
    article.classList.add('carta')
    article.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites}>
    <ul class="datos">        
        <li>Types: ${pokemon.types[0].type.name}</li>
        <button class="ventanaModal"> Info </button>
    </ul>
    `
    document.getElementById('render').appendChild(article)
}


const filtroPokemon = document.getElementById('filtro');

filtroPokemon.addEventListener("click", (e)=>{
    e.preventDefault();

    const busqueda = document.getElementById('valorFiltro').value
    
/*hasta aqui bien
    let arrayPokemon = JSON.parse(localStorage.getItem("hola")) || [];
    for (let index = 0; index < arrayPokemon.length; index++) {
        let topos = arrayPokemon[index].types.length;
        
        for (let index1 = 0; index1 < topos; index1++) {
            let topitos = arrayPokemon[index].types[index1].type;
            let pruebafinal2 = JSON.parse(localStorage.getItem("apokozy")) || [];        
        pruebafinal2.push(topitos);                                            
            let pruebaJSON2 = JSON.stringify(pruebafinal2);                      
            localStorage.setItem("apokozy", pruebaJSON2)}
        
        let pruebafinal = JSON.parse(localStorage.getItem("apoko")) || [];        
        pruebafinal.push(topos);                                            
        let pruebaJSON = JSON.stringify(pruebafinal);                      
        localStorage.setItem("apoko", pruebaJSON)
        };*/
        

        if(busqueda === "fire" || busqueda === "water"){
            let arrayTipos = JSON.parse(localStorage.getItem("apokozy")) || [];
            let findType = arrayTipos.find((pokemon) => pokemon.types == busqueda);
            console.log(findType);
            
        } else {
            let arrayPokemon = JSON.parse(localStorage.getItem("hola")) || [];
            let findPokemon = arrayPokemon.find((pokemon) => pokemon.name == busqueda);
            let div = document.getElementById('render');
            while (div.firstChild) {
            div.removeChild(div.firstChild);
            }
            crearBusqueda(findPokemon); 
    }
    
    
    //crearBusqueda(findType);     
})
    
const limpiarP = document.getElementById('limpiar');
limpiarP.addEventListener("click", (e)=>{
    e.preventDefault();
    localStorage.clear();
})
      
setTimeout(function(){
    let arrayPokemon = JSON.parse(localStorage.getItem("hola")) || [];
    for (let index = 0; index < arrayPokemon.length; index++) {
        let topos = arrayPokemon[index].types.length;
        
        for (let index1 = 0; index1 < topos; index1++) {
            let topitos = arrayPokemon[index].types[index1].type;
            let pruebafinal2 = JSON.parse(localStorage.getItem("apokozy")) || [];        
        pruebafinal2.push(topitos);                                            
            let pruebaJSON2 = JSON.stringify(pruebafinal2);                      
            localStorage.setItem("apokozy", pruebaJSON2)}
        
        let pruebafinal = JSON.parse(localStorage.getItem("apoko")) || [];        
        pruebafinal.push(topos);                                            
        let pruebaJSON = JSON.stringify(pruebafinal);                      
        localStorage.setItem("apoko", pruebaJSON)
        };
}, 2000);

obtenerListado()