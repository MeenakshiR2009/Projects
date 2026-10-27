let value=document.getElementById("value");
let hint=document.getElementById("hint");
let calc=document.getElementById("calc");
let info=document.getElementById("infoBtn");
let close=document.getElementById("close");
let result=document.getElementById("result");
let note=document.getElementById("note");
let infoBox=document.querySelector(".infoBox");

function formatNumber(n){
    if (n === 0){
        return "0";
    }
    if (Math.abs(n) < 0.000001 || Math.abs(n) >= 1000000000000){
        return n.toExponential(6);
    }
    return String(Number(n.toFixed(10)));
}

function resetResult(){
    result.textContent="--";
    note.textContent="Enter a value and press calculate to see the result here."
    value.classList.remove("bad");
}

function showError(message){
    result.textContent="Invalid";
    note.textContent=message;
    value.classList.add("bad");
}

function calculate(){
    value.classList.remove("bad");
    try{
        let text=value.value.trim();
        if (text === ""){
            throw new Error("Please enter an exponent value");
        }
        let x=Number(text);
        if (isNaN(x)){
            throw new Error("Please enter a valid number");
        }
        if(x < -100 || x > 100){
            throw new Error("x must be between -100 to 100");
        }
        let res=Math.exp(x);
        if(! isFinite(res)){
            throw new Error("The result is too large");
        }
        result.textContent=formatNumber(res);
        note.textContent="e is about 2.71828 raised to the power "+x;
    }
    catch(error){
        showError(error.message);
    }
}

calc.addEventListener("click",calculate);

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
value.addEventListener("input",function(){
    value.classList.remove("bad");
})

value.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
});
resetResult();


