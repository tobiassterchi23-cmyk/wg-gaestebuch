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

    // Besucheranzahl anzeigen

    if (data.length === 1) {

        document.getElementById(
            "visitorCount"
        ).textContent =

            "👥 Bereits 1 Besucher hat die WG verewigt.";

    }

    else {

        document.getElementById(
            "visitorCount"
        ).textContent =

            "👥 Bereits "
            + data.length
            + " Besucher haben die WG verewigt.";

    }



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




    if (
        savedDate === today
        &&
        savedVisitor
    ) {

        randomVisitor =
            JSON.parse(
                savedVisitor
            );

    }

    else {


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

loadRating();

async function randomVisitor() {


    const { data, error } =

        await supabaseClient

            .from("visitors")

            .select("*");



    if (error) {

        console.error(error);

        return;

    }



    if (data.length === 0) {

        return;

    }



    const chosenVisitor =

        data[
        Math.floor(
            Math.random() * data.length
        )
        ];



    const overlay =

        document.getElementById(
            "randomOverlay"
        );


    const nameField =

        document.getElementById(
            "randomName"
        );


    const textField =

        document.getElementById(
            "randomText"
        );



    overlay.classList.add("show");



    let counter = 0;


    const animation = setInterval(() => {


        const random =

            data[
            Math.floor(
                Math.random() * data.length
            )
            ];


        textField.textContent =

            "Suche den nächsten Besucher...";


        nameField.textContent =

            random.name;


        counter++;



        if (counter >= 20) {


            clearInterval(animation);



            textField.textContent =

                "Gefunden! 🎉";



            nameField.textContent =

                chosenVisitor.name;



            localStorage.setItem(

                "currentVisitor",

                JSON.stringify(chosenVisitor)

            );



            setTimeout(() => {


                window.location.href =

                    "pages/visitorCard.html";


            }, 2000);



        }



    }, 200);

}

async function loadRating() {


    const { data, error } =

        await supabaseClient

            .from("visitors")

            .select("rating");


    if (error) {

        console.error(error);

        return;

    }


    const ratings =

        data.filter(
            visitor => visitor.rating
        );


    if (ratings.length === 0) {

        return;

    }


    let sum = 0;


    ratings.forEach(
        visitor => {

            sum += visitor.rating;

        });


    const average =

        sum / ratings.length;



    document.getElementById(
        "ratingValue"
    ).textContent =

        average.toFixed(1)
        +
        " / 10";




    const stars =

        Math.round(
            average
            *
            2
        )
        / 4;



    let starText = "";


    for (let i = 1; i <= 5; i++) {


        if (stars >= i) {

            starText += "★";

        }

        else if (stars >= i - 0.5) {

            starText += "½";

        }

        else {

            starText += "☆";

        }

    }


    document.getElementById(
        "starRating"
    ).textContent =

        starText;


}