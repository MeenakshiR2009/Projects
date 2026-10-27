let tabs=document.querySelectorAll(".tab");
let inputs=document.querySelectorAll(".inp");
let valA=inputs[0];
let valB=inputs[1];
let hint=document.getElementById("hint");
let label=document.getElementById("label");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let info=document.getElementById("infoBtn");
let infoBox=document.getElementById("infoBox");
let close=document.getElementById("close");

let mode="and";

function setMode(tab){
    tabs.forEach(t => t.classList.remove("on"));
    tab.classList.add("on");
    mode=tab.id;

    valA.value="";
    valB.value="";
    result.textContent="--";
    result.classList.remove("many");
    note.textContent="Enter a value and press calculate to see the result here.";
    valA.classList.remove("bad");
    valB.classList.remove("bad");

    if (mode === "and"){
        valB.parentElement.hidden=false;
        label.textContent="Operand A";
        valA.placeholder="Enter an integer";
        valB.placeholder="Enter an integer";
        hint.textContent="Valid range: 32-bit integers";
    }
    else if (mode === "or"){
        valB.parentElement.hidden=false;
        label.textContent="Operand A";
        valA.placeholder="Enter an integer";
        valB.placeholder="Enter an integer";
        hint.textContent="Valid range: 32-bit integers";
    }
    else if (mode === "xor"){
        valB.parentElement.hidden=false;
        label.textContent="Operand A";
        valA.placeholder="Enter an integer";
        valB.placeholder="Enter an integer";
        hint.textContent="Valid range: 32-bit integers";
    }
    else if (mode === "not"){
        valB.parentElement.hidden=true;
        label.textContent="Operand A";
        valA.placeholder="Enter an integer";
        hint.textContent="Valid range: 32-bit integers";
    }
    else if (mode === "shift"){
        valB.parentElement.hidden=false;
        label.textContent="Number (x)";
        valA.placeholder="Enter an integer";
        valB.placeholder="Enter shift positions (e.g, 1)";
        hint.textContent="Valid range: Integers";
    }
}

tabs.forEach(tab =>{
    tab.onclick=function(){
        setMode(tab);
    }
})
if (tabs.length > 0){
    setMode(tabs[0]);
}

function showError(message,input){
    result.textContent="Invalid";
    note.textContent=message;
    input.classList.add("bad");
}

function calculate(){
    valA.classList.remove("bad");
    valB.classList.remove("bad");

    let a= Number(valA.value);
    if (valA.value.trim() === "" || isNaN(a)){
        showError("Please Enter a valid integer for Operand A",valA);
        return;
    }
    if (mode === "not"){
        let res = ~ a;
        result.textContent=" ~ "+a +" = "+res;
        result.classList.remove("many");
        note.textContent="Binary: "+(res >>> 0)+res.toString(2);
    }
    let b= Number(valB.value);
    if (valB.value.trim() === "" || isNaN(b)){
        showError("Please Enter a valid integer for Operand B",valB);
        return;
    }
    if (mode === "and"){
        let res = a & b;
        result.textContent=a +" & "+b +" = "+res;
        result.classList.remove("many");
        note.textContent="Binary: "+res.toString(2);
    }
    else if(mode === "or"){
        let res = a | b;
        result.textContent=a +" | "+b +" = "+res;
        result.classList.remove("many");
        note.textContent="Binary: "+res.toString(2);
    }
     else if(mode === "xor"){
        let res = a ^ b;
        result.textContent=a +" ^ "+b +" = "+res;
        result.classList.remove("many");
        note.textContent="Binary: "+res.toString(2);
    }
     else if(mode === "shift"){
        let left=a << b;
        let right=a >> b;
        let unSign=a >>> b;

        let lines="<div>"+a+" << "+b+" = "+left+"</div>"+
        "<div>"+a+" >> "+b+" = "+right+"</div>"+
        "<div>"+a+" >>>  "+b+" = "+unSign+"</div>";
        
        result.innerHTML=lines;
        result.classList.add("many");
        note.textContent="Bitwise shifts calculated for "+a;
    }
}

calc.onclick=calculate;


info.onclick=function(){
    if(infoBox.style.display == "block"){
        infoBox.style.display = "none"
    }
    else{
        infoBox.style.display = "block";
    }
}

close.addEventListener("click",function(){
    infoBox.style.display="none";
});

valA.addEventListener("input",function(){
    valA.classList.remove("bad");
})

valB.addEventListener("input",function(){
    valB.classList.remove("bad");
})

valA.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
});

valB.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
});




