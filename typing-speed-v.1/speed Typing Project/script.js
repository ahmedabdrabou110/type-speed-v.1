const RANDOM_QUOTE_API = 'http://api.quotable.io/random'
//! Get Elements with DOM
const quoteDisplay = document.querySelector('#quoteDisplay')
const quoteInput = document.querySelector('#quoteInput')
const timer = document.querySelector('#timer')

//! Get the api function with FETCH
let getRandomQuote = () => {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content)
}

// getRandomQuote()

let renderNewQuote = async () => {
  let data = await getRandomQuote()
  quoteDisplay.innerHTML = ''
  data.split('').forEach((character) => {
    const CharacterSpans = document.createElement('span')
    CharacterSpans.innerText = character
    quoteDisplay.appendChild(CharacterSpans)
  })
  quoteInput.value = null
  startTimer()
}

//! Event of typing in input [textarea]
quoteInput.addEventListener('input', () => {
  // get all spans
  const arrayQuote = document.querySelectorAll('span') // get all spans which have character of quote
  const arrayValue = quoteInput.value.split('') // convert the text in textarea into array of character
  // check is correct or not
  let correct = true
  arrayQuote.forEach((charSpans, index) => {
    const character = arrayValue[index]
    if (character == null) {
      charSpans.classList.remove('correct')
      charSpans.classList.remove('incorrect')
      correct = false
    } else if (character === charSpans.innerText) {
      charSpans.classList.add('correct')
      charSpans.classList.remove('incorrect')
      correct = true
    } else {
      charSpans.classList.remove('correct')
      charSpans.classList.add('incorrect')
      correct = false
    }
  })
  if (correct) {
    renderNewQuote()
  }
})

let startTime

function startTimer() {
  timer.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
renderNewQuote()
