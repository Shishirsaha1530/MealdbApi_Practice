const spinner = document.getElementById("spinner");
const generateApi = () =>{
    let inputField = document.getElementById('inputField')
    let inputText = inputField.value;
    spinner.removeAttribute('hidden');
    if(inputText == ' '){
        alert('enter a valid input')
        spinner.setAttribute('hidden', '');
    }
    else{
    spinner.removeAttribute('hidden');
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=> {
         spinner.setAttribute('hidden', '');
         displayFoods(data.meals)
    } )
    }
    inputField.value= ' '   
}

const displayFoods = (item) =>{
    let foosShow = document.getElementById('foosShow')
    foosShow.textContent= ' '
    item.map((elem)=>{
        let div = document.createElement('div');
        let {strMeal,strCategory,strMealThumb,strInstructions,idMeal} = elem;
        div.innerHTML= `
            <div class="col">
                <div class="card h-100">
                    <img width="400" height="300" src="${strMealThumb}" class="img-fluid"  alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <h5> ${strCategory} </h5>
                        <p class="card-text"> ${strInstructions.slice(0,200)}</p>

                        <button onclick="displayDetails(${idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        See Details
                        </button>

                    </div>
                </div>
          
            </div>
        `
        foosShow.appendChild(div)
    })
}

let displayDetails = (ele) =>{
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayModal(data.meals[0]))
}

let displayModal = (element) =>{
     let {strMeal,strCategory,strMealThumb,strInstructions} = element;
    let singleFood = document.getElementById('singleFood');
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> ${strMeal} </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img width="200" height="300" src="${strMealThumb}">
                        <p> ${strCategory} </P>
                        <p> ${strInstructions.slice(0,200)} </P>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div> `
        singleFood.appendChild(div)
}
