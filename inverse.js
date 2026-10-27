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

let activeFunc="asin";
let activeUnit="deg";

function funcClick(){
    for (let i=0; i<func.length;i++){
        func[i].classList.remove("on");
    }
    this.classList.add("on");
    activeFunc=this.id;
    input.value="";
    result.textContent="";
    if (activeFunc == "asin" || activeFunc == "acos"){
        hint.textContent="Valid range: -1 to 1";
        input.placeholder="Enter value (e.g., 0.5, 1, -0.5)"
    }
    else if (activeFunc == "acsc" || activeFunc == "asec"){
        hint.textContent="Valid range: x>=1 or x<=-1";
        input.placeholder="Enter value (e.g.,2,-2)"
    }
    else{
        hint.textContent="Valid range: All numbers";
        input.placeholder="Enter value (e.g., 0,1,10)"
    }
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
    input.classList.add("bad");
}

function showUndefined(message){
    result.textContent="Undefined";
    note.textContent=message;
    input.classList.remove("bad");
}


function calculate(){
    input.classList.remove("bad");
    let val=Number(input.value);
    if(input.value.trim() === "" || isNaN(val)){
        showError("Please enter a valid number");
        return;
    }

    if((activeFunc === "asin" || activeFunc === "acos") && (val < -1 || val >1)){
        showUndefined("Input must be between -1 and 1");
        return;
    }
    if((activeFunc === "acsc" || activeFunc === "asec") && (Math.abs(val) < 1) ){
        showUndefined("Input must be >= 1 or <=-1");
        return;
    }
     if((activeFunc === "acsc" || activeFunc === "asec") && val === 0 ){
        showUndefined("Result is undefined");
        return;
    }

    let res=0;
    if (activeFunc === "asin"){
        res=Math.asin(val);
    }
    if (activeFunc === "acos"){
        res=Math.acos(val);
    }
    if (activeFunc === "atan"){
        res=Math.atan(val);
    }
    if (activeFunc === "acsc"){
        res=Math.asin(1/val);
    }
    if (activeFunc === "asec"){
        res=Math.acos(1/val);
    }
    if (activeFunc === "acot"){
        res=Math.atan(1/val);
    }

    if(! isFinite(res)){
        showUndefined("Result is undefined");
        return;
    }
    let rad=0;
    let angle=0;
    let unitSymbol="";
    if(activeUnit === "deg"){
        angle=res*(180/Math.PI);
        unitSymbol="°";
    }
    else {
        angle=res;
        unitSymbol="rad";
    }
    result.textContent=Number(angle.toFixed(6));
    note.textContent=activeFunc + "(" + val + ") = "+result.textContent+unitSymbol;
}

calc.onclick=calculate;

info.onclick=function(){
    if(infoBox.style.display == "block"){
        infoBox.style.display = "none";
    }
    else{
        infoBox.style.display = "block";
    }
}

close.addEventListener("click",function(){
    infoBox.style.display="none";
});
input.addEventListener("input",function(){
    input.classList.remove("bad");
})

input.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
})











