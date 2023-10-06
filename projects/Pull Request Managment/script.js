// script.js
function displayPullRequest() {
    const title = document.getElementById("prTitle").value;
    const author = document.getElementById("prAuthor").value;
    const description = document.getElementById("prDescription").value;

    const detailsDiv = document.getElementById("pullRequestDetails");

    // Create a new div element to hold the pull request details
    const newPullRequestDiv = document.createElement("div");
    newPullRequestDiv.className = "pull-request";

    // Append the pull request details to the new div
    newPullRequestDiv.innerHTML = `
        <strong>Pull Request Title:</strong> ${title}<br>
        <strong>Author:</strong> ${author}<br>
        <strong>Description:</strong> ${description}<br>
    `;

    // Append the new div to the existing pull request details
    detailsDiv.appendChild(newPullRequestDiv);

    // Clear the form fields
    document.getElementById("prTitle").value = "";
    document.getElementById("prAuthor").value = "";
    document.getElementById("prDescription").value = "";
}
