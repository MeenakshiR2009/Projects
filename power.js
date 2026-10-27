let tabs=document.querySelectorAll(".tab");
let input=document.querySelectorAll(".inp");
let base=input[0];
let expo=input[1];
let exp=document.getElementById("input");
let hint=document.getElementById("hint");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let info=document.getElementById("infoBtn");
let infoBox=document.querySelector(".infoBox");
let close=document.getElementById("close");

let mode="std";

function round(n){
    return Number(n.toFixed(10));
}

function setMode(tab){
    tabs.forEach(t => t.classList.remove("on"));
    tab.classList.add("on");
    mode=tab.id;

    base.value="";
    expo.value="";
    result.textContent="--";
    result.classList.remove("many");

    if (mode === "std"){
        exp.style.display="block";
        expo.disabled=false;
        hint.textContent="Valid range: All Numbers";
        note.textContent="Enter a base and component and press calculate to see the result";
    }
    else if(mode === "sqr"){
        exp.style.display="block";
        expo.value="2";
        expo.disabled=true;
        hint.textContent="The exponent is fixed at 2";
        note.textContent="Enter a base to see the square";
    }
    else if (mode === "cube"){
         exp.style.display="block";
        expo.value="3";
        expo.disabled=true;
        hint.textContent="The exponent is fixed at 3";
        note.textContent="Enter a base to see the cube";
    }
    else if (mode === "prop"){
        exp.style.display="none";
        hint.textContent="Enter a base to view common powers and roots";
        note.textContent="Enter a base to see properties";
    }
}

tabs.forEach(tab =>{
    tab.onclick=function(){
        setMode(tab);
    }
})

if(tabs.length > 0){
    setMode(tabs[0]);
}


calc.onclick=function() {
    let x=Number(base.value);
    if (base.value.trim() === "" || isNaN(x)){
        result.textContent="Invalid";
        note.textContent="Please enter a valid base number";
        return;
    }
    result.classList.remove("many");
    if (mode === "std"){
        let y= Number(expo.value);
         if (expo.value.trim() === "" || isNaN(y)){
        result.textContent="Invalid";
        note.textContent="Please enter a valid exponent number";
        return;
        }
        let res=Math.pow(x,y);
        result.textContent=Number(res.toFixed(10));
        note.textContent=x+"raised to the power of "+y;
    }
    else if(mode === "sqr"){
        let res=Math.pow(x,2);
        result.textContent=Number(res.toFixed(10));
        note.textContent="Square of "+x;
    }
    else if(mode === "cube"){
        let res=Math.pow(x,3);
        result.textContent=Number(res.toFixed(10));
        note.textContent="Cube of "+x;
    }
    else if (mode === "prop"){
        let square=Number(x*x);
        let cube=Number(x*x*x);

        let inverse;
        if (x === 0){
            inverse= "Undefined";
        }
        else{
            inverse=round(1/x);
        }
        let sqrt;
        if (x >= 0){
            sqrt= round(Math.sqrt(x));
        }
        else{
            sqrt="Not a real Number";
        }
        let cbrt=round(Math.cbrt(x));

        let lines=`
        <div>x<sup>2</sup>=${square}</div>
        <div>x<sup>3</sup>=${cube}</div>
        <div>√x=${sqrt}</div>
        <div>∛x=${cbrt}</div>
        `;
        result.innerHTML=lines;
        result.classList.add("many");
    }
}


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

base.addEventListener("input",function(){
    base.classList.remove("bad");
})


base.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calc.click();
    }
});
expo.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calc.click();
    }
});




