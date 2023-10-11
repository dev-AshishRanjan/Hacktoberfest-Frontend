const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    }
];

const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote() {
    quoteText.classList.add("hidden");
    author.classList.add("hidden");
    setTimeout(() => {
        const { text, author } = getRandomQuote();
        quoteText.textContent = text;
        author.textContent = `- ${author}`;
        quoteText.classList.remove("hidden");
        author.classList.remove("hidden");
    }, 500);
}

newQuoteButton.addEventListener("click", displayQuote);

// Initial quote display
displayQuote();
