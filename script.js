const wordElement = document.getElementById('word');
const meaningElement = document.getElementById('meaning');
const nextButton = document.getElementById('nextButton');
const tingSound = document.getElementById('tingSound');

nextButton.addEventListener('click', fetchWordMeaning);

let isFirstTime = true; // Flag to track if it's the first time clicking the button

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
      if (data.title === 'No Definitions Found') {
        meaningElement.textContent = 'Meaning not Found';
      } else {
        const meaning = data[0].meanings[0].definitions[0].definition;
        meaningElement.textContent = meaning;
      }
    })
    .catch(error => console.error(error));

  playTingSound();

  // Change button text after the first click
  if (isFirstTime) {
    nextButton.textContent = 'Next';
    isFirstTime = false;
  }
}

function playTingSound() {
  tingSound.currentTime = 0;
  tingSound.play();
}


// const wordElement = document.getElementById('word');
// const meaningElement = document.getElementById('meaning');
// const nextButton = document.getElementById('nextButton');
// const tingSound = document.getElementById('tingSound');

// nextButton.addEventListener('click', fetchWordMeaning);

// function fetchWordMeaning() {
//   const randomWordAPI = 'https://random-word-api.herokuapp.com/word';
//   const dictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

//   fetch(randomWordAPI)
//     .then(response => response.json())
//     .then(data => {
//       const word = data[0];
//       wordElement.textContent = word;
//       return fetch(dictionaryAPI + word);
//     })
//     .then(response => {
//       const res = response.json();
//       return res;
//     })
//     .then(data => {
//       // console.log('data ', data);
//       if(data.title == 'No Definitions Found'){
//         // fetchWordMeaning();
//         meaningElement.textContent = 'Meaning not Found';
//       }
//       else{
//       const meaning = data[0].meanings[0].definitions[0].definition;
//       meaningElement.textContent = meaning;
//       }
//     })
//     .catch(error => console.error(error));

//   playTingSound();
// }

// function playTingSound() {
//   tingSound.currentTime = 0;
//   tingSound.play();
// }

