window.onload = function() {
    getRandomMeme();
};

function getRandomMeme() {
    var memeImage = document.getElementById("memeImage");
    var memeInfo = document.getElementById("memeInfo");

    fetch("https://meme-api.com/gimme")
        .then(response => response.json())
        .then(data => {
            memeImage.src = data.url;
            memeImage.width = 400; // Set the width of the image (in pixels)
            memeImage.height = 400; // Set the height of the image (in pixels)

            memeInfo.innerHTML = `
                <p><strong>Subreddit:</strong> ${data.subreddit}</p>
                <p><strong>Post Link:</strong> <a href="${data.postLink}" target="_blank">${data.postLink}</a></p>
            `;
        })
        .catch(error => {
            console.error("Error fetching meme: ", error);
            memeImage.alt = "Failed to load meme.";
            memeImage.width = 0; // Hide the image if there's an error
            memeImage.height = 0;
            memeInfo.innerHTML = "<p>Failed to load meme information.</p>";
        });
}
