const getProducts = async (page)=> {
    const limit = 15;
    const skip = (page - 1) * limit;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);//&select=title,price
    return data;
}
const displayProducts =async (page=1)=>{
    try{
        const data = await getProducts(page);
        const products = data.products;
        const noOfPages = Math.ceil(data.total / data.limit);
        const result = products.map((product)=>{
            return `
            <div class="product">
                <h2>${product.title}</h2>
                <img src="${product.thumbnail}"/>
                <div class="product-links">
                    <a href="details.html?id=${product.id}">details</a>
                    <button onclick="deleteProduct(${product.id})">delete</button>
                </div>
            </div>
       `
        }).join('');
        document.querySelector('.products').innerHTML=result;
        let paginationLinks =``;
        if(page > 1)
            paginationLinks += `<li class="page-item"><button onclick=displayProducts(${page-1}) class="page-link">&laquo;</button></li>`;
        else
            paginationLinks += `<li class="page-item disabled"><button class="page-link disabled">&laquo;</button></li>`;
        for(let i=1;i<=noOfPages;i++){
            paginationLinks+=`<li class="page-item"><button onclick=displayProducts(${i}) class="page-link">${i}</button></li>`;
        }
        if(page < noOfPages)
            paginationLinks+=`<li class="page-item"><button onclick=displayProducts(${parseInt(page)+1}) class="page-link">&raquo;</button></li>`;
        else
            paginationLinks+=`<li class="page-item disabled"><button class="page-link disabled">&raquo;</button></li>`;
        document.querySelector('.pagination').innerHTML=paginationLinks;
        const modal=document.querySelector('.modal');
        const closeBtn=document.querySelector('.closeBtn');
        const rightBtn=document.querySelector('.rightBtn');
        const leftBtn=document.querySelector('.leftBtn');
        const allImgs=Array.from(document.querySelectorAll('img'));
        let currIndex=0;
        rightBtn.addEventListener('click',()=>{
            currIndex++;
            if(currIndex>=allImgs.length-1)currIndex=0;
            const nextImgSrc = allImgs[currIndex].getAttribute('src');
            modal.querySelector('img').setAttribute('src',nextImgSrc);
        });
        leftBtn.addEventListener('click',()=>{
            currIndex--;
            if(currIndex<0)currIndex=allImgs.length-2;
            const prevImgSrc = allImgs[currIndex].getAttribute('src');
            modal.querySelector('img').setAttribute('src',prevImgSrc);
        });
        for (let i=0;i<allImgs.length;i++){
            allImgs[i].addEventListener('click',(e)=>{
                modal.classList.remove('d-none');
                modal.querySelector('img').setAttribute('src',e.target.src);
                const currImg=e.target;
                currIndex=allImgs.indexOf(currImg);
            });
        }
        closeBtn.addEventListener('click',()=>{
            modal.classList.add('d-none');
        });
        document.addEventListener('keydown',(e)=>{
            if(e.code=='ArrowRight'){
                currIndex++;
                if(currIndex>=allImgs.length-1)currIndex=0;
                const nextImgSrc = allImgs[currIndex].getAttribute('src');
                modal.querySelector('img').setAttribute('src',nextImgSrc);
            }else if(e.code=='ArrowLeft'){
                currIndex--;
                if(currIndex<0)currIndex=allImgs.length-2;
                const prevImgSrc = allImgs[currIndex].getAttribute('src');
                modal.querySelector('img').setAttribute('src',prevImgSrc);
            }else if(e.code=='Escape'){
                modal.classList.add('d-none');
            }
        });
        modal.addEventListener('click',(e)=>{
            if(modal==e.target)
                modal.classList.add('d-none');
        });
    }catch (e){
        const result=`
            <h2>Error</h2>
            <p>${e.message}</p>
        `;
        console.log(e);
        document.querySelector('.products').innerHTML=result;
    }finally {
        document.querySelector('.overlay').classList.add('d-none');
    }
}
const deleteProduct = async(id) =>{
    try {
        const {data} = await axios.delete(`https://dummyjson.com/products/${id}`);
        alert("product deleted successfully");
        location.href="index.html";
    }catch (e){
        alert("can't delete this product");
    }
}
displayProducts();
window.onscroll = function (){
    const nav = document.querySelector('nav');
    const about = document.querySelector('.about');
    if(window.scrollY >= about.offsetTop) {
        nav.classList.add('scrollNavbar');
    }else {
        nav.classList.remove('scrollNavbar');
    }
}