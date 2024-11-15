
let currentPage = 1;
let totalPages = 1;


function loadCharacters(page = 1) {
  
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      totalPages = data.info.pages; 
      currentPage = page; 
      renderCharacters(data.results); 
      updatePaginationButtons(data.info); 
    })
    .catch(error => {
      console.error("Error al cargar los personajes: ", error);
    });
}


function renderCharacters(characters) {
  const charactersContainer = document.getElementById("characters-list");
  charactersContainer.innerHTML = ""; 

  characters.forEach(character => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    const characterImage = document.createElement("img");
    characterImage.src = character.image;
    characterImage.alt = character.name;

    const characterName = document.createElement("h3");
    characterName.textContent = character.name;

    const characterSpecies = document.createElement("p");
    characterSpecies.textContent = `Especie: ${character.species}`;

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterSpecies);

    charactersContainer.appendChild(characterCard);
  });
}


function updatePaginationButtons(info) {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");


  prevButton.disabled = !info.prev;
  nextButton.disabled = !info.next;
}


function goToPreviousPage() {
  if (currentPage > 1) {
    loadCharacters(currentPage - 1);
  }
}


function goToNextPage() {
  if (currentPage < totalPages) {
    loadCharacters(currentPage + 1);
  }
}


document.getElementById("prev-page").addEventListener("click", goToPreviousPage);
document.getElementById("next-page").addEventListener("click", goToNextPage);


window.onload = () => loadCharacters(currentPage);
