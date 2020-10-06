const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const API_URL = "http://api.quotable.io/random";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    // If the author is blank, add 'Unknown'
    if (data.author === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerHTML = data.author;
    }
    // Reduce font size for long quotes
    if (data.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.content;
    removeLoadingSpinner();
  } catch (error) {
    console.log("API went wrong", error);
    getQuote();
  }
}

// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=Just found a new quote: ${quote} - ${author} (Recommended by my quote generator)`;
  window.open(twitterUrl, "_blank");
}

// Event listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
