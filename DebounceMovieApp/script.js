let rootElement = document.getElementById("root");
let my_api_key = "f8dc3934";
let inputSearch = document.getElementById("inputOne");

async function movieGet(Search) {
  try {
    let response = await fetch(
      `http://www.omdbapi.com/?apikey=${my_api_key}&s=${Search}`
    );
    let data = await response.json();
    console.log(data);
    movieData(data.Search);
  } catch (error) {
    console.log(error, "error");
  }
}

function movieData(data) {
  rootElement.innerHTML = "";

  if (!data) {
    let notFound = document.createElement("p");
    notFound.innerText = "Not Found Search";
    rootElement.append(notFound);
  } else {
    data.map((ele) => {
      let movieCard = document.createElement("div");
      movieCard.className = "movieCard";
      let moviePoster = document.createElement("img");
      moviePoster.src = ele.Poster;
      moviePoster.className = "imgPoster";
      let movieTitle = document.createElement("p");
      movieTitle.innerText = `Title :  ${ele.Title}`;
      movieTitle.className = "titleMovie";

      movieCard.append(moviePoster, movieTitle);
      rootElement.append(movieCard);
    });
  }
}
// function debounce(movieFunc, timeOut) {
//   let timing;
//   function back(Search) {
//     clearTimeout(timing);
//     timing = setTimeout(() => {
//       movieFunc(Search);
//     }, timeOut);
//   }
//   return back;
// }
// let SearchBounce = debounce(movieGet, 500);
let timer = null;

inputSearch.addEventListener("input", () => {
  let inputValue = inputSearch.value;
  clearTimeout(timer);
  timer = setTimeout(() => {
    movieGet(inputValue);
  }, 500);
});
