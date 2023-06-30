const wordElement = document.getElementById('word');
const meaningElement = document.getElementById('meaning');
const nextButton = document.getElementById('nextButton');
const tingSound = document.getElementById('tingSound');

nextButton.addEventListener('click', fetchWordMeaning);

function fetchWordMeaning() {
  const randomWordAPI = 'https://random-word-api.herokuapp.com/word';
  const dictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  fetch(randomWordAPI)
    .then(response => response.json())
    .then(data => {
      const word = data[0];
      wordElement.textContent = word;
      return fetch(dictionaryAPI + word);
    })
    .then(response => response.json())
    .then(data => {
      const meaning = data[0].meanings[0].definitions[0].definition;
      meaningElement.textContent = meaning;
    })
    .catch(error => console.error(error));

  playTingSound();
}

function playTingSound() {
  tingSound.currentTime = 0;
  tingSound.play();
}

