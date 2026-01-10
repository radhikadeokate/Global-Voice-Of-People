const data={
A:{score:82,status:"Heavy Ideological Framing",
bias:{pride:80,usurp:85,tempt:90,lust:70,possession:88,rot:75,trade:92,negative:95,lesson:82},
citizen:["Economic pressure","Anger at corruption","Fear of instability"],
media:["Market crash","Regime failure","Investor panic"]},

B:{score:65,status:"Moderate Manipulation",
bias:{pride:60,usurp:55,tempt:75,lust:80,possession:60,rot:40,trade:70,negative:65,lesson:50},
citizen:["Cost of living","Youth unemployment","Crime"],
media:["Political chaos","Leadership failure"]},

C:{score:41,status:"Low Framing",
bias:{pride:30,usurp:45,tempt:35,lust:40,possession:38,rot:25,trade:30,negative:35,lesson:50},
citizen:["Education","Healthcare","Local jobs"],
media:["Infrastructure","Regional growth"]}
};

function selectOutlet(k){
let d=data[k];
let b=document.getElementById("bbs");
b.innerText=d.score;
b.className="score "+(d.score>70?"high":d.score>50?"mid":"low");
document.getElementById("status").innerText=d.status;

for(let x in d.bias){
document.getElementById(x).style.width=d.bias[x]+"%";
}

document.getElementById("citizen").innerHTML=d.citizen.map(i=>"<li>"+i+"</li>").join("");
document.getElementById("media").innerHTML=d.media.map(i=>"<li>"+i+"</li>").join("");

document.getElementById("gap").innerText=
d.score>70?"Media is distorting public reality":
d.score>50?"Narrative skew detected":
"Public voice mostly respected";

document.getElementById("report").innerHTML=
`KALKI REPORT:<br>Outlet ${k} has Bias Score ${d.score}.<br>Citizen focus ≠ Media focus.<br>Conclusion: Narrative imbalance detected.`;
}

selectOutlet("A");
