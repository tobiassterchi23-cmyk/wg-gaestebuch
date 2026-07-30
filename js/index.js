function goToEntry(){

    window.location.href =
    "createEntry.html";

}



function goToVisitors(){

    window.location.href =
    "allVisitors.html";

}





async function randomVisitor(){


const {data,error} =
await supabaseClient

.from("visitors")

.select("*");



if(error){

    console.error(error);

    return;

}



if(data.length === 0){

    alert(
        "Noch keine Besucher vorhanden."
    );

    return;

}



const random =
data[
Math.floor(
Math.random()*data.length
)
];



localStorage.setItem(

"currentVisitor",

JSON.stringify(random)

);



window.location.href =
"visitorCard.html";


}