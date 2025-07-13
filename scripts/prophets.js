/* 
// 1. URL del recurso JSON
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// 2. Selección del contenedor donde se insertarán las tarjetas
const cards = document.querySelector('#cards');

// 3. Función asíncrona para obtener los datos
async function getProphetData() {
  const response = await fetch(url);          // Obtener respuesta
  const data = await response.json();         // Convertir a objeto JSON
  //console.table(data.prophets);            // Comentar después de verificar
  displayProphets(data.prophets);             // Pasar el array de profetas
}

// 4. Función para mostrar los profetas
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Crear elementos HTML
    let card = document.createElement('section');
    let fullName = document.createElement('h2'); // Crear título
    let portrait = document.createElement('img'); // Crear imagen

    // Construir contenido del nombre
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Construir atributos de imagen
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Agregar elementos al card
    card.appendChild(fullName);
    card.appendChild(portrait);

    // Agregar card al div#cards
    cards.appendChild(card);
  });
}

// 5. Llamar la función para comenzar
getProphetData();

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    cards.appendChild(card);
  });
}

getProphetData(); */


/* --------- */
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets);
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = prophet.birthdate;
    birthPlace.textContent = prophet.birthplace;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');

    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

getProphetData();

