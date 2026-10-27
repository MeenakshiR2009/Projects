let path=location.pathname;
let page=path.slice(path.lastIndexOf("/")+1).replace(".html","");
let sKey=page+"Page";
let restoring=false;

function storage(){
    let saved=sessionStorage.getItem(sKey);
    try{
        if (saved === null){
            return;
        }
        restoring=true;
        let parsed=JSON.parse(saved);
       
        let tabs=document.querySelectorAll(".tab, .func");
        if(parsed.tabIdx !== undefined && tabs[parsed.tabIdx !== undefined]){
            tabs[parsed.tabIdx].click();
        }
        for(let id in parsed.inputs){
            let input=document.getElementById(id);
            if(input !== null){
                input.value=parsed.inputs[id];
            }
        }
        let result=document.getElementById("result");
        if (result !== null){
            if(parsed.answer !== undefined){
                result.innerHTML=parsed.answer;
            }
        }
       
        let note=document.getElementById("note");
        if(parsed.notes!== undefined && note !== null){
            note.innerHTML=parsed.notes;
        }
        restoring=false;
    }
    catch(error){
        restoring=false;
    }
}
function saveState(){

    if(restoring){
        return;
    }
    let tabs=document.querySelectorAll(".tab, .func");
    let tabIdx=0;

    tabs.forEach(function(tab,index){
        if(tab.classList.contains("on")){
            tabIdx=index;
        }
    })

    let savedInp={};
    let inputs=document.querySelectorAll(".inp");
    inputs.forEach(function(inp){
        if(inp.id !== ""){
            savedInp[inp.id]=inp.value;
        }
    })

    let result=document.getElementById("result");
    let answer="--";
    if (result !== null){
        answer=result.innerHTML;
    }
    let note=document.getElementById("note");
    let notes="";
    if (note !== null){
        notes=note.innerHTML;
    }

    let state={
        tabIdx:tabIdx,
        inputs:savedInp,
        answer:answer,
        notes:notes
    }
     sessionStorage.setItem(sKey,JSON.stringify(state));
}
document.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        setTimeout(saveState,50);
    }
})

document.addEventListener("input",function(e){
    if(e.target.classList.contains("inp")){
        let result=document.getElementById("result");
        let note=document.getElementById("note");

        if(result !== null && restoring == false){
            result.textContent="--";
            result.classList.remove("many");
        }
        if(note !== null && restoring == false){
            note.textContent="Enter a value and press calculate to see the result here.";
        }
    }
    saveState();
});

document.addEventListener("click",function(e){
    let isTab=e.target.classList.contains("tab");
    let isFunc=e.target.classList.contains("func");
    let isCalc=e.target.id === "calc";
    let isCalculate=e.target.classList.contains("calc");
    let isFn=e.target.classList.contains("fn");
    let isUnit=e.target.classList.contains("unit");
    let isinCalc=false;
    if(e.target.parentElement !== null){
        if(e.target.parentElement.id ==="calc"){
             isinCalc=true;
        }
    }
    if (isTab || isFunc || isCalc || isCalculate ||isFn || isUnit || isinCalc ){
        setTimeout(saveState,50);
    }
})

storage();