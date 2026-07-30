console.log(
    "Alle Besucher geladen"
);



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



const container =
document.getElementById(
    "visitorsContainer"
);



data.forEach(
(visitor)=>{


const card =
document.createElement(
    "div"
);

card.className =
"visitor-card";

card.innerHTML = `


<img

class="visitorImage"

src="${
visitor.photo_url
||
'../images/default-avatar.png'
}"

>


<h2>

${visitor.name}

</h2>


<p class="visitorNumber">

#${visitor.visitor_number}

</p>

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

${
visitor.legend_status || ""

}

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



container.appendChild(card);



}

);


}



loadVisitors();