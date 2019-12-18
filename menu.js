        document.addEventListener("DOMContentLoaded", start);

        let indhold;
        const dest = document.querySelector("#menu-container");

        function start() {
            loadMenu();
            loadFooter();
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
