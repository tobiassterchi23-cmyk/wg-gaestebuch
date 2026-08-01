const savedVisitor = localStorage.getItem(
    "currentVisitor"
);



if (!savedVisitor) {

    console.error(
        "Kein Besucher gefunden"
    );

}
else {


    const visitor = JSON.parse(
        savedVisitor
    );

    const welcomeMessages = [

        "Willkommen im Gästebuch!",

        "Schön, dass du da warst!",

        "Ein weiterer Abend.\nEine weitere Geschichte."

    ];


    const randomMessage =

        welcomeMessages[

        Math.floor(
            Math.random()
            *
            welcomeMessages.length
        )

        ];


    // Standardnachricht setzen

    document.getElementById(
        "welcomeTitle"
    ).textContent =

        randomMessage;



    // Easter Eggs überschreiben die Standardnachricht

    if (visitor.has_crown) {

        document.getElementById(
            "welcomeTitle"
        ).textContent =

            "👑 LEGENDÄR!";

    }


    else if (
        visitor.visitor_number === 69
    ) {

        document.getElementById(
            "welcomeTitle"
        ).textContent =

            "😏 Nice.";

    }


    else if (
        visitor.visitor_number === 67
    ) {

        document.getElementById(
            "welcomeTitle"
        ).textContent =

            "⭐ Legendärer Besuch!";

    }


    else if (
        visitor.visitor_number % 10 === 0
    ) {

        document.getElementById(
            "welcomeTitle"
        ).textContent =

            "🎉 Runder Besuch!";

    }


    // Besuchertext anzeigen

    document.getElementById(
        "welcomeText"
    ).innerHTML =

        "Du bist Besucher #"

        +

        visitor.visitor_number

        +

        " der<br>Wankdorf-WG.";

    function getStatus(visitor) {


        if (visitor.has_crown) {

            return "👑 WG-Legende";

        }


        if (visitor.legend_status) {

            return visitor.legend_status;

        }


        return "WG-Neuling";

    }



    const photo = document.getElementById(
        "visitorPhoto"
    );

    if (visitor.photo_url) {

        photo.src = visitor.photo_url;

        photo.onclick = function () {

            document.getElementById(
                "largeVisitorPhoto"
            ).src = visitor.photo_url;


            document.getElementById(
                "imageOverlay"
            ).style.display = "flex";

        };

    }
    else {

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
    ).innerHTML =

        "<strong>Alter</strong><br>" +

        (
            visitor.age
                ?
                visitor.age + " Jahre"
                :
                "Unbekannt"
        );


    document.getElementById(
        "visitorStatus"
    ).textContent =
        "Status: " + getStatus(visitor);

    if (visitor.has_crown) {


        document.getElementById(
            "visitorBadge"
        ).textContent =
            "👑 Legendärer Besucher";


    }

    if (visitor.easter_egg) {


        document.getElementById(
            "visitorEasterEgg"
        ).textContent =
            visitor.easter_egg;


    }

    document.getElementById(
        "visitDate"
    ).innerHTML =

        "<strong>Besucht am</strong><br>" +

        new Date(visitor.visit_date)
            .toLocaleDateString("de-CH");

    document.getElementById(
        "relationship"
    ).innerHTML =
        "<strong>Beziehungsstatus</strong><br>" +
        (visitor.relationship_status || "-");


    document.getElementById(
        "funFacts"
    ).innerHTML =
        "<strong>Fun-Facts über dich</strong><br>" +
        (visitor.fun_facts || "-");


    document.getElementById(
        "dreamJob"
    ).innerHTML =
        "<strong>Das will ich einmal werden, wenn ich gross bin</strong><br>" +
        (visitor.dream_job || "-");


    document.getElementById(
        "potato"
    ).innerHTML =
        "<strong>Wenn du eine Kartoffel wärst, zu welcher Speise würdest du am liebsten verarbeitet werden?</strong><br>" +
        (visitor.potato_answer || "-");


    document.getElementById(
        "stayReason"
    ).innerHTML =
        "<strong>Grund des Aufenthaltes</strong><br>" +
        (visitor.stay_reason || "-");


    document.getElementById(
        "knownFrom"
    ).innerHTML =
        "<strong>Woher kennst du die WG?</strong><br>" +
        (visitor.known_from || "-");


    document.getElementById(
        "favoriteItem"
    ).innerHTML =
        "<strong>Lieblingsitem der WG?</strong><br>" +
        (visitor.favorite_item || "-");


    document.getElementById(
        "song"
    ).innerHTML =
        "<strong>Dieser Song muss unbedingt auf die WG-Playlist</strong><br>" +
        (visitor.playlist_song || "-");


    document.getElementById(
        "message"
    ).innerHTML =
        "<strong>Nachricht an zukünftige Besucher</strong><br>" +
        (visitor.future_message || "-");


    document.getElementById(
        "lastThought"
    ).innerHTML =
        "<strong>Mein letzter Gedanke bevor ich nach Hause gehe</strong><br>" +
        (visitor.last_thought || "-");


    document.getElementById(
        "rating"
    ).innerHTML =
        "<strong>Bewertung des WG-Abends</strong><br>" +
        (visitor.rating || "-") +
        "/10";

}

document.getElementById(
    "imageOverlay"
).onclick = function () {

    this.style.display = "none";

};
