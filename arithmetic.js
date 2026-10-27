let input=document.getElementById("value");
let steps = document.getElementById("steps");
let calc=document.getElementById("calc");
let result=document.getElementById("result");
let note=document.getElementById("note");
let stepNote=document.getElementById("stepNote");
let opButtons = document.querySelectorAll(".op");
let insButtons = document.querySelectorAll(".ins");
let info=document.getElementById("infoBtn");
let close=document.getElementById("close");
let infoBox=document.querySelector(".infoBox");

let tokens=[];
let pos=0;
let stepList=[];

function round(n){
    return Number(n.toFixed(10));
}

function resetResult(){
    result.textContent="--";
    note.textContent="Enter an expression and press calculate to see the result here.";
    steps.textContent="Steps will appear here after you calculate";
}

function tokenize(text){
    let list=[];
    let i=0;
    while(i<text.length){
        let ch=text[i];
        if (ch === " "){
            i++;
            continue;
        }
        if (ch === "="){
            i++;
            continue;
        }
        if ((ch >= "0" && ch <= "9" )|| ch === "."){
            let num="";
            while(i<text.length && ((text[i] >= "0" && text[i] <= "9" ) || text[i] === ".")){
                num+=text[i];
                i++;
            }
            if(isNaN(Number(num))){
                throw new Error("Invalid number");
            }
            list.push(num);
            continue;
        }
        if (ch === "x" || ch === "×" || ch === "X"){
            ch ="*";
        }
        if (ch === "÷"){
            ch ="/";
        }
        if (ch === "\u2212"){
            ch ="-";
        }
        if ("+-*/^%()".indexOf(ch)=== -1){
            throw new Error("Unexpected character " + ch);
        }
        list.push(ch);
        i++;
    }
    return list;
}

function apply(a,op,b){
    let r;
    if (op === "+"){
        r= a+b;
    }
    else if (op === "-"){
        r= a-b;
    }
    else if (op === "*"){
        r=a*b;
    }
    else if (op === "/"){
        if (b === 0){
            throw new Error("Can't divide by zero");
        }
        r=a/b;
    }
    else if (op === "%"){
        if (b === 0){
            throw new Error("Can't divide by zero");
        }
        r= a%b;
    }
    else{
        r= Math.pow(a,b);
    }
    r=round(r);
    if (! isFinite(r)){
        throw new Error("This expression has no valid result");
    }
    stepList.push("Step "+(stepList.length + 1)+" : "+a+" "+op+" "+b+" "+"="+r);
    return r;
}

function parsePrimary(){
    let t=tokens[pos];
    if (t === undefined){
        throw new Error("This expression is incompleted");
    }
    if (t === "("){
        pos++;
        let v=parseExpr();
        if(tokens[pos]!==")"){
            throw new Error("Missing closing bracket");
        }
        pos++;
        return v;
    }
    let n=Number(t);
    if (isNaN(n)){
        throw new Error("Unexpected "+ t);
    }
    pos++;
    return n;
}

function parsePower(){
    let base=parsePrimary();
    if (tokens[pos] === "^"){
        pos++;
        let exp=parseUnary();
        return apply(base,"^",exp);
    }
    return base;
}

function parseUnary(){
     if (tokens[pos] === "-"){
        pos++;
        return -parseUnary();
     }
     return parsePower();
}

function parseTerm(){
    let left=parseUnary();
    while(tokens[pos] === "*" ||tokens[pos] === "/"|| tokens[pos] === "%"){
        let op=tokens[pos];
        pos++;
        let right=parseUnary();
        left=apply(left,op,right);
    }
    return left;
}

function parseExpr(){
    let left=parseTerm();
     while(tokens[pos] === "+" || tokens[pos] === "-"){
        let op=tokens[pos];
         pos++;
        let right=parseTerm();
        left=apply(left,op,right);
     }
     return left;
}

function calculate(){
    let text=input.value;
    if (text.trim() === ""){
        result.textContent="--";
        note.textContent="Enter an expression and press calculate to see the result here.";
        steps.textContent="Steps will appear here after you calculate";
        return;
    }
    stepList=[];
    pos=0;
    try{
        tokens=tokenize(text);
        let answer=parseExpr();
        if(pos < tokens.length){
            throw new Error("Unexpected "+ tokens[pos]);
        }
        result.textContent=answer;
        note.textContent=text+" =";
        if (stepList.length === 0){
            steps.textContent="No steps needed.The expression is already a single number.";
        }
        else{
            steps.innerHTML=stepList.join("<br>");
        }
    }
    catch(error){
        result.textContent="Invalid";
        note.textContent=error.message;
        steps.textContent="Steps will appear here after you calculate";
        result.classList.add("bad");    
    }
}

for (let i=0; i<opButtons.length;i++){
     opButtons[i].onclick=function(){
        input.value+=" "+opButtons[i].textContent+ " ";
        input.focus();
    };
}
for (let i=0; i<insButtons.length;i++){
    insButtons[i].onclick=function(){
        input.value+=insButtons[i].textContent;
        input.focus();
    }
}

calc.onclick=calculate;

input.addEventListener("keydown",function(e){
    if (e.key == "Enter"){
        calculate();
    }
});

 if(info !== null && infoBox!== null){
    info.onclick=function(){
        if (infoBox.style.display==="block"){
            infoBox.style.display="none";
        }
        else{
            infoBox.style.display="block";
        }
    }
 }

 if(close !== null && close!== null){
    close.onclick=function(){
        infoBox.style.display="none";
    }
 }