const body = document.body;
const loader = document.getElementById('loader');
const template = document.getElementById('template').innerHTML;

// Fetching quotes from API
let apiQuotes = [];

async function getQuotes(){
  
  loading(true)
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json();
    randQuote();
  } catch (error) {
    console.log(error)
  }
};

function loading(action){
  loader.hidden = !action;
  const elem = body.firstElementChild;
  if(elem && elem.classList.contains('quote-container')) {
    elem.hidden = action;
  }
}

function strReplace(template, quote){
  let temp = ` ${template}`.substring(1);
  const maps = Object.entries({...quote, long: quote.text.length > 50 ? "long-quote": ""});
  maps.forEach(([key, value]) => {
    temp = temp.replace(`{${key}}`, value);
  });
  return temp;
}

function randQuote(){
  loading(true)
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const elem = body.firstElementChild;
  const str = strReplace(template, quote);
  const containerDiv = document.createElement('div');
  containerDiv.className="quote-container";
  containerDiv.id="quote-container";
  containerDiv.innerHTML = str;
  containerDiv.hidden = true;
  if (elem && elem.classList.contains('quote-container')) {
    elem.replaceWith(containerDiv);
  } else {
    body.insertBefore(containerDiv, loader);
  }
  setTimeout(() => loading(false, containerDiv), 1000)
  
}

// Tweet quote
function openLinks(e){
  e.preventDefault();
  if (e.target.id === 'next-quote') {
    randQuote();
  } else if (e.target.id === 'twitter') {
    const children = Array.from(body.firstElementChild.childNodes);
    const twitterUrl = `http://twitter.com/intent/tweet?text=${children[1].textContent} - ${children[3].textContent}`;
    window.open(twitterUrl, '_blank');
  }
}

// Event Listeners
body.addEventListener('click', openLinks);


// onload call
getQuotes();