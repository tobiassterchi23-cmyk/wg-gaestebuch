async function compressImage(file){


    return new Promise((resolve)=>{


        const image = new Image();


        image.onload = function(){


            const canvas =
            document.createElement(
                "canvas"
            );


            const maxSize = 800;


            let width =
            image.width;


            let height =
            image.height;



            if(width > height){

                if(width > maxSize){

                    height =
                    height *
                    maxSize /
                    width;

                    width =
                    maxSize;

                }

            }

            else{

                if(height > maxSize){

                    width =
                    width *
                    maxSize /
                    height;

                    height =
                    maxSize;

                }

            }


            canvas.width =
            width;


            canvas.height =
            height;


            const context =
            canvas.getContext("2d");


            context.drawImage(

                image,

                0,

                0,

                width,

                height

            );


            canvas.toBlob(

                function(blob){

                    resolve(blob);

                },

                "image/jpeg",

                0.8

            );


        };


        image.src = URL.createObjectURL(
            file
        );


    });


}

function calculateAge(birthday) {

    if (!birthday) {
        return null;
    }


    const today = new Date();
    const birthDate = new Date(birthday);


    let age = today.getFullYear() - birthDate.getFullYear();


    const monthDifference =
        today.getMonth() - birthDate.getMonth();


    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }


    return age;

}





function getVisitDate() {

    const today = new Date();


    return today.toISOString().split("T")[0];

}





function getVisitTime() {

    const today = new Date();


    return today.toLocaleTimeString(
        "de-CH",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}





async function getVisitorNumber() {

    const { count, error } = await supabaseClient
        .from("visitors")
        .select("*", {
            count: "exact",
            head: true
        });


    if (error) {

        console.error(
            "Fehler beim Zählen der Besucher:",
            error
        );

        return null;

    }


    return (count || 0) + 1;

}





function createVisitor(data, visitorNumber) {


    return {

        visitor_number: visitorNumber,


        name: data.name,

        birthday: data.birthday || null,

        age: calculateAge(data.birthday),



        relationship_status:
            data.relationship,


        legend_status:
        calculateLegendStatus(
        visitorNumber,
        new Date()
        ),


        fun_facts:
            data.funFacts,


        dream_job:
            data.dreamJob,


        potato_answer:
            data.potato,


        stay_reason:
            data.stayReason,


        known_from:
            data.knownFrom,


        favorite_item:
            data.favoriteItem,


        playlist_song:
            data.song,


        future_message:
            data.message,


        last_thought:
            data.lastThought,


        rating:
            data.rating,


        visit_date:
            getVisitDate(),


        visit_time:
            getVisitTime(),



        // werden später automatisch gesetzt

        is_legend:
        checkEasterEgg(visitorNumber)?.legend || false,


        has_crown:
        checkEasterEgg(visitorNumber)?.legend || false,


        easter_egg:
        checkEasterEgg(visitorNumber)?.text || null,


        // wird später nach Foto-Upload gefüllt

        photo_url: null

    };

}





async function saveVisitor(visitor) {


    const { data, error } = await supabaseClient
        .from("visitors")
        .insert([visitor])
        .select();



    console.log("Supabase Antwort:");
    console.log("Data:", data);
    console.log("Error:", error);



    if(error){

        console.error(
            "Fehler beim Speichern:",
            error
        );

        return null;

    }



    if(!data || data.length === 0){

        console.error(
            "Keine Daten zurückgegeben"
        );

        return null;

    }



    console.log(
        "Besucher gespeichert:",
        data[0]
    );


    return data[0];

}

async function uploadPhoto(file){


    console.log(
        "uploadPhoto wurde gestartet"
    );


    if(!file){

        console.log(
            "KEIN FOTO GEFUNDEN!"
        );

        return null;

    }


    console.log(
        "Foto gefunden:"
    );

    console.log(file);



    const fileName =

        Date.now()

        + "_"

        + file.name;

        const compressedImage =

await compressImage(file);


    console.log(
        "Dateiname:"
    );

    console.log(
        fileName
    );



    const {error} =

    await supabaseClient.storage

    .from("visitor-images")

    .upload(

    fileName,

    compressedImage

);


    if(error){

        console.error(
            "FEHLER BEIM FOTO-UPLOAD:"
        );

        console.error(
            error
        );

        return null;

    }


    console.log(
        "Foto erfolgreich hochgeladen."
    );



    const {data} =

    supabaseClient.storage

    .from("visitor-images")

    .getPublicUrl(

        fileName

    );


    console.log(
        "Public URL:"
    );

    console.log(
        data.publicUrl
    );


    return data.publicUrl;

}

function calculateLegendStatus(visitorNumber, createdAt){


    let status =
    "WG-Neuling";


    if(createdAt){


        const today =
        new Date();


        const visitDate =
        new Date(createdAt);


        const difference =
        today - visitDate;


        const years =
        difference /
        (1000 * 60 * 60 * 24 * 365);



        if(years >= 1.5){
            status =
            "WG-Urgestein";

        }

        else if(years >= 0.5){

            status =
            "Stammgast";

        }


    }



    return status;

}

function checkEasterEgg(visitorNumber){


    if(visitorNumber === 200){

        return {

            text:
            "Herzlichen Glückwunsch! Du bist Besucher Nr. 200 und erhältst den legendären WG-Status.",

            legend:true

        };

    }



    if(visitorNumber === 69){

        return {

            text:
            "Glückwunsch! Du bist Besucher Nr. 69! 😏😏",

            legend:false

        };

    }



    if(visitorNumber === 67){

        return {

            text:
            "Glückwunsch! Du bist Besucher Nr. 67! 🫲🫱",

            legend:false

        };

    }



    if(visitorNumber % 10 === 0){


        return {

            text:
            "🎉 Glückwunsch! Du bist Besucher Nr. "
            + visitorNumber
            + "!",

            legend:false

        };


    }



    return null;

}