let currentPage = 1;

const totalPages = 4;

function showPage(){


    const pages =

    document.querySelectorAll(
        ".formPage"
    );


    pages.forEach((page)=>{

        page.style.display = "none";

    });



    document.getElementById(

        "page" + currentPage

    ).style.display = "block";



    updateProgressBar();

    updateButtons();


}

function updateProgressBar(){


    const percentage =

    (currentPage / totalPages)

    *100;



    document.getElementById(

        "progressBar"

    ).value = percentage;



    document.getElementById(

        "progressText"

    ).textContent =

    "Seite "

    + currentPage

    + " von "

    + totalPages;


}

function updateButtons(){


    const backButton =

    document.getElementById(
        "backButton"
    );


    const nextButton =

    document.getElementById(
        "nextButton"
    );


    const saveButton =

    document.getElementById(
        "saveButton"
    );



    backButton.style.display =
    "inline-block";


    nextButton.style.display =
    "inline-block";


    saveButton.style.display =
    "none";



    if(currentPage === 1){

        backButton.style.display =
        "none";

    }



    if(currentPage === totalPages){

        nextButton.style.display =
        "none";


        saveButton.style.display =
        "inline-block";

    }


}

function nextPage(){


    if(currentPage === 1){


        const name = 
        document.getElementById("name").value;


        const photo =
        document.getElementById("photo").files[0];



        if(!name){

            alert(
                "Bitte gib deinen Namen ein."
            );

            return;

        }



        if(!photo){

            alert(
                "Bitte füge ein Foto hinzu."
            );

            return;

        }


    }



    if(

        currentPage

        <

        totalPages

    ){

        currentPage++;

        showPage();

    }


}



function previousPage(){


    if(

        currentPage

        >

        1

    ){

        currentPage--;

        showPage();

    }


}

console.log("Create Entry geladen");


function getVisitorData() {

    return{

    name:
    document.getElementById("name").value,

    birthday:
    document.getElementById("birthday").value,

    relationship:
    document.getElementById("relationship").value,

    legendStatus:
    null,

    funFacts:
    document.getElementById("funFacts").value,

    dreamJob:
    document.getElementById("dreamJob").value,

    potato:
    document.getElementById("potato").value,

    stayReason:
    document.getElementById("stayReason").value,

    knownFrom:
    document.getElementById("knownFrom").value,

    favoriteItem:
    document.getElementById("favoriteItem").value,

    song:
    document.getElementById("song").value,

    message:
    document.getElementById("message").value,

    lastThought:
    document.getElementById("lastThought").value,

    rating:
    Number(
        document.getElementById("rating").value
    ),

    photo:
    document.getElementById("photo")
    .files[0]

};

}


async function saveEntry() {

    document.getElementById(
    "saveButton"
).disabled = true;


document.getElementById(
    "loadingMessage"
).style.display = "block";

    console.log("1. saveEntry gestartet");


    const data = getVisitorData();

    if(!data.name){

    alert(

        "Bitte gib deinen Namen ein."

    );

    return;

}


if(!data.photo){

    alert(

        "Bitte nimm zuerst ein Foto auf."

    );

    return;

}


if(!data.rating){

    alert(

        "Bitte bewerte den WG-Abend."

    );

    return;

}

    console.log("2. Daten geladen:");
    console.log(data);


    console.log("3. Foto:");
    console.log(data.photo);


    const visitorNumber =
        await getVisitorNumber();

    console.log(
    "Normale Besuchernummer:",
    visitorNumber
);

// TESTMODUS
// Zum Testen Easter-Egg Nummer eintragen

const testVisitorNumber = null;

// Wenn testen beendet:
// testVisitorNumber = null setzen

const finalVisitorNumber =
    testVisitorNumber ?? visitorNumber;

    console.log(
        "4. Besuchernummer:",
        visitorNumber
    );


    const photoUrl =

    await uploadPhoto(
        data.photo
    );

    console.log(
        "5. Photo URL:",
        photoUrl
    );


    const visitor =

    createVisitor(
    data,
    finalVisitorNumber
    );

    console.log(
        "6. Visitor Objekt:"
    );

    console.log(visitor);


    visitor.photo_url =
    photoUrl;


    const savedVisitor =

    await saveVisitor(
        visitor
    );


    console.log(
        "7. Gespeicherter Besucher:"
    );

    console.log(
        savedVisitor
    );


    if(savedVisitor){

        console.log(
            "8. Weiterleitung wird ausgeführt"
        );


        localStorage.setItem(

            "currentVisitor",

            JSON.stringify(
                savedVisitor
            )

        );


        window.location.href =
        "visitorCard.html";

    }

}

showPage();