let tabs=document.querySelectorAll(".tab");
let baseBox=document.getElementById("bValue");
let base=document.getElementById("value");
let hint=document.getElementById("hint");
let label=document.getElementById("label");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let info=document.getElementById("infoBtn");
let infoBox=document.querySelector(".infoBox");
let close=document.getElementById("close");

let mode="ln";

function round(n){
    return Number(n.toFixed(10));
}

function setMode(tab){
    tabs.forEach(t => t.classList.remove("on"));
    tab.classList.add("on");
    mode=tab.id;
    base.value="";
    baseBox.value="";
    result.classList.remove("many");
    base.classList.remove("bad");
    baseBox.classList.remove("bad");
    result.textContent="--";
    result.classList.remove("many");
    result.classList.remove("bad");

    let parent=baseBox.parentElement;

    if (mode === "ln"){
        parent.classList.add("hidden");
        hint.textContent="Valid range: x > 0";
        note.textContent="Enter a number to calculate its Natural logarithm(ln)";
    }
    else if (mode === "log10"){
        parent.classList.add("hidden");
        hint.textContent="Valid range: x > 0";
        note.textContent="Enter a number to calculate its Common logarithm(log₁₀)";
    }
    else if(mode === "log2"){
        parent.classList.add("hidden");
        hint.textContent="Valid range: x > 0";
        note.textContent="Enter a number to calculate its Bonary logarithm(log₂)";
    }
    else if(mode === "custom"){
        parent.classList.remove("hidden");
        hint.textContent="Valid range: x > 0, base > 0, base ≠ 1";
        note.textContent="Enter a number and base to  calculate";
    }
}

if (tabs.length > 0){
    setMode(tabs[0]);
}

function calculate(){
    base.classList.remove('bad');
    baseBox.classList.remove('bad');
    result.classList.remove('bad');

    if (!base){
        return;
    }

    let x=Number(base.value);
    if (base.value.trim()=== "" || isNaN(x)){
        result.textContent="Invalid";
        note.textContent="Please enter a valid number";
        base.classList.add("bad");
        return;
    }
    if(x <= 0){
        result.textContent="Undefined";
        note.textContent="Logarithm input must be greater than 0";
        base.classList.add("bad");
        return;
    }
    let res;
    if (mode === "ln"){
        res=Math.log(x);
        result.textContent=round(res);
        note.textContent="Natural logarithm of "+x;
    }
    else if(mode === "log10"){
        res=Math.log10(x);
        result.textContent=round(res);
        note.textContent="Common logarithm of "+x;
    }
    else if(mode === "log2"){
        res=Math.log2(x);
        result.textContent=round(res);
        note.textContent="Binary logarithm of "+x;
    }
    else if(mode === "custom"){
        let b=Number(baseBox.value);
        if (baseBox.value.trim()=== "" || isNaN(b)){
            result.textContent="Invalid";
            note.textContent="Please enter a valid number";
            baseBox.classList.add("bad");
            return;
        }

        if (b <=0 || b ===1){
            result.textContent="Invalid";
            note.textContent="Base must be greater than 0 and not equal to 1";
            baseBox.classList.add("bad");
            return;
        }

        res=Math.log(x)/Math.log(b);
        result.textContent=round(res);
        note.textContent="Logarithm of "+x+" to base "+b;
    }
     
    if(! isFinite(res)){
        result.textContent="Undefined";
        result.classList.add('bad');
        note.textContent="Result is undefined";
    }
}

tabs.forEach(function(tab){
    tab.addEventListener("click",function(){
        setMode(tab);
    });
});

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

baseBox.addEventListener("input",function(){
    baseBox.classList.remove("bad");
})

base.addEventListener("input",function(){
    base.classList.remove("bad");
})

base.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
});

baseBox.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
});

