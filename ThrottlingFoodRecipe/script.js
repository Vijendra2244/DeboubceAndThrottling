let searchFood = document.getElementById("inputOne");
let rootElement = document.getElementById("root");

let getRecipe = async (query) => {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    let data = await res.json();
    console.log(data);
    getDataFood(data.meals);
  } catch (error) {
    console.log(error, "error");
  }
};

// function throttle(func, delay) {
//   let throttling = false;
//   function innerThrottle(query) {
//     if (throttling == false) {
//       func(query);
//       setTimeout(() => {
//         throttling = false;
//       }, delay);
//     }
//   }
//   return innerThrottle;
// }

// let throttleSearch = throttle(getRecipe, 300);
let timer = null;
searchFood.addEventListener("input", () => {
  let throttling = false;
  let inputValue = searchFood.value;
  // throttleSearch(inputValue);
  if (throttling == false) {
    getRecipe(inputValue);
    setTimeout(function () {
      throttling = false;
    }, 300);
  }
});

function getDataFood(food) {
  rootElement.innerHTML = "";
  if (!food || food.length == 0) {
    let found = document.createElement("p");
    found.className = "found";
    found.textContent = "Not Found";
    rootElement.append(found);
  } else {
    food.forEach((element) => {
      let foodDiv = document.createElement("div");
      foodDiv.className = "foodCard";
      let strMeal = document.createElement("h1");
      strMeal.className = "foodName";
      strMeal.textContent = element.strMeal;
      let strInstructions = document.createElement("p");
      strInstructions.className = "strInstruct";
      strInstructions.textContent =
        element.strInstructions.slice(0, 200) + "....";
      let strMealThumbImage = document.createElement("img");
      strMealThumbImage.src = element.strMealThumb;
      strMealThumbImage.className = "imageMeal";

      let strSourceA = document.createElement("a");
      strSourceA.href = element.strSource;
      strSourceA.className = "anchorMeal";

      strSourceA.textContent = "View Details";
      foodDiv.append(strMeal, strInstructions, strMealThumbImage, strSourceA);
      rootElement.append(foodDiv);
    });
  }
}
