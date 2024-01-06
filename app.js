// app.js file

// code for fetch for projects
function compareByName(a, b) {
  return a.Name.localeCompare(b.Name);
}
let breakdownProjectList = [];
function breakdown(list) {
  // breakdownProjectList = [];

  // Create an object to group projects by the first letter of their names
  const groupedProjects = {};

  // Iterate through each project in the list
  list.forEach((project) => {
    // Get the first letter of the project name
    const firstLetter = project.Name.charAt(0).toUpperCase();

    // If the letter is not in the groupedProjects object, create an array for it
    if (!groupedProjects[firstLetter]) {
      groupedProjects[firstLetter] = [];
    }

    // Add the project to the array corresponding to its first letter
    groupedProjects[firstLetter].push(project);
  });

  // Create the final breakdownProjectList array
  for (const char in groupedProjects) {
    breakdownProjectList.push({ char, data: groupedProjects[char] });
  }
}
let ProjectList;
const projectBody = document.querySelector(".projects");

fetch("./contribution/ProjectList.json")
  .then((response) => {
    if (!response.ok) {
      return ProjectList=[{
        "Name": `Status: ${response.status}`,
        "Author": "HTTP",
        "tags": [`${response.status}`],
        "Github": "",
        "FilePath": "#",
        "Description": "Use console to know this error better"
      }];
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    ProjectList = data;
    ProjectList.sort(compareByName);
    breakdown(ProjectList);
    console.log({ ProjectList });
    // console.log({ breakdownProjectList });
    // code for cards creation on homepage
    breakdownProjectList.map((groupData)=>{
      const group = document.createElement("div");
      group.classList.add("group");
      const groupheader=document.createElement("h2");
      groupheader.classList.add("groupheader");
      groupheader.innerText=groupData.char+" ---";
      group.appendChild(groupheader);
      groupData.data && groupData.data.map((project) => {
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
        group.appendChild(card);
      });
      projectBody.appendChild(group);
    });
  })
  .catch((error) => console.error("Error loading JSON file:", error));



// theme selection
const html = document.documentElement;
const PIBtheme = localStorage.getItem("FDtheme")||"dark";
console.log(localStorage.getItem("FDtheme"));
handleChange(PIBtheme);
console.log({ PIBtheme });

function handleChange(val) {
  const sun = document.querySelector("#sun");
  const moon = document.querySelector("#moon");
  const lordIcon=document.querySelector(".lordIcon");
  if (val === "light") {
    html.classList.add("light");
    html.classList.remove("dark");
    sun.style.display = "none";
    moon.style.display = "block";
    lordIcon.setAttribute("colors","primary:#000,secondary:#301e67");
  } else {
    html.classList.add("dark");
    html.classList.remove("light");
    sun.style.display = "block";
    moon.style.display = "none";
    lordIcon.setAttribute("colors","primary:#d2b863,secondary:#5b8fb9");
  }
  localStorage.setItem("FDtheme", val);
}



// code for contributors
const contributors = document.querySelector(".contributors");

function generateCard(ele) {
  const card = document.createElement("a");
  card.classList.add("card");
  card.setAttribute("href", ele.html_url);
  card.setAttribute("target", "_blank");
  card.innerHTML = `
  <img src=${ele.avatar_url} loading="lazy"/>
  <h2>${ele.login}</h2>
  <p>Contributions : ${ele.contributions}</p>
  `;
  contributors.appendChild(card);
}

try {
  fetch(
    "https://api.github.com/repos/dev-AshishRanjan/Hacktoberfest-Frontend/contributors?per_page=100"
  )
    .then((req) => req.json())
    .then((res) => {
      res.map((ele) => {
        generateCard(ele);
      });
      console.log({ res });
    })
    .catch((e) => {
      contributors.innerText = "Network Error";
    });
} catch (e) {
  contributors.innerText = "Network Error";
}
