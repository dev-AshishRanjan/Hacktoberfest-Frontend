const blogForm = document.getElementById('blog-form');
const postList = document.getElementById('post-list');

blogForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;

    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p>${description}</p>
    `;

    postList.appendChild(postCard);

    // Clear form fields
    blogForm.reset();
});
