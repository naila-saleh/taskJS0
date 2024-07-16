const getProduct = async ()=> {
    const params= new URLSearchParams(window.location.search);
    const id = params.get('id');
    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
}
const displayProduct =async ()=>{
    const data = await getProduct();
    const imgs = data.images.map((img)=>{
        return `
            <img src="${img}" width="400px"/>
        `;
    }).join('');
    const result = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <p>Price : ${data.price}</p>
            <p>Discount Percentage : ${data.discountPercentage}</p>
            <p>Rating : ${data.rating}</p>
            <p>Brand : ${data.brand}</p>
            <h3>Dimensions :</h3>
            <ul>
                <li>width : ${data.dimensions.width}</li>
                <li>height : ${data.dimensions.height}</li>
                <li>depth : ${data.dimensions.depth}</li>
            </ul>
            <p>Warranty Information : ${data.warrantyInformation}</p>
            <p>Shipping Information : ${data.shippingInformation}</p>
            <p>Return Policy : ${data.returnPolicy}</p>
    `;
    let reviews = data.reviews.map((review)=>{
        return `
            <p>Rating : ${review.rating}</p>
            <p>Comment : ${review.comment}</p>
            <p>Date : ${review.date}</p>
            <p>Reviewer Name : ${review.reviewerName}</p>
            <p>Reviewer Email : ${review.reviewerEmail}</p>
            <br/>
        `;
    }).join('');
    reviews = `<h3>Reviews :</h3>`+reviews;
    document.querySelector('.product').innerHTML=result;
    document.querySelector('.productImgs').innerHTML=imgs;
    document.querySelector('.productReviews').innerHTML=reviews;
}
displayProduct();