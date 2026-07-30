function neuerEintrag() {

    window.location.href =
        "pages/createEntry.html";

}



function gaestebuch() {

    window.location.href =
        "pages/allVisitors.html";

}



async function loadHomePage() {


    const { data, error } =

        await supabaseClient

            .from("visitors")

            .select("*");


    if (error) {

        console.error(error);

        return;

    }



    // Besucheranzahl anzeigen

    document.getElementById(
        "visitorCount"
    ).textContent =

        "Bereits "
        + data.length
        + " Besucher haben sich verewigt.";



    // Falls noch keine Besucher existieren

    if (data.length === 0) {

        return;

    }



    let randomVisitor;


const today =

new Date()
.toISOString()
.split("T")[0];



const savedDate =

localStorage.getItem(
"dailyVisitorDate"
);



const savedVisitor =

localStorage.getItem(
"dailyVisitor"
);




if(
savedDate === today
&&
savedVisitor
){

    randomVisitor =
    JSON.parse(
        savedVisitor
    );

}

else{


    randomVisitor =

    data[
        Math.floor(
            Math.random() * data.length
        )
    ];



    localStorage.setItem(

        "dailyVisitor",

        JSON.stringify(
            randomVisitor
        )

    );



    localStorage.setItem(

        "dailyVisitorDate",

        today

    );


}



    // Foto anzeigen

    document.getElementById(
        "dailyPhoto"
    ).src =

        randomVisitor.photo_url
        ||
        "images/default-avatar.png";



    // Name anzeigen

    document.getElementById(
        "dailyName"
    ).textContent =

        randomVisitor.name;



    // Nachricht auswählen

    document.getElementById(
        "dailyMessage"
    ).textContent =

        randomVisitor.last_thought
        ||

        randomVisitor.future_message
        ||

        randomVisitor.fun_facts
        ||

        randomVisitor.dream_job
        ||

        "Heute steht dieser Besucher im Rampenlicht!";



    // Besuchernummer anzeigen

    document.getElementById(
        "dailyRating"
    ).textContent =

        "Besucher #"
        +
        randomVisitor.visitor_number;


}



function openDailyVisitor() {


    const visitor =

        localStorage.getItem(
            "dailyVisitor"
        );


    if (visitor) {

        localStorage.setItem(

            "currentVisitor",

            visitor

        );


        window.location.href =
            "pages/visitorCard.html";

    }


}



// Startseite laden

loadHomePage();