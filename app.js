// app.js file

// code for fetch for projects
function compareByName(a, b) {
  return a.Name.localeCompare(b.Name);
}
let breakdownProjectList = [];
function breakdown(list) {
  const groupedProjects = {};
  list.forEach((project) => {
    const firstLetter = project.Name.charAt(0).toUpperCase();
    if (!groupedProjects[firstLetter]) {
      groupedProjects[firstLetter] = [];
    }
    groupedProjects[firstLetter].push(project);
  });
  for (const char in groupedProjects) {
    breakdownProjectList.push({ char, data: groupedProjects[char] });
  }
}
let ProjectList;
const projectBody = document.querySelector(".projects");
const searchTerm = window.location.search.split("=")[1] || "";
if (window.location.pathname === "/") {
  fetch("./contribution/ProjectList.json")
    .then((response) => {
      if (!response.ok) {
        return (ProjectList = [
          {
            Name: `Status: ${response.status}`,
            Author: "HTTP",
            tags: [`${response.status}`],
            Github: "",
            FilePath: "#",
            Description: "Use console to know this error better",
          },
        ]);
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // ProjectList = data;
      console.log({ searchTerm });
      console.log({ data });
      ProjectList = data.filter((ele) => {
        return (
          ele.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ele.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ele.tags.includes(searchTerm.toLowerCase())
        );
      });
      const SearchResultMetaData = document.querySelector(
        ".SearchResultMetaData"
      );
      searchTerm === ""
        ? (SearchResultMetaData.innerHTML = `Total : <span>${ProjectList.length}</span>`)
        : (SearchResultMetaData.innerHTML = `<span>${ProjectList.length}</span> Match found for <span>${searchTerm}</span>`);
      if (ProjectList.length == 0) {
        ProjectList = [
          {
            Name: `No Results found for ${searchTerm}`,
            Author: "search",
            tags: [`error`],
            Github: "",
            FilePath: "#",
            Description: "Use console to know this error better",
          },
        ];
        SearchResultMetaData.innerHTML = `<span>No</span> Match found for <span>${searchTerm}</span>`;
      }
      ProjectList.sort(compareByName);
      breakdown(ProjectList);
      console.log({ ProjectList });
      // console.log({ breakdownProjectList });
      // code for cards creation on homepage
      breakdownProjectList.map((groupData) => {
        const group = document.createElement("div");
        group.classList.add("group");
        const groupheader = document.createElement("h2");
        groupheader.classList.add("groupheader");
        groupheader.innerText = groupData.char + " ---";
        group.appendChild(groupheader);
        groupData.data &&
          groupData.data.map((project) => {
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
}

// theme selection
const html = document.documentElement;
const PIBtheme = localStorage.getItem("FDtheme") || "dark";
console.log(localStorage.getItem("FDtheme"));
handleChange(PIBtheme);
console.log({ PIBtheme });

function handleChange(val) {
  const sun = document.querySelector("#sun");
  const moon = document.querySelector("#moon");
  const lordIcon = document.querySelector(".lordIcon");
  if (val === "light") {
    html.classList.add("light");
    html.classList.remove("dark");
    sun.style.display = "none";
    moon.style.display = "block";
    lordIcon.setAttribute("colors", "primary:#000,secondary:#301e67");
  } else {
    html.classList.add("dark");
    html.classList.remove("light");
    sun.style.display = "block";
    moon.style.display = "none";
    lordIcon.setAttribute("colors", "primary:#d2b863,secondary:#5b8fb9");
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
if (window.location.pathname === "/contributors.html"|| window.location.pathname === "/contributors") {
  const SearchResultMetaData = document.querySelector(".SearchResultMetaData");
  try {
    fetch(
      "https://api.github.com/repos/dev-AshishRanjan/Hacktoberfest-Frontend/contributors?per_page=100"
    )
      .then((req) => req.json())
      .then((res) => {
        resList = res.filter((ele) => {
          return (
            ele.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
            JSON.stringify(ele.contributions).includes(searchTerm)
          );
        });
        console.log({ resList });
        searchTerm === ""
          ? (SearchResultMetaData.innerHTML = `Total : <span>${resList.length}</span>`)
          : (SearchResultMetaData.innerHTML = `<span>${resList.length}</span> Match found for <span>${searchTerm}</span>`);
        if (resList.length === 0) {
          resList = [
            {
              avatar_url:
                "https://avatars.githubusercontent.com/u/94990764?v=4",
              login: "No Match Found",
              contributions: 0,
            },
          ];
          SearchResultMetaData.innerHTML = `<span>No</span> Match found for <span>${searchTerm}</span>`;
        }
        resList.map((ele) => {
          generateCard(ele);
        });
        console.log({ res });
      })
      .catch((e) => {
        console.log({ e });
        resList = [
          {
            avatar_url: "https://avatars.githubusercontent.com/u/94990764?v=4",
            login: "404",
            contributions: 0,
          },
        ];
        SearchResultMetaData.innerHTML = `<span>Network</span> Error`;
        resList.map((ele) => {
          generateCard(ele);
        });
      });
  } catch (e) {
    console.log({ e });
  }
}

// footer
const footer = document.querySelector(".footer");
footer !== null
  ? (footer.innerHTML = `
<p>Open Source Project © <span>${new Date().getFullYear()}</span></p>
          <p>Developed by <a href="https://github.com/dev-AshishRanjan"><span>Kumar Ashish Ranjan</span></a> and <a href="/contributors.html"><span>Open Source Community</span></a></p>
`)
  : null;
