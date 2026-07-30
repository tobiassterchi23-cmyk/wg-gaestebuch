function neuerEintrag(){

    window.location.href =
    "pages/createEntry.html";

}



function gaestebuch(){

    window.location.href =
    "pages/allVisitors.html";

}

async function loadHomePage(){


const {data,error} =
await supabaseClient

.from("visitors")

.select("*");



if(error){

console.error(error);

return;

}



// Besucheranzahl

document.getElementById(
"visitorCount"
).textContent =

"Bereits "
+
data.length
+
" Besucher haben die WG verewigt.";



if(data.length === 0){

return;

}



// zufälliger Besucher

const randomVisitor =
data[
Math.floor(
Math.random()*data.length
)
];



localStorage.setItem(

"dailyVisitor",

JSON.stringify(randomVisitor)

);

document.getElementById(
"dailyPhoto"
).src =

randomVisitor.photo_url
||
"images/default-avatar.png";

document.getElementById(
"dailyName"
).textContent =
randomVisitor.name;



document.getElementById(
"dailyMessage"
).textContent =

randomVisitor.future_message
||
"Keine Nachricht hinterlassen";



document.getElementById(
"dailyRating"
).textContent =

(randomVisitor.rating || "-")
+
" / 10";


}



function openDailyVisitor(){


const visitor =
localStorage.getItem(
"dailyVisitor"
);



if(visitor){

localStorage.setItem(
"currentVisitor",
visitor
);


window.location.href =
"pages/visitorCard.html";


}

}



loadHomePage();