async function getRandomVisitor() {


    const { data, error } = await supabaseClient

        .from("visitors")

        .select("*");


    if (error) {

        console.error(error);

        return;

    }


    if (data.length === 0) {

        return;

    }


    const randomNumber = Math.floor(

        Math.random() * data.length

    );


    const visitor = data[randomNumber];


    localStorage.setItem(

        "currentVisitor",

        JSON.stringify(visitor)

    );


    window.location.href =
        "visitorCard.html";


}