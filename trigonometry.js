let tabs=document.querySelectorAll(".tab");
let func=document.querySelectorAll(".func");
let unit=document.querySelectorAll(".unit");
let fnBox=document.getElementById("fnBox");
let label=document.getElementById("label");
let input=document.getElementById("value");
let hint=document.getElementById("hint");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let info=document.getElementById("infoBtn");
let close=document.getElementById("close");
let infoBox=document.querySelector(".infoBox");

let activeFunc="sin";
let activeUnit="deg";

function funcClick(){
    for (let i=0; i<func.length;i++){
        func[i].classList.remove("on");
    }
    this.classList.add("on");
    activeFunc=this.id;
    input.value="";
    result.textContent="";
    note.textContent="Select an angle, enter a value and press calculate";
    input.classList.remove("bad");
}
 for (let i=0; i<func.length;i++){
        func[i].onclick=funcClick;
}

function unitClick(){
    for (let i=0; i<unit.length;i++){
        unit[i].classList.remove("on");
    }
    this.classList.add("on");

    if(this === unit[0]){
        activeUnit="deg";
    }
    else{
        activeUnit="rad";
    }
}

for (let i=0; i<unit.length;i++){
        unit[i].onclick=unitClick;
}

function showError(message){
    result.textContent="Invalid";
    note.textContent=message;
    value.classList.add("bad");
}

function showUndefined(message){
    result.textContent="Undefined";
    note.textContent=message;
    value.classList.remove("bad");
}


function calculate(){
    input.classList.remove("bad");
    let val=Number(input.value);
    if(input.value.trim() === "" || isNaN(val)){
        showError("Please enter a valid number");
        return;
    }

    let rad=0;
    if (activeUnit === "deg"){
        rad=val* Math.PI/180;
    }
    else{
        rad=val;
    }

    if(activeFunc === "tan" && Math.abs(Math.cos(rad)) < 1e-12){
        showUndefined("Result is undefined");
        return;
    }
    if(activeFunc === "sec" && Math.abs(Math.cos(rad)) < 1e-12){
        showUndefined("Result is undefined");
        return;
    }
    if(activeFunc === "csc" && Math.abs(Math.sin(rad)) < 1e-12){
        showUndefined("Result is undefined");
        return;
    }
    if(activeFunc === "cot" && Math.abs(Math.sin(rad)) < 1e-12){
        showUndefined("Result is undefined");
        return;
    }

    let res=0;
    if (activeFunc === "sin"){
        res=Math.sin(rad);
    }
    if (activeFunc === "cos"){
        res=Math.cos(rad);
    }
    if (activeFunc === "tan"){
        res=Math.tan(rad);
    }
    if (activeFunc === "csc"){
        res=1/Math.sin(rad);
    }
    if (activeFunc === "sec"){
        res=1/Math.cos(rad);
    }
    if (activeFunc === "cot"){
        res=1/Math.tan(rad);
    }

    if(! isFinite(res)){
        showUndefined("Result is undefined");
        return;
    }

    let unitSymbol="";
    if(activeUnit === "deg"){
        unitSymbol="°";
    }
    else {
        unitSymbol="rad";
    }
    result.textContent=Number(res.toFixed(6));
    note.textContent=activeFunc + "(" + val + unitSymbol + ")";
}

calc.onclick=calculate;

info.onclick=function(){
    if(infoBox.style.display == "block"){
        infoBox.style.display == "none";
    }
    else{
        infoBox.style.display = "block";
    }
}

close.addEventListener("click",function(){
    infoBox.style.display="none";
});
input.addEventListener("input",function(){
    value.classList.remove("bad");
})

input.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
})











