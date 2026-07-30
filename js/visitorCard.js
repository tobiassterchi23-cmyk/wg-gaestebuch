const savedVisitor = localStorage.getItem(
    "currentVisitor"
);


if(!savedVisitor){

    console.error(
        "Kein Besucher gefunden"
    );

}
else{


const visitor = JSON.parse(
    savedVisitor
);


function getStatus(visitor){


    if(visitor.has_crown){

        return "👑 WG-Legende";

    }


    if(visitor.legend_status){

        return visitor.legend_status;

    }


    return "WG-Neuling";

}



const photo = document.getElementById(
    "visitorPhoto"
);

if(visitor.photo_url){

    photo.src = visitor.photo_url;

    photo.onclick = function(){

    document.getElementById(
        "largeVisitorPhoto"
    ).src = visitor.photo_url;


    document.getElementById(
        "imageOverlay"
    ).style.display = "flex";

};

}
else{

    photo.src = "../images/default-avatar.png";

}

    document.getElementById(
        "visitorName"
    ).textContent =
    visitor.name;


    document.getElementById(
        "visitorNumber"
    ).textContent =
    "#" + visitor.visitor_number;


    document.getElementById(
        "visitorAge"
    ).textContent =
    visitor.age
    ?
    visitor.age + " Jahre"
    :
    "Alter unbekannt";


    document.getElementById(
    "visitorStatus"
    ).textContent =
    "Status: " + getStatus(visitor);

    if(visitor.has_crown){


    document.getElementById(
        "visitorBadge"
    ).textContent =
    "👑 Legendärer Besucher";


}

    if(visitor.easter_egg){


    document.getElementById(
        "visitorEasterEgg"
    ).textContent =
    visitor.easter_egg;


}

    document.getElementById(
    "visitDate"
    ).textContent =
    new Date(visitor.visit_date)
    .toLocaleDateString(
    "de-CH"
    );

    document.getElementById(
    "relationship"
    ).textContent =
    "Beziehungsstatus: " +
    (visitor.relationship_status || "-");


document.getElementById(
    "funFacts"
).textContent =
"Fun-Facts: " +
(visitor.fun_facts || "-");


document.getElementById(
    "dreamJob"
).textContent =
"Das will ich einmal werden: " +
(visitor.dream_job || "-");


document.getElementById(
    "potato"
).textContent =
"Kartoffelfrage: " +
(visitor.potato_answer || "-");


document.getElementById(
    "stayReason"
).textContent =
"Grund des Aufenthalts: " +
(visitor.stay_reason || "-");


document.getElementById(
    "knownFrom"
).textContent =
"Woher kenne ich die WG: " +
(visitor.known_from || "-");


document.getElementById(
    "favoriteItem"
).textContent =
"Lieblingsitem der WG: " +
(visitor.favorite_item || "-");


document.getElementById(
    "song"
).textContent =
"WG-Playlist: " +
(visitor.playlist_song || "-");


document.getElementById(
    "message"
).textContent =
"Nachricht an zukünftige Besucher: " +
(visitor.future_message || "-");


document.getElementById(
    "lastThought"
).textContent =
"Mein letzter Gedanke: " +
(visitor.last_thought || "-");


document.getElementById(
    "rating"
).textContent =
"Bewertung des WG-Abends: " +
(visitor.rating || "-") +
"/10";

}

document.getElementById(
    "imageOverlay"
).onclick = function(){

    this.style.display = "none";

};
