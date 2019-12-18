        let filter = "alle";
        let indhold;
        let dest = document.querySelector("section");
        document.addEventListener("DOMContentLoaded", start);


        function start() {
            hentJson();
            loadMenu();
            loadFooter();

            const filterKnapper = document.querySelectorAll("nav button");

            filterKnapper.forEach(knap => knap.addEventListener("click", filtrerAlleData));
        }



        function filtrerAlleData() {
            filter = this.dataset.keramik; //sæt variabel "filter" til aktuel værdi
            document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra aktuel knap
            this.classList.add("valgt");

            visIndhold();

        }


        async function hentJson() {
            const url = "http://amalieravn.dk/kea/2-sem/eksamen/wordpress/wp-json/wp/v2/keramik?per_page=100";

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
            //her tømmer vi array'et så filteringen ikke kommer oveni i hinanden.
            dest.textContent = "";


            indhold.forEach(keramik => {
                if (filter == "alle" || keramik.kategori == filter) {
                    console.log("kategori", keramik.kategori)
                    const klon = document.querySelector("template").cloneNode(true).content;
                    //fortæller vores content hvordan det skal fordeles i forhold til vores template
                    //                   klon.querySelector("h2").textContent = keramik.titel;
                    // klon.querySelector(".pris").textContent = keramik.pris;

                    klon.querySelector("img").src = keramik.billede.guid;
                    //fortæller hvilket indhold der skal være på vores side
                    dest.appendChild(klon);
                    dest.lastElementChild.addEventListener("click", () => {
                        location.href = `singleview.html?id=${keramik.id}`;
                        //siger til vores side, at den skal klikke ind på detaljesiden (link), når man trykker på et billede
                    })
                }

            })

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
