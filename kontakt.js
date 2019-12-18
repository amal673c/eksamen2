    document.addEventListener("DOMContentLoaded", start);

        let indhold;
        const dest = document.querySelector("#menu-container");

        function start() {
            hentJson();
            loadMenu();
            loadFooter();
        }

        async function hentJson() {
            const url = "http://amalieravn.dk/kea/2-sem/eksamen/wordpress/wp-json/wp/v2/pages/14"

            let myJson = await fetch(url);
            indhold = await myJson.json();
            console.log(indhold);
            visIndhold();
        }

        async function loadMenu() {

            let data = await fetch("nav.html");
            let navigation = await data.text();
            console.log("loadMenu", navigation);
            opretMenu(navigation);

        }

        function opretMenu(e) {
            document.querySelector("nav").innerHTML = e;
            document.querySelector("#menuknap").addEventListener("click", toggleMenu);
        }

        function visIndhold() {
            document.querySelector("h2").textContent = indhold.title.rendered;
            document.querySelector("section").innerHTML = indhold.content.rendered;
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
