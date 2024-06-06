var body=document.querySelector('body');
var increse=document.querySelector(".increaseFontBtn");
var decrese=document.querySelector(".decreaseFontBtn");
function increaseFontSize(){
    body.classList.add("increaseFont");
    body.classList.remove("decreaseFont");
}
function decreaseFontSize(){
    body.classList.add("decreaseFont");
    body.classList.remove("increaseFont");
}
decrese.onclick=decreaseFontSize;
increse.onclick=increaseFontSize;