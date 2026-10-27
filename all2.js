let value=document.getElementById("value");
let hint=document.getElementById("hint");
let from=document.getElementById("from");
let to=document.getElementById("to");
let calc=document.getElementById("calc");
let info=document.getElementById("infoBtn");
let close=document.getElementById("close");
let result=document.getElementById("result");
let note=document.getElementById("note");


let infoBox=document.querySelector(".infoBox");
let swap=document.querySelector(".convert h3");
let digits="0123456789abcdefghijklmnopqrstuvwxyz";

let baseList=[
    ["Decimal (Base 10)","10"],
    ["Binary (Base 2)","2"],
    ["Octal (Base 8)","8"],
    ["Hexadecimal (Base 16)","16"]
];

let short={
    10:"Dec",
    2:"Bin",
    8:"Oct",
    16:"Hex"
}

function fillSelect(select,chosen){
    let tag="";
    for (i=0;i<baseList.length;i++){
        tag+="<option value='"+baseList[i][1]+"'>"+baseList[i][0]+"</option>";
    }
    select.innerHTML=tag;
    select.value=chosen;
}

function upHint(){
    let base=Number(from.value);
    hint.textContent="Allowed Digits: "+digits.slice(0,base).toUpperCase();
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

function toNum(text,base){
    let clean=text.trim().toLowerCase();
    if (clean === ""){
        throw new Error("Please enter a value");
    }
    let val=0;
    for (let i=0;  i<clean.length ;i++){
        let ele=digits.indexOf(clean[i]);
        if (ele == -1 || ele >= base){
            throw new Error("The digit "+clean[i].toUpperCase()+" is not allowed in this base "+base );
        }
        val=val*base+ele;
    }
    if (! Number.isSafeInteger(val)){
         throw new Error("The number is too large");
    }
    return val;
}

function calculate(){
    value.classList.remove("bad");
    try{
        let fromBase=Number(from.value);
        let toBase=Number(to.value);
        let val=toNum(value.value,fromBase);
        let answer=val.toString(toBase).toUpperCase();
        result.textContent=value.value.trim().toUpperCase()+" ("+short[fromBase] + ") = "+answer+" ("+short[toBase]+ ")";
        note.innerHTML= "Dec : "+val.toString(10)+"\n"+
                        "Bin : "+val.toString(2)+"\n"+
                        "Oct : "+val.toString(8)+"\n"+
                        "Hex : "+val.toString(16).toUpperCase();
    }
    catch(error){
        showError(error.message);
    }
}

swap.onclick=function(){
    let old=from.value;
    from.value=to.value;
    to.value=old;
    upHint();
    resetResult();
}

to.addEventListener("change",resetResult);
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
value.addEventListener("input",function(){
    value.classList.remove("bad");
})

value.addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        calculate();
    }
})

fillSelect(from,"10");
fillSelect(to,"2");
upHint();





