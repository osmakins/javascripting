const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('next-quote');
const loader = document.getElementById('loader');

// Fetching quotes from API
let apiQuotes = [];

async function getQuotes(){
  loading()
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json();
    randQuote();
  } catch (error) {
    
  }
};

function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadfull(){
  quoteContainer.hidden = false;
  loader.hidden = true;

}

function randQuote(){
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  quote.author ? authorText.textContent = quote.author : authorText.textContent = 'unknown';

  (quote.text.length > 50) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
  quoteText.textContent = quote.text;
  loadfull()
}

// Tweet quote
function tweetQuote(){
  const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', randQuote);
twitterBtn.addEventListener('click', tweetQuote)


// onload call
getQuotes();