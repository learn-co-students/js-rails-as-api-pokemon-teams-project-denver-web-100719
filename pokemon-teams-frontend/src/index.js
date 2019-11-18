const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainContainer = document.querySelector('main')
const handleResponse = (response) => response.json()

const createAddButton = () => {
    let addButton = document.createElement('button')
    addButton.innerText = 'Add Pokemon'
    addButton.addEventListener('click', (event) => {
        let id = event.target.parentNode.id
        let ul = event.target.parentNode.querySelector('ul')
        let list = Array.from(ul.children).length < 6

        if (list < 6) {
            fetch(`${BASE_URL}/addPokemon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            }) 
        } else {
            alert("Can't do it")
        }
    })
    return addButton
}
const createPokemonListItem = (pokemon, ul) => {
    let{nickname, species} = pokemon
    let li = document.createElement('li')
    let button = document.createElement('button')

    li.innerText = `${nickname} (${species})`
    button.className = 'release'
    button.innerText = "Release"
    
    li.append(button)
    ul.appendChild(li)
}

const showPokemon = (pokemon, ul) =>{
    return pokemon.map(pokemon => createPokemonListItem(pokemon, ul))
}

const createTrainerCard = (trainer) => {
    let div = document.createElement('div')
    let p = document.createElement('p')
    let ul = document.createElement('ul')

    div.className = 'card'
    div.id = trainer.id
    p.innerText = trainer.name

    showPokemon(trainer.pokemons, ul)

    div.append(p, createAddButton(), ul)
    
    mainContainer.appendChild(div)
}

const showTrainers = (trainers) => {
    trainers.map(createTrainerCard)
}

fetch(TRAINERS_URL)
    .then(handleResponse)
    .then(showTrainers)
