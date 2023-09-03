/// <reference types="../@types/jquery/" />
//! **************************Global variables****************************
const nameInput = document.getElementById("nameInput");
const nameAlert = document.getElementById("nameAlert");
const emailInput = document.getElementById("emailInput");
const emailAlert = document.getElementById("emailAlert");
const phoneInput = document.getElementById("phoneInput");
const phoneAlert = document.getElementById("phoneAlert");
const ageInput = document.getElementById("ageInput");
const ageAlert = document.getElementById("ageAlert");
const passwordInput = document.getElementById("passwordInput");
const passwordAlert = document.getElementById("passwordAlert");
const rePassword = document.getElementById("rePassword");
const btnSubmit = document.getElementById("btnSubmit");
const searchNameInput = document.getElementById("searchName");
const searchLetterInput = document.getElementById("searchLetter");
const aside = $(".side-bar");
//! **************************lOADING SPINNER****************************
(function loading() {
    $(".loader").fadeOut(2000, function () {
        $(".loading").slideUp(3000, function () {
            $("body").css("overflow", "auto");
        });
    });
})();
//! **************************ASIDE BAR*********************************
// show sidebar
function showMenu() {
    $(".side-nav").animate({ width: "toggle" }, 1000);
    $(".menu").toggleClass("d-none");
    $(".x-mark").toggleClass("d-none");
}

// get details of all meals
async function getDetails(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json();
    // console.log(response.meals[0])
    displayDetailsSearchLetter(response.meals[0]);
    displayDetailsHome(response.meals[0]);
    console.log(response.meals[0])
    displayDetailsArea(response.meals[0]);
    displayDetailsIngrediants(response.meals[0]);
}
//! **************************get home and display details*********************************
//get api home
async function getApiHome() {
    let https = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let responseHome = await https.json();
    console.log(responseHome);
    displayHome(responseHome.meals);
}
getApiHome();

// display home
function displayHome(meals) {
    let cols = ``;
    // console.log(meals)
    for (let i = 0; i < meals.length; i++) {
        // console.log("hello");
        cols += `
        <div class="col-md-3" onclick="getDetails(${meals[i].idMeal})">
        <div  class="homemeal  rounded-2">
            <img class="w-100" src="${meals[i].strMealThumb}" alt="" >
            <div class="homemeal-layer text-center p-2 d-flex align-items-center ">
            <h3>${meals[i].strMeal}</h3>
            </div>
        </div>
</div>
        `;
    }
    document.getElementById("homeInfo").innerHTML = cols;
    // console.log ("hello");
}
// display details of each meal
function displayDetailsHome(mealId) {
    let pageDetails = `<div class="row py-5 g-4">
    <div class="col-md-4">
        <img class="w-100 rounded-3"
            src="${mealId.strMealThumb}" alt="">
        <h2>${mealId.strMeal}</h2>
    </div>
    <div class="col-md-8 px-2">
        <h2>Instructions</h2>
        <p>${mealId.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${mealId.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${mealId.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure1} ${mealId.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure2} ${mealId.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure3} ${mealId.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure4} ${mealId.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure5} ${mealId.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure6} ${mealId.strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure7} ${mealId.strIngredient7}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure8} ${mealId.strIngredient8}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure9} ${mealId.strIngredient9}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure10} ${mealId.strIngredient10}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure11} ${mealId.strIngredient11}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure12} ${mealId.strIngredient12}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure13} ${mealId.strIngredient13}</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${mealId.strTags}</li>
        </ul>
        <a target="_blank" href="${mealId.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealId.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
</div>`;
    $(".homemeal ").on("click", function () {
        $("#home").addClass("d-none");
        $("#home").removeClass("d-block");
        $(".display-details").removeClass("d-none");
        $(".display-details").addClass("d-block");
        $(".display-Relative").removeClass("d-block");
        $(".display-Relative").addClass("d-none");
        // console.log("hello")
    });
    document.getElementById("pageInfo").innerHTML = pageDetails;
}

//! **************************get categories and display details*********************************
// api categories
async function getApiCategories() {
    let https = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let responseCategories = await https.json();
    // console.log(responseCategories.categories);
    displayCategories(responseCategories.categories);
}
getApiCategories();
// display categories
function displayCategories(categories) {
    let cols = ``;
    for (let i = 0; i < categories.length; i++) {
        // console.log("hello");
        cols += `
        <div class="col-md-3"> 
        <div onclick="getMealsCategories('${categories[i].strCategory
            }')" class="foodcate rounded-2">
            <img class="w-100" src="${categories[i].strCategoryThumb
            }" alt="" srcset="">
            <div class="foodcate-layer text-center p-2">
                <h3>${categories[i].strCategory}</h3>
                <p>${categories[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
        </div>
    </div>
        `;
    }
    document.getElementById("infoCategories").innerHTML = cols;
    // console.log ("hello")
}

// get relative categories
async function getMealsCategories(meals) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`);
    response = await response.json();
    // console.log(response.meals)
    displayRelativeCateg(response.meals);
}
// display relative categories
function displayRelativeCateg(response) {
    $("#relativeCategories").removeClass("d-none");
    let cols = ``;
    // console.log(response);
    for (i = 0; i < response.length; i++) {
        cols += `<div class="col-md-3">
        <div onclick=" getDetails(${response[i].idMeal})" class="homemeal relative rounded-2 d-flex ">
            <img class="w-100" src="${response[i].strMealThumb}" alt="" >
            <div class="homemeal-layer text-center p-2 d-flex align-items-center ">
            <h3>${response[i].strMeal}</h3>
            </div>
        </div>
</div> `;
        // console.log("hello")
    }
    $("#categories").addClass("d-none");
    $("#categories").removeClass("d-block");
    $(".display-Relative").removeClass("d-none");
    $(".display-Relative").addClass("d-block");
    document.getElementById("relativeCategories").innerHTML = cols;
}

//! **************************get Area and display details*********************************
// api Area
async function getApiArea() {
    $(".loading").fadeIn(300);
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let responseArea = await https.json();
    // console.log(responseArea.meals);
    $(".loading").fadeOut(300);
    displayArea(responseArea.meals);
}
getApiArea();
// display Area
function displayArea(area) {
    let cols = ``;
    for (let i = 0; i < area.length; i++) {
        // console.log("hello");
        cols += `
        <div class="col-md-3" onclick="getAreaMeals('${area[i].strArea}')"> 
        <div class="icon">
            <i class="fa-solid fa-house-laptop fa-2xl"></i>
        </div>
        <div class="title">
            ${area[i].strArea}
        </div>
    </div>
        `;
    }
    document.getElementById("infoArea").innerHTML = cols;
}
// get meals by area
async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    // console.log (response);
    displayAreaMeals(response.meals.slice(0, 20));
    // console.log('hellohader');
}
// display meals get by area
function displayAreaMeals(meals) {
    let cols = ``;
    for (let i = 0; i < meals.length; i++) {
        // console.log("hello");
        cols += `
            <div class="col-md-3" onclick="getDetails(${meals[i].idMeal})">
            <div  class="areameal  rounded-2">
                <img class="w-100" src="${meals[i].strMealThumb}" alt="" >
                <div class="areameal-layer text-center p-2 d-flex align-items-center ">
                <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
    </div>
            `;
    }
    $("#area").removeClass("d-block");
    $("#area").addClass("d-none");
    $(".areameals").addClass("d-block");
    $(".areameals").removeClass("d-none");
    document.getElementById("areaMealInfo").innerHTML = cols;
}
// display details of each meal
function displayDetailsArea(mealId) {
    let pageDetails = `<div class="row py-5 g-4">
        <div class="col-md-4">
            <img class="w-100 rounded-3"
                src="${mealId.strMealThumb}" alt="">
            <h2>${mealId.strMeal}</h2>
        </div>
        <div class="col-md-8 px-2">
            <h2>Instructions</h2>
            <p>${mealId.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${mealId.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${mealId.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure1} ${mealId.strIngredient1}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure2} ${mealId.strIngredient2}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure3} ${mealId.strIngredient3}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure4} ${mealId.strIngredient4}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure5} ${mealId.strIngredient5}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure6} ${mealId.strIngredient6}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure7} ${mealId.strIngredient7}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure8} ${mealId.strIngredient8}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure9} ${mealId.strIngredient9}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure10} ${mealId.strIngredient10}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure11} ${mealId.strIngredient11}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure12} ${mealId.strIngredient12}</li>
                <li class="alert alert-info m-2 p-1">${mealId.strMeasure13} ${mealId.strIngredient13}</li>
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-danger m-2 p-1">${mealId.strTags}</li>
            </ul>
            <a target="_blank" href="${mealId.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${mealId.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
    </div>`;

    $(".areameals").addClass("d-none");
    $(".areameals").removeClass("d-block");
    $(".display-details").removeClass("d-none");
    $(".display-details").addClass("d-block");
    $(".display-Relative").addClass("d-none");
    $(".display-Relative").removeClass("d-block");
    // console.log("hello")

    document.getElementById("pageInfo").innerHTML = pageDetails;
}
//! **************************get Ingredients and display details*********************************
//get api ingredients
async function getApiIngredients() {
    let https = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let responseIngredients = await https.json();
    // console.log(responseIngredients.meals);
    displayIngredients(responseIngredients.meals.slice(0, 20));
}
getApiIngredients();
//display ingredients
function displayIngredients(ingredients) {
    let cols = ``;
    for (let i = 0; i < ingredients.length; i++) {
        cols += `
        <div class="col-md-3 ingred" onclick="getIngredient('${ingredients[i].strIngredient
            }')"> 
        <div class="icon">
        <i class="fa-solid fa-drumstick-bite fa-2xl"></i>
        </div>
        <div class="title">
            <h3>${ingredients[i].strIngredient}</h3>
            <p>${ingredients[i].strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
        </div>
    </div>
        `;
    }
    document.getElementById("infoData").innerHTML = cols;
    // console.log ("hello")
}
// get details ingrediant
async function getIngredient(mealName) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`);
    response = await response.json();
    // console.log(mealName);
    // console.log(response);
    setIngredient(response.meals);
}
// display details ingrediant
function setIngredient(meals) {
    $("#ingredients").addClass("d-none");
    $("#ingredients").removeClass("d-block");
    $(".ingredientsMeals").addClass("d-block");
    $(".ingredientsMeals").removeClass("d-none");
    let cols = ``;
    for (let i = 0; i < meals.length; i++) {
        // console.log("hello");
        cols += `
        <div class="col-md-3" onclick="getDetails(${meals[i].idMeal})">
        <div  class="areameal  rounded-2">
            <img class="w-100" src="${meals[i].strMealThumb}" alt="" >
            <div class="areameal-layer text-center p-2 d-flex align-items-center ">
            <h3>${meals[i].strMeal}</h3>
            </div>
        </div>
</div>
        `;
    }
    document.getElementById("ingredDisplay").innerHTML = cols;
}
// display details of each meal
function displayDetailsIngrediants(mealId) {
    let pageDetails = `<div class="row py-5 g-4">
    <div class="col-md-4">
        <img class="w-100 rounded-3"
            src="${mealId.strMealThumb}" alt="">
        <h2>${mealId.strMeal}</h2>
    </div>
    <div class="col-md-8 px-2">
        <h2>Instructions</h2>
        <p>${mealId.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${mealId.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${mealId.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure1} ${mealId.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure2} ${mealId.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure3} ${mealId.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure4} ${mealId.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure5} ${mealId.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure6} ${mealId.strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure7} ${mealId.strIngredient7}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure8} ${mealId.strIngredient8}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure9} ${mealId.strIngredient9}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure10} ${mealId.strIngredient10}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure11} ${mealId.strIngredient11}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure12} ${mealId.strIngredient12}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure13} ${mealId.strIngredient13}</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${mealId.strTags}</li>
        </ul>
        <a target="_blank" href="${mealId.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealId.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
</div>`;

    $(".ingredientsMeals").addClass("d-none");
    $(".ingredientsMeals").removeClass("d-block");
    $(".display-details").removeClass("d-none");
    $(".display-details").addClass("d-block");
    $(".display-Relative").addClass("d-none");
    $(".display-Relative").removeClass("d-block");
    // console.log("hello")

    document.getElementById("pageInfo").innerHTML = pageDetails;
}
//! **************************get search by name meals and display details*********************************
//get value search by name
$(searchNameInput).on("input", function () {
    let text = searchNameInput.value;
    searchByName(text);
    // console.log(text);
});
// get meals search by name
async function searchByName(text) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
    response = await response.json();
    // console.log(response);
    displaySearchName(response.meals);
}
// display search by name
function displaySearchName(response) {
    let cols = ``;
    // console.log(response);
    for (i = 0; i < response.length; i++) {
        cols += `  <div class="col-md-3">
        <div onclick="getDetails(${response[i].idMeal})" class="searchmeal rounded-2">
            <img class="w-100" src="${response[i].strMealThumb}" alt="" srcset="">
            <div class="searchmeal-layer text-center p-2 d-flex align-items-center ">
            <h3>${response[i].strMeal}</h3>
            </div>
        </div>
        </div> `;
        // console.log("hello")
    }
    document.getElementById("infoSearch").innerHTML = cols;
}
// display details of each meal
function displayDetailsSearchLetter(mealId) {
    $(".searchmeal").on("click", function () {
        $("#search").addClass("d-none");
        $("#search").removeClass("d-block");
        $(".display-details").removeClass("d-none");
        $(".display-details").addClass("d-block");
        // console.log("hello")
    });
    let pageDetails = `<div class="row py-5 g-4">
    <div class="col-md-4">
        <img class="w-100 rounded-3"
            src="${mealId.strMealThumb}" alt="">
        <h2>${mealId.strMeal}</h2>
    </div>
    <div class="col-md-8 px-2">
        <h2>Instructions</h2>
        <p>${mealId.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${mealId.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${mealId.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure1} ${mealId.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure2} ${mealId.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure3} ${mealId.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure4} ${mealId.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure5} ${mealId.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure6} ${mealId.strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure7} ${mealId.strIngredient7}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure8} ${mealId.strIngredient8}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure9} ${mealId.strIngredient9}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure10} ${mealId.strIngredient10}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure11} ${mealId.strIngredient11}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure12} ${mealId.strIngredient12}</li>
            <li class="alert alert-info m-2 p-1">${mealId.strMeasure13} ${mealId.strIngredient13}</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${mealId.strTags}</li>
        </ul>
        <a target="_blank" href="${mealId.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${mealId.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
</div>`;
    document.getElementById("pageInfo").innerHTML = pageDetails;
}

//! **************************get search by First Letter meals and display details*********************************
// get value search by first letter
$(searchLetterInput).on("input", function () {
    let text = searchLetterInput.value;
    searchByLetter(text);
});
// get meals search by first letter
async function searchByLetter(text) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
    response = await response.json();
    displaySearchLetter(response.meals);
}

// display search by first letter
function displaySearchLetter(response) {
    let cols = ``;
    // console.log(response);
    for (i = 0; i < response.length; i++) {
        cols += `
        <div class="col-md-3" onclick="getDetails(${response[i].idMeal})">
        <div class="searchmeal rounded-2">
            <img class="w-100" src="${response[i].strMealThumb}" alt="" srcset="">
            <div class="searchmeal-layer text-center p-2 d-flex align-items-center ">
            <h3>${response[i].strMeal}</h3>
            </div>
        </div>
        </div> `;
        // console.log("hello")
    }
    document.getElementById("infoSearch").innerHTML = cols;
}


//todo: organize d-none and d-block
$(".x-menu").on("click", function () {
    showMenu();
});
$("#Contact").on("click", function () {
    $("#contact").addClass("d-block");
    $("#contact").removeClass("d-none");
    $("#search").addClass("d-none");
    $("#area").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#home").addClass("d-none");
    $(".display-details").addClass("d-none");
    $("#relativeCategories").addClass("d-none");
    $("#relativeCategories").removeClass("d-block");
    $(".areaMealInfo").addClass("d-none");
    $(".ingredientsMeals").addClass("d-none");
    showMenu();
});
$("#Search").on("click", function () {
    $("#search").addClass("d-block");
    $("#search").removeClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#area").addClass("d-none");
    $("#contact").addClass("d-none");
    $("#home").addClass("d-none");
    $(".display-details").addClass("d-none");
    $("#relativeCategories").addClass("d-none");
    $("#relativeCategories").removeClass("d-block");
    $(".areameals").addClass("d-none");
    $(".ingredientsMeals").addClass("d-none");
    showMenu();
});
$("#Area").on("click", function () {
    $("#area").addClass("d-block");
    $("#area").removeClass("d-none");
    $("#categories").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#search").addClass("d-none");
    $("#contact").addClass("d-none");
    $("#home").addClass("d-none");
    $(".display-details").addClass("d-none");
    $("#relativeCategories").addClass("d-none");
    $("#relativeCategories").removeClass("d-block");
    $(".areameals").addClass("d-none");
    $(".ingredientsMeals").addClass("d-none");
    showMenu();
});
$("#Categories").on("click", function () {
    $("#categories").addClass("d-block");
    $("#categories").removeClass("d-none");
    $("#area").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#search").addClass("d-none");
    $("#contact").addClass("d-none");
    $("#home").addClass("d-none");
    $(".display-details").addClass("d-none");
    $("#relativeCategories").addClass("d-none");
    $("#relativeCategories").removeClass("d-block");
    $(".areameals").addClass("d-none");
    $(".ingredientsMeals").addClass("d-none");
    showMenu();
});
$("#Ingredients").on("click", function () {
    $("#ingredients").addClass("d-block");
    $("#ingredients").removeClass("d-none");
    $("#area").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#search").addClass("d-none");
    $("#contact").addClass("d-none");
    $("#home").addClass("d-none");
    $(".display-details").addClass("d-none");
    $("#relativeCategories").addClass("d-none");
    $("#relativeCategories").removeClass("d-block");
    $(".areameals").addClass("d-none");
    $(".ingredientsMeals").addClass("d-none");
    showMenu();
});

//?======================== vaildtion contact ==================================
function validName() {
    let name = /^[a-zA-Z ]{3,20}$/;
    let text = nameInput.value;
    // is vaild
    if (name.test(text) == true) {
        $(nameInput).addClass("is-valid");
        $(nameInput).removeClass("is-invalid");
        $(nameAlert).addClass("d-none");
        // console.log('hello');
        return true;
    } else {
        $(nameInput).removeClass("is-valid");
        $(nameInput).addClass("is-invalid");
        $(nameAlert).removeClass("d-none");
        // console.log('hello');
        return false;
    }
}
function validEmail() {
    let email =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let text = emailInput.value;
    // is vaild
    if (email.test(text) == true) {
        $(emailInput).addClass("is-valid");
        $(emailInput).removeClass("is-invalid");
        $(emailAlert).addClass("d-none");
        // console.log('hello');
        return true;
    } else {
        $(emailInput).removeClass("is-valid");
        $(emailInput).addClass("is-invalid");
        $(emailAlert).removeClass("d-none");
        // console.log('hello');
        return false;
    }
}
function validPhone() {
    let phone = /^01[0125][0-9]{8}$/;
    let number = phoneInput.value;
    // if valid
    if (phone.test(number) == true) {
        $(phoneInput).addClass("is-valid");
        $(phoneInput).removeClass("is-invalid");
        $(phoneAlert).addClass("d-none");
        // console.log('hello');
        return true;
    } else {
        $(phoneInput).removeClass("is-valid");
        $(phoneInput).addClass("is-invalid");
        $(phoneAlert).removeClass("d-none");
        // console.log('hello');
        return false;
    }
}

function validAge() {
    let age = /^([1-9]|[1-9][0-9]|100)$/;
    let number = ageInput.value;
    // if valid
    if (age.test(number) == true) {
        $(ageInput).addClass("is-valid");
        $(ageInput).removeClass("is-invalid");
        $(ageAlert).addClass("d-none");
        // console.log('hello');
        return true;
    } else {
        $(ageInput).removeClass("is-valid");
        $(ageInput).addClass("is-invalid");
        $(ageAlert).removeClass("d-none");
        // console.log('hello');
        return false;
    }
}
function validPassword() {
    let password = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    let text = passwordInput.value;
    // if valid
    if (password.test(text) == true) {
        $(passwordInput).addClass("is-valid");
        $(passwordInput).removeClass("is-invalid");
        $(passwordAlert).addClass("d-none");
        // console.log('hello');
        return true;
    } else {
        $(passwordInput).removeClass("is-valid");
        $(passwordInput).addClass("is-invalid");
        $(passwordAlert).removeClass("d-none");
        // console.log('hello');
        return false;
    }
}
function validrePassword() {
    if (passwordInput.value == rePassword.value) {
        $(rePassword).addClass("is-valid");
        $(rePassword).removeClass("is-invalid");
        return true;
    } else {
        $(rePassword).removeClass("is-valid");
        $(rePassword).addClass("is-invalid");
        return false;
    }
}
//?========================Apply vaildtion on form contact==================================
$("form").on("input", function () {
    if (
        validName() == true &&
        validEmail() == true &&
        validAge() == true &&
        validPassword() == true &&
        validPhone() == true &&
        validrePassword() == true
    ) {
        $(btnSubmit).removeClass("disabled");
    } else {
        $(btnSubmit).addClass("disabled");
    }
});
