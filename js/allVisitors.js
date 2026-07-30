console.log(
    "Alle Besucher geladen"
);

let allVisitors = [];

async function loadVisitors(){


const {data,error} = await supabaseClient

.from("visitors")

.select("*")

.order(
    "visitor_number",
    {
        ascending:false
    }
);



if(error){

    console.error(error);

    return;

}

allVisitors = data;

const container =
document.getElementById(
    "visitorsContainer"
);



displayVisitors(data);

}


loadVisitors();

function displayVisitors(visitors){


const container =

document.getElementById(
"visitorsContainer"
);


container.innerHTML = "";



visitors.forEach(
(visitor)=>{


const card =

document.createElement(
"div"
);


card.className =
"visitor-card";


card.innerHTML = `


<img

src="${
visitor.photo_url
||
"../images/default-avatar.png"
}"

>


<h2>

${visitor.name}

</h2>


<p>

${
visitor.age
?
visitor.age + " Jahre"
:
"Alter unbekannt"
}

</p>


<p>

Besucher #${visitor.visitor_number}

</p>

`;



card.style.cursor =
"pointer";



card.onclick = function(){


localStorage.setItem(

"currentVisitor",

JSON.stringify(visitor)

);


window.location.href =
"visitorCard.html";


};



container.appendChild(
card
);


});


}

function filterVisitors(){


const searchText =

document.getElementById(
"searchInput"
).value.toLowerCase();



const filteredVisitors =

allVisitors.filter(
(visitor)=>{


return (

visitor.name
.toLowerCase()
.includes(searchText)

||

String(
visitor.visitor_number
).includes(searchText)

);


});


displayVisitors(
filteredVisitors
);


}