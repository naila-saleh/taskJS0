var exchangeForm=document.querySelector(".exchangeForm");
var exchanges={};
exchangeForm.onsubmit=function (e){
    e.preventDefault();
    var elements=e.target.elements;
    exchanges={
        amount:elements[0].value,
        exchange:elements[1].value
    }
    printPriceExchange();
}
function printPriceExchange(){
    var data=``;
    var afterExchange=exchanges.amount;
    if(exchanges.exchange==="dollar")afterExchange=exchanges.amount*3.5;
    else if(exchanges.exchange==="dinar")afterExchange=exchanges.amount*5;
    data+=`
            <p class="result">The result after exchange : ${afterExchange}</p>
    `
    document.querySelector(".result").innerHTML=data;
}