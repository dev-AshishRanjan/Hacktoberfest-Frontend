// app.js file

// code for fetch for projects
let ProjectList;
const projectBody = document.querySelector(".projects");

fetch("./contribution/ProjectList.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    ProjectList = data;
    console.log({ ProjectList });
    // code for cards creation on homepage
    ProjectList.map((project) => {
      const card = document.createElement("a");
      card.classList.add("card");
      card.setAttribute("href", project.FilePath);
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const tags = document.createElement("div");
      tags.classList.add("tags");
      project.tags.forEach((ele) => {
        var tag = document.createElement("span");
        tag.innerHTML = ele;
        tag.classList.add("tag");
        tags.appendChild(tag);
      });
      const author=document.createElement("a");
      author.innerHTML="Author: "+project.Author;
      author.setAttribute("href",project.Github);
      h3.innerText = project.Name;
      p.innerHTML = project.Description;
      card.appendChild(h3);
      card.appendChild(tags);
      card.appendChild(author);
      card.appendChild(p);
      projectBody.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading JSON file:", error));
