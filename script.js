const wordElement = document.getElementById('word');
const meaningElement = document.getElementById('meaning');
const nextButton = document.getElementById('nextButton');
const tingSound = document.getElementById('tingSound');

nextButton.addEventListener('click', fetchWordMeaning);

let isFirstTime = true; // Flag to track if it's the first time clicking the button

// Your API keys
const learnerAPIKey = 'd212fcb2-c483-47c9-a4ab-b4c0c18de826';
const schoolAPIKey = 'dac573b4-d597-4141-9c3f-2d078c34c4e6';

function fetchWordMeaning() {
  const randomWordAPI = 'https://random-word-api.herokuapp.com/word';
  
  fetch(randomWordAPI)
    .then(response => response.json())
    .then(data => {
      const word = data[0];
      wordElement.textContent = word;
      
      // First try fetching from the Learner's API
      fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${learnerAPIKey}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0 && data[0].shortdef) {
            const meaning = data[0].shortdef[0];
            meaningElement.textContent = meaning;
          } else {
            // If no result from Learner's API, try the School Dictionary API
            fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${schoolAPIKey}`)
              .then(response => response.json())
              .then(data => {
                if (data.length > 0 && data[0].shortdef) {
                  const meaning = data[0].shortdef[0];
                  meaningElement.textContent = meaning;
                } else {
                  meaningElement.textContent = 'Meaning not Found';
                }
              })
              .catch(error => {
                meaningElement.textContent = 'Meaning not Found';
                console.error(error);
              });
          }
        })
        .catch(error => {
          meaningElement.textContent = 'Meaning not Found';
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });

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

// let isFirstTime = true; // Flag to track if it's the first time clicking the button

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
//     .then(response => response.json())
//     .then(data => {
//       if (data.title === 'No Definitions Found') {
//         meaningElement.textContent = 'Meaning not Found';
//       } else {
//         const meaning = data[0].meanings[0].definitions[0].definition;
//         meaningElement.textContent = meaning;
//       }
//     })
//     .catch(error => console.error(error));

//   playTingSound();

//   // Change button text after the first click
//   if (isFirstTime) {
//     nextButton.textContent = 'Next';
//     isFirstTime = false;
//   }
// }

// function playTingSound() {
//   tingSound.currentTime = 0;
//   tingSound.play();
// }


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

