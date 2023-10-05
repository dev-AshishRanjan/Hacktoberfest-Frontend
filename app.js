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
      const author = document.createElement("a");
      author.innerHTML = "Author: " + project.Author;
      author.setAttribute("href", project.Github);
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

// theme selection
const html = document.documentElement;
const PIBtheme = localStorage.getItem("FDtheme");
if (PIBtheme === null) {
  localStorage.setItem("FDtheme", "dark");
  PIBtheme = "dark";
}
handleChange(PIBtheme);
console.log({ PIBtheme });

function handleChange(val) {
  const sun = document.querySelector("#sun");
  const moon = document.querySelector("#moon");
  if (val === "light") {
    html.classList.add("light");
    html.classList.remove("dark");
    sun.style.display = "none";
    moon.style.display = "block";
  } else {
    html.classList.add("dark");
    html.classList.remove("light");
    sun.style.display = "block";
    moon.style.display = "none";
  }
  localStorage.setItem("FDtheme", val);
}
