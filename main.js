async function getRecipes(){
    const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
    const data = await response.json();
    const recipe = data.recipes;
    const result = recipe.map(function (ele){
        return `
            <div>
                <h2>${ele.title}</h2>
                <img src="${ele.image_url}"/>
            </div>
        `;
    }).join('');
    document.querySelector(".pizza").innerHTML+=result;
}
getRecipes();