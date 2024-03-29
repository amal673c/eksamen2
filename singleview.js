        let keramik;

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");

        document.addEventListener("DOMContentLoaded", start);


        function start() {
            hentJson();
            loadMenu();
            loadFooter();

            document.querySelector("#popup").style.display = "none";
            skjulPopup();


        }

        document.querySelector(".luk").addEventListener("click", () => {
            history.back();
        })

        //Det der gør at knappen kommer tilbage til den sidste side
        async function hentJson() {
            const url = "http://amalieravn.dk/kea/2-sem/eksamen/wordpress/wp-json/wp/v2/keramik/" + postId;

            //devinerer vores URL, så vi ikke behøver skrive den helt ud

            let myJson = await fetch(url);
            //Det der gør at vi kan hente vores URL og den her kan hente indhold fra Json
            keramik = await myJson.json();
            console.log(myJson);
            visIndhold();
            //kalder på vores funktion: visIndhold
        }

        async function loadMenu() {

            let data = await fetch("nav.html");
            let navigation = await data.text();
            opretMenu(navigation);

        }

        function opretMenu(e) {
            document.querySelector("nav").innerHTML = e;
            document.querySelector("#menuknap").addEventListener("click", toggleMenu);
        }


        function visIndhold() {

            document.querySelector("h2").textContent = keramik.titel;
            document.querySelector(".farve").textContent = " Farve: " + keramik.farve;

            document.querySelector(".ml").textContent = "Mål: " + keramik.ml + " ";
            document.querySelector(".pris").textContent = "Pris: " + keramik.pris + " DKK";
            document.querySelector(".materiale").textContent = "Materiale: " + keramik.materiale + "";
            document.querySelector(".tekst").innerHTML = keramik.beskrivelse;
            //          document.querySelector(".beskrivelse").innerHTML = keramik.overskrift;
            document.querySelector(".my_image").src = keramik.billede.guid;
            document.querySelector(".my_image2").src = keramik.billede.guid;
            document.querySelector(".my_image3").src = keramik.billede.guid;


            console.log("keramik billede guid", keramik.billede.guid)


            document.querySelector(".my_image2").addEventListener("click", visPopup);
            document.querySelector(".my_image3").addEventListener("click", visPopup);

        }

        function toggleMenu() {
            console.log("toggleMenu");
            document.querySelector("#menu").classList.toggle("hidden");

            let erSkjult = document.querySelector("#menu").classList.contains("hidden");

            if (erSkjult == true) {
                document.querySelector("#menuknap").textContent = "☰";
            } else {
                document.querySelector("#menuknap").textContent = "X";
            }
        }

        async function loadFooter() {
            let data = await fetch("footer.html");
            let footer = await data.text();
            console.log("loadFooter", footer);
            opretFooter(footer);
        }

        function opretFooter(e) {
            document.querySelector("footer").innerHTML = e;

        }



        function visPopup() {
            console.log("visPopup");

            document.querySelector("#popup").style.display = "block";
            document.querySelector("#popup .luk_x").addEventListener("click", skjulPopup);

            document.querySelector("#popup .my_image2").src = keramik.billede.guid;



        }


        function skjulPopup() {
            console.log("skjulPopup");
            document.querySelector("#popup").style.display = "none";
        }
