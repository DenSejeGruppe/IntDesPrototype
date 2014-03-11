        window.onload = function(){


            var canvas = document.getElementById("map");
            canvas.addEventListener("mousedown", clickOnCanvas, false);
            var map = canvas.getContext("2d");
            var shops = []; //This is the array containing shop
            refresh();
            var footer = document.getElementById("menu");
            var searchButton = document.getElementById("searchbtn");

            searchButton.addEventListener("click", function() {
                var searchString = document.getElementById("searchbox").value;
                searchString = searchString.toUpperCase();
                refresh();
                for(var shopIndex in shops){

                        searchName = shops[shopIndex].name;
                        searchName = searchName.toUpperCase();

                        searchCategory = shops[shopIndex].category;
                        searchCategory = searchCategory.toUpperCase();

                        if(searchString == searchName){
                            showShopByName(shops[shopIndex].name);
                            if(shops[shopIndex].name === "FøTeX") {
                                footer.innerHTML = "<img src=\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKjUT-KhM9NWKYm3CxN1Bb5Jt8s8Z_eLDga28eUM2MXPKf6uIK\">";
                            }else{
                                 footer.innerHTML = "";
                            }
                        } else if (searchString == searchCategory) {
                            showShops(shops[shopIndex].category);
                        }
                    }
            });

        /*
        * Here we add all the shops to our array and our canvas view
        */

        /*
        * Makes our category elements hidden
        */

        function refresh() {
        //This is the top row of shops
        addShop("H&M", "Mode børn","#0099FF", 0, 20, 0, 295, 100);
        addShop("Indgang A", "Indgang", "grey", 300, 20, 0, 45, 100);
        addShop("Fona", "Bolig og elektronik","#0099FF", 350, 20, 0, 95, 100);
        addShop("T&S", "Mode, tilbehør og personlig pleje","#0099FF", 450, 20, 0, 45, 100);
        addShop("Outfitters", "Mode børn","#0099FF", 500, 20, 0, 45, 100);
        addShop("Name it", "Mode børn","#0099FF", 550, 20, 0, 45, 100);
        addShop("Maibom", "Sko","#0099FF", 600, 20, 0, 45, 100);
        addShop("Zizzi", "Mode damer","#0099FF", 650, 20, 0, 45, 100);
        addShop("Imerco", "Mode damer","#0099FF", 700, 20, 0, 145, 100);
        addShop("Anettes sandwich", "Cafe og restaurant","#0099FF", 850, 20, 0, 50, 100);
        addShop("WC", "WC","#0099FF", 905, 20, 0, 95, 100);

        //The row just below the top row
        addShop("Indgang C", "Indgang","grey", 905, 120, 0, 95, 50);
        addShop("Misiter minit", "Service","#0099FF", 850, 170, 0, 50, 50);


        //This is the left part just below the top row
        addShop("Vero moda", "Mode damer","#0099FF", 0, 170, 0, 45, 95);
        addShop("Cafe norr", "Cafe og restaurant","#0099FF", 0, 270, 0, 45, 100);
        addShop("BR", "Bolig og elektronik","#0099FF", 50, 270, 0, 120, 100);
        addShop("Tiger", "Bolig og elektronik","#0099FF", 50, 170, 0, 120, 95);
        addShop("Ekspert", "Bolig og elektronik","#0099FF", 175, 170, 0, 120, 200);

        //The column on the left
        addShop("Designer market", "Mode damer","#0099FF", 0, 420, 0, 90, 150);
        addShop("Konferencesalen", "Service","#0099FF", 0, 620, 0, 145, 150);
        addShop("Aktivitet A", "Aktivitetsområde","#0099FF", 195, 620, 0, 100, 150);
        addShop("Netto", "Dagligvarer","#0099FF", 0, 820, 0, 295, 80);
        addShop("Indgang D", "Indgang", "grey", 300, 820, 0, 45, 80);

        addShop("Matas", "Personlig pleje","#0099FF", 125, 420, 0, 75, 150);
        addShop("Frellsen", "Dagligvarer","#0099FF", 205, 420, 0, 90, 70);
        addShop("Ecco", "Sko","#0099FF", 205, 495, 0, 90, 75);

        //The part where FøTeX is
        addShop("QuickFood", "Cafe og restaurant","#0099FF", 350, 620, 0, 75, 280);
        addShop("TDC", "Bolig og elektronik","#0099FF", 350, 495, 0, 75, 120);
        addShop("Tøjeksperten", "Mode herre","#0099FF", 350, 265, 0, 75, 225);
        addShop("Indgang B", "Indgang","grey", 350, 230, 0, 75, 30);
        addShop("FøTeXbageren", "Cafe og restaurant","#0099FF", 350, 170, 0, 75, 55);
        addShop("FøTeX", "Dagligvarer","#0099FF", 430, 170, 0, 415, 730);

        }
        /*
        * This is the constructor function for creating the shop objecets representing our shop
        */

        function registerShop(name, category, color, x, y, rotation, sizeX, sizeY) {
            this.name = name;
            this.category = category;
            this.color = color;
            this.x = x;
            this.y = y;
            this.rotation = rotation;
            this.sizeX = sizeX;
            this.sizeY = sizeY;
        }

        /*
        * This function adds a shop to our shop array. We will use the array to respond to users querries
        */

        function addShop(name, category, color, x, y, rotation, sizeX, sizeY) {
            shop = new registerShop(name, category, color, x, y, rotation, sizeX, sizeY);
            shops.push(shop);
            makeRectangularShop(shop); //When the shop is added to the the array add it to the canvas view as well

        }

        /*
        *Here the shop is actually added to the canvas view
        */

        function makeRectangularShop(shop) {
            map.fillStyle=shop.color;
            map.fillRect(shop.x, shop.y, shop.sizeX, shop.sizeY);
            map.fillStyle = "black";
            if (shop.sizeX >= 95) {
                map.fillText(shop.name, shop.x + (shop.sizeX/2.5), shop.y + (shop.sizeY/2));
            }
            else {
                map.fillText(shop.name, shop.x, shop.y + (shop.sizeY/2));
            }
        }

        function clickOnCanvas() {
            refresh();
            xClick = event.pageX;
            yClick = event.pageY;
            console.log("x coordinate: " + xClick + " y coordinate " + yClick);
            var i = 0;

            for(var shopIndex in shops) {
                xStart = shops[shopIndex].x;
                yStart = shops[shopIndex].y;
                if(xClick - xStart < shops[shopIndex].sizeX && xClick - xStart > 0 && yClick - yStart < shops[shopIndex].sizeY && yClick - yStart > 0) {
                    showShops(shops[shopIndex].category);
                } 
            }
        }

        function showShops(category) {
            for (var shopIndex in shops) {
                if(shops[shopIndex].category === category) {
                     if(shops[shopIndex].name === "FøTeX") {
                        footer.innerHTML = "<img src=\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKjUT-KhM9NWKYm3CxN1Bb5Jt8s8Z_eLDga28eUM2MXPKf6uIK\">";
                    }else{
                     footer.innerHTML = "";
                    }
                    shops[shopIndex].color = "green";
                    makeRectangularShop(shops[shopIndex]);
                }
            }
        }

        function showShopByName(name) {
            for (var shopIndex in shops) {
                if(shops[shopIndex].name === name) {
                    shops[shopIndex].color = "green";
                    makeRectangularShop(shops[shopIndex]);
                }
            }
        }

        function shopView(){
            /*
            name = name.toUpperCase();
            switch(name)
            case "FØTEX"
            if(shops[shopIndex].name === "FøTeX") {
                        footer.innerHTML = "<img src=\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKjUT-KhM9NWKYm3CxN1Bb5Jt8s8Z_eLDga28eUM2MXPKf6uIK\">";
            }
            */
            alert("WHY YOU NO WORK!!");
            footer.innerHTML = "h";
        }

};




