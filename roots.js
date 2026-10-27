let tabs=document.querySelectorAll(".tab");
let inputs=document.querySelectorAll(".inp");
let input=document.getElementById("value");
let rootVal=document.getElementById("rootVal");
let rootBox=document.getElementById("rootBox");
let hint=document.getElementById("hint");
let label=document.getElementById("label");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let info=document.getElementById("infoBtn");
let infoBox=document.getElementById("infoBox");
let close=document.getElementById("close");

let mode="sqr";

function round(n){
    return Number(n.toFixed(10));
}

function setMode(tab){
    tabs.forEach(t => t.classList.remove("on"));
    tab.classList.add("on");
    mode=tab.id;

    input.value="";
    input.classList.remove("bad");
    rootVal.value="";
    rootVal.classList.remove("bad");
    result.textContent="";
    result.classList.remove("bad");
    result.classList.remove("many");

    rootBox.removeAttribute("hidden");
    if (mode === "sqr" || mode === "cube"){
        rootBox.classList.add("hidden");
    }
    else if(mode === "custom"){
         rootBox.classList.remove("hidden");
    }

    if (mode === "sqr"){
        label.textContent="Input Number(x)";
        input.placeholder="Enter Number (e.g, 16,25)";
        hint.textContent="Valid range: x >= 0";
        note.textContent="Enter a number to see its square root";
    }
    else if (mode === "cube"){
        label.textContent="Input Number(x)";
        input.placeholder="Enter Number (e.g, 27,8)";
        hint.textContent="Valid range: All real numbers ";
        note.textContent="Enter a number to see its cube root";
    }
    else if (mode === "custom"){
        label.textContent="Input Number(x)";
        input.placeholder="Enter Number (e.g, 16,32)";
        hint.textContent="Valid range: All real numbers ";
        note.textContent="Enter a number and root degree";
    }
}

tabs.forEach(tab =>{
    tab.onclick=function(){
        setMode(tab);
    };
});

calc.onclick=function(){
    let x=Number(input.value);
    input.classList.remove("bad");
    rootVal.classList.remove("bad");
    if(input.value.trim() === "" || isNaN(x)){
        result.textContent="Invalid";
        input.classList.add("bad");
        result.classList.remove("many");
        note.textContent="Please enter a valid number";
        return;
    }

    if (mode === "sqr"){
        if (x < 0){
            result.textContent="Not a real Number";
            result.classList.remove("many");
            note.textContent="Square root of a negative number is not real";
            input.classList.add("bad");
            return;
        }
        let res=Math.sqrt(x);
        result.textContent=round(res);
        result.classList.remove("many");
        input.classList.remove("bad");
        note.textContent="Square root of "+x;
    }
    else if(mode === "cube"){
        let res=Math.cbrt(x);
        result.textContent=round(res);
        result.classList.remove("many");
        note.textContent="Cube root of "+x;
    }
    else if(mode === "custom"){
        let n=Number(rootVal.value);
        if(rootVal.value.trim() === "" || isNaN(n)){
            result.textContent="Invalid";
            result.classList.remove("many");
            note.textContent="Please enter a valid root degree";
            input.classList.add("bad");

            return;
        }
        if (n == 0){
            result.textContent="Not a real number";
            result.classList.remove("many");
            note.textContent="Root degree cannot be 0";
            rootVal.classList.add("bad");
            return;
        }
        if(x < 0 && n%2 ==0){
            result.textContent="Not a real number";
            result.classList.remove("many");
            note.textContent="Even root of a negative number is not real";
            input.classList.add("bad");
            return;
        }

        let res;
        if (x <0){
            res=-Math.pow(-x,1/n);
        }
        else{
             res=Math.pow(x,1/n);
        }
        result.textContent=round(res);
        result.classList.add("many");
        note.textContent=n+" -th root of "+x;
    }
};

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

rootVal.addEventListener("input",function(){
    input.classList.remove("bad");
})

rootVal.addEventListener("input",function(){
    rootVal.classList.remove("bad");
})

input.addEventListener("input",function(){
    input.classList.remove("bad");
})

input.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calc.click();
    }
});
rootVal.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calc.click();
    }
});

if (tabs.length >0){
    setMode(tabs[0]);
}

