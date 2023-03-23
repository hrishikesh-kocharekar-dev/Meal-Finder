const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");

// Search Meal function
function fetchMeal(e) {
  e.preventDefault();

  // Getting the search term
  const term = search.value;

  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2> Search results
        for ${term} : `;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2> we don't have '${term}' </h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID="${meal.idMeal}">
          <h3>${meal.strMeal}</h3>
          </div>
          </div>
          `
            )
            .join("");
        }
      });
    // clear search text
    search.value = "";
  } else {
    alert("Type something up.");
  }
}

// Event listener
submit.addEventListener("submit", fetchMeal);
