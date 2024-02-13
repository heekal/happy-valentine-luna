var values=[
            "bbbbbbbbbbbbbbbbb",
            "bbbbbwbbbbbbwbbbb",
            "bbbwbwbbwbbbwbbbb",
            "bbwwwwbbwbbbwbwbb",
            "bbbwbwbbwwwwwbwbb",
            "wwwwwwwwwbbbwbwbb",
            "wbwbbwbbwbbbwbwbb",
            "wbwbbwbbbbbbbbwbb",
            "wbwbbbwwwwwbbbwbb",
            "bbwbbbwbbbbbbbwbb",
            "bbwwwwwwbbbbbbwbb",
            "bbbbbbwbbbbbbbbbb",
            "bbbbbbwbwbbbbbbbb",
            "bbbbwwwwwwbbbbbbb",
            "bbbbbbwbwbbbbbbbb",
            "bbbbbbbbwbbbbbbbb"];
var ans_key=[
            "-----------------",
            "-----O------H----",
            "---L-K--S---A----",
            "--TULT--E---I-B--",
            "---N-O--MEWEK-A--",
            "PEKANBARU---A-N--",
            "I-U--E--A---L-G--",
            "P-C--R--------C--",
            "I-I---BUBUY---H--",
            "--N---A-------A--",
            "--GELANG------N--",
            "------D----------",
            "------U-S--------",
            "----RINGAN-------",
            "------G-T--------",
            "--------E--------"];
var blank=[
    "0,0", "0,1", "0,2", "0,3", "0,6", "0,7", "0,8", "0,9", "0,10", "0,13", "0,14", "0,15", "0,16",
    "1,0", "1,1", "1,2", "1,7", "1,8", "1,9", "1,14", "1,15", "1,16",
    "2,0", "2,1", "2,15", "2,16",
    "3,0", "3,16",
    "9,0", "9,16",
    "10,0", "10,16",
    "11,0", "11,1", "11,15", "11,16",
    "12,0", "12,1", "12,2", "12,14", "12,15", "12,16",
    "13,0", "13,1", "13,2", "13,3", "13,13", "13,14", "13,15", "13,16",
    "14,0", "14,1", "14,2", "14,3", "14,4", "14,12", "14,13", "14,14", "14,15", "14,16",
    "15,0", "15,1", "15,2", "15,3", "15,4", "15,5", "15,6", "15,10", "15,11", "15,12", "15,13", "15,14", "15,15", "15,16"];
var total_rows=values.length;
var total_cols=values[0].length;
var span_value={"1,5": "1",
                "1,12": "2",
                "2,3": "3",
                "2,8": "4",
                "3,2": "5",
                "4,8": "6",
                "5,0": "7",
                "5,2": "8",
                "8,6": "9",
                "10,2": "10",
                "12,8": "11",
                "13,4": "12",
                "3,14": "13"};
var current=null;
var green=[];

function createFrameBoxes() {
    var boxes="";
    for (let i = 0; i < values.length; i++) {
        boxes+="<tr>";
        for (let j = 0; j < values[i].length; j++) {
            var buffer = i+","+j
            if (blank.includes(buffer)){
                boxes+=`<th onclick='myclick(this)' row='${i}' col='${j}' class="inv"></th>`;
            }
            else{
                var s=span_value[i+","+j]??"";
                boxes+=`<th onclick='myclick(this)' row='${i}' col='${j}' class="${values[i][j]}"><span>${s}</span><b></b></th>`;
            }
        }
    }
    document.getElementById("table").innerHTML=boxes;
}

function myclick(box) {
    if (box.classList.contains("w")) {
        var row = box.getAttribute("row");
        var col = box.getAttribute("col");
        if (current != null) {
            var check = row + col;
            if (green.includes(check))
                current.style.background = "#FF8080"; // green means there's right indicator on row,col coordinate
            else {
                current.style.background = "white";
            }
        }
        current = box;
        current.style.background = "orange";
    }
}

document.body.onkeyup=function(event){
    if(current!=null){
        if(event.keyCode>=37 && event.keyCode<=40){
            nextmover(event.keyCode);
        }
        if(event.keyCode>=65&&event.keyCode<=90){
            current.querySelector("b").innerHTML=event.key.toUpperCase();
            key_check(event.keyCode);
        }
        if(event.keyCode==8||event.keyCode==46){
            current.querySelector("b").innerHTML="";
        }
    }
}

function nextmover(code){
    var row=parseInt(current.getAttribute("row"));
    var col=parseInt(current.getAttribute("col"));
    switch(code) {
        case 37:
            col=col==0?total_cols - 1:col-1;
            break;
        case 38:
            row=row==0?total_rows - 1:row-1;
            break;
        case 39:
            col=col==total_cols - 1?0:col+1;
            break;
        case 40:
            row=row==total_rows - 1?0:row+1;
            break;
        default:
            break;
    }
    if(current.classList.contains("w")){
        current.style.background=null;
    }
    current=document.querySelectorAll("tr")[row].querySelectorAll("th")[col];
    if(current.classList.contains("w")){
        current.style.background="orange";
    } else {
        nextmover(code);
    }
}

function key_check(key) {
    var whites = document.querySelectorAll(".w");
    whites.forEach(element => {
        var text = element.querySelector("b").innerHTML.toUpperCase();
        if (text.length > 0) {
            var row = element.getAttribute("row");
            var col = element.getAttribute("col");
            console.log(row, col, text, ans_key[row][col]);
            if (ans_key[row][col] == text) {
                element.style.background = "#FF8080";
                check_val = row + col;
                if (green.indexOf(check_val) === -1) {
                    green.push(row + col);
                }
            } else {
                element.style.color = "";
                element.style.background = "red";
                check_wrong = row + col;
                var index = green.indexOf(check_wrong);
                if (index !== -1) {
                    green.splice(index, 1);
                }
            }
        }
    });

    if (green.length === 72){
        setInterval(heartrain, 500);
    }
}

function heartrain(){
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random()*100+'vw';
    heart.innerHTML ='&#10084;';
    heart.style.animationDirection = Math.random()*2+3+'s';

    document.body.appendChild(heart);

    setInterval(() => {
        heart.remove();
    }, 4500);

}

createFrameBoxes();