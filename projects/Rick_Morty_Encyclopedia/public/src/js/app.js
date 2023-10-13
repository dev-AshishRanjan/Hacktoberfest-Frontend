"use strict";
const allCharactersUrl = `https://rickandmortyapi.com/api/character`;
const siteUrl = `https://rickandmortyapi.com`;
let itemsArray = [];
let search = document.getElementById("search");
let tilesGrid = document.querySelector(".tiles-grid");
let loader = document.querySelector(".loader");
let searchButton = document.querySelector("button");
let pages = document.querySelector(".pages");
let pageCount = 1;
let nextPage = document.querySelector(".next-page");
const overlay = document.querySelector(".overlay");

fetch(allCharactersUrl)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    itemsArray = data.results;
    itemsArray.forEach(generateItem);
  })
  .catch((err) => {
    console.log(err);
  });

const generateItem = (value) => {
  let div = document.createElement("div");
  div.className = "grid-item";

  let text = `<div class="img-div">
                        <a href="${siteUrl}" target="_blank"><img class="img-responsive img-thumbnail" src="${value.image}"
                                alt="${value.name}" /> </a>
                    </div>
                    <div class="link-div">
                        <span> <a href="${siteUrl}" target="_blank"> ${value.name} </a> </span>
                        <div class="gender">${value.gender}</div>
                        <div class="location">${value.location.name}</div>
                        <div class="species">${value.species}</div>
                    </div>
                `;

  div.innerHTML = text;
  tilesGrid.appendChild(div);
  overlay.style.display = "none";
  loader.style.display = "none";
};

const pagination = () => {
  overlay.style.display = "block";
  loader.style.display = "block";
  pageCount += 1;
  let pageCountDiv = document.createElement("a");
  pageCountDiv.innerText = `  ${pageCount}  `;
  pages.append(pageCountDiv, nextPage);
  const pageUrl = allCharactersUrl + "?page=" + pageCount;
  loader.style.display = "block";
  if (pageCount <= 42) {
    fetch(pageUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.results) {
          itemsArray = data.results;
          itemsArray.forEach(generateItem);
        }
        overlay.style.display = "none";
        loader.style.display = "none";
      })
      .catch((err) => {
        console.log(err);
        loader.style.display = "none";
      });
  } else {
    pages.innerText = `You have reached to last page`;
    overlay.style.display = "none";
    loader.style.display = "none";
  }
};

nextPage.addEventListener("click", pagination);

const searchItems = () => {
  tilesGrid.innerHTML = "";
  const searchValue = search.value;
  const nameUrl = allCharactersUrl + "?name=" + searchValue;
  overlay.style.display = "block";
  loader.style.display = "block";

  fetch(nameUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.results) {
        itemsArray = data.results;
        itemsArray.forEach(generateItem);
      } else {
        noResult(data);
      }
      overlay.style.display = "none";
      loader.style.display = "none";
    })
    .catch((err) => {
      console.log(err);
      overlay.style.display = "none";
      loader.style.display = "none";
    });
};

const noResult = (data) => {
  let noResult = data.error;
  tilesGrid.innerHTML = `<h1>${noResult}</h1>`;
};

search.addEventListener("keyup", searchItems);
