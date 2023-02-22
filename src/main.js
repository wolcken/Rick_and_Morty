const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: {
        'Content-Type': 'aplication/json;charset=utf-8',
    }
});

const container = document.querySelector('#container');

let pag = 1;

let aux = true;

async function getCharacter(pagina) {
    const data = await api(`/character?page=${pagina}`);
    const characters = data.data.results;
    createChar(characters);
}

function createChar(characters) {
    const pers = document.createElement('section');
    pers.classList.add('personajes');
    
    characters.forEach(char => {
        //contenedor del personaje
        const character = document.createElement('div');
        character.classList.add('char');

        //imagen
        const imagen = document.createElement('img');
        imagen.classList.add('imagen');
        imagen.setAttribute('alt', 'img-char');
        imagen.setAttribute('src', char.image);
        character.appendChild(imagen);

        //contenedor secundario informacion
        const information = document.createElement('div');
        information.classList.add('information');

        //origin
        const origin = document.createElement('span');
        const origin_text = document.createTextNode('Origin: ' + char.origin.name);
        origin.appendChild(origin_text);

        //nombre
        const name = document.createElement('h2');
        name.classList.add('name');
        const name_text = document.createTextNode(char.name);
        name.appendChild(name_text);

        //status
        const status = document.createElement('span');
        const status_text = document.createTextNode('Status: ' + char.status);
        status.appendChild(status_text);

        //specie
        const specie = document.createElement('span');
        const specie_text = document.createTextNode('Specie: ' + char.species);
        specie.appendChild(specie_text);

        //gender
        const gender = document.createElement('span');
        const gender_text = document.createTextNode('Gender: ' + char.gender);
        gender.appendChild(gender_text);

        //type
        const type = document.createElement('span');
        const type_text = document.createTextNode('Type: ' + char.type);
        type.appendChild(type_text);

        //location
        const location = document.createElement('span')
        const location_text = document.createTextNode('Location: ' + char.location.name);
        location.appendChild(location_text);
        

        information.append(name, origin, status, specie, gender, type, location);
        character.appendChild(information);
        pers.append(character);
    });

    container.append(pers);
}

function bool(aux) {
    if (aux === true) {
        getCharacter(pag);
        aux = false;
    }
}
bool(aux);

const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next')

btnPrev.addEventListener('click', function() {
    if (pag > 1) {
        document.getElementById('container').innerHTML = '';
        pag = pag - 1;
        getCharacter(pag);
    }
});

btnNext.addEventListener('click', function() {
    if (pag < 42) {
        document.getElementById('container').innerHTML = '';
        pag = pag + 1;
        getCharacter(pag);
    }
});