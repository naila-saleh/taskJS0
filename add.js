const addProductForm = document.querySelector('form');
addProductForm.onsubmit = async function (e){
    e.preventDefault();
    const elements = e.target.elements;
    const title = elements['title'].value;
    const price = elements['price'].value;
    const {data} = await axios.post(`https://dummyjson.com/products/add`,{title,price});
}