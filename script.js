/*
HVIS DU BRUGER WINDOWS SÅ HUSK AT BRUGE GIT SHELL OG IKKE DEN ALMINDELINGE WINDOWS CMD!

LINJE 1: git add -A: Tilføjer alt det du har ændret til en ny pakke, som du kan ligge i din udbakke i næste linje. -A betyder alle filer.
Det er lettest bare at tilføje alle filer selvom du kun har ændret på en fil!
LINJE 2: git commit -m "commit besked": Tilføjer den pakke du lige har lavet til udbakken. Vigtigt fordi ellers bliver din kode 
overskrevet, når du laver "git pull" i næste linje (husk gåseøjn omkring commit beskeden. Beskeden skal være der, og den må meget gerne være
informativ omkring hvad du har lavet!)
LINJE 3: git pull: trækker den nyeste version af projektet ned fra serveren. MEGET VIGTIGT, så der ikke opstår fejl,
hvis andre retter samtidig med dig!!!
LINJE 4: git push: sender din pakke fra udbakken (fra commit) op til serveren, så den kommer til at ligge oppe på nettet
*/

window.onload = function(){

    /*
    * Needed to get our canvas element, map, that we can draw on
    */

    var canvas = document.getElementById("map");
    canvas.addEventListener("mousedown", clickOnCanvas, false);
    var map = canvas.getContext("2d");

    var directionPoints = []; //All the points where the the direction can be changes
    var shops = []; //This is the array containing shop

    function changeDirectionPoint(x, y, left, right, up, down) {
        this.x = x;
        this.y = y;
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
    }

    /*
    *Hardcodes all the points where the direction can be changed together with a boolean value telling wheter it can be change either left or right
    */

    var point1 = new changeDirectionPoint(320, 140, true, true, false, true);
    var point2 = new changeDirectionPoint(320, 390, true, false, true, true);
    var point3 = new changeDirectionPoint(110, 395, true, true, false, true);
    var point4 = new changeDirectionPoint(110, 590, true, true, true, false);
    var point5 = new changeDirectionPoint(170, 590, true, true, false, true);
    var point6 = new changeDirectionPoint(250, 590, true, false, true, true);
    var point7 = new changeDirectionPoint(165, 790, true, true, true, false);
    var point8 = new changeDirectionPoint(320, 790, true, false, true, false);


    /*
    *Adds all the points to an array so that we can iterate through them
    */

    directionPoints.push(point1);
    directionPoints.push(point2);
    directionPoints.push(point3);
    directionPoints.push(point4);
    directionPoints.push(point5);
    directionPoints.push(point6);
    directionPoints.push(point7);
    directionPoints.push(point8);



    refresh(); //Builds the view in the canvas and adds the elements to the arrays
    /*
    * These are needed for the view in the bottom and the search functionality
    */
    var footer = document.getElementById("menu");
    var logo = document.getElementById("logo");
    var searchButton = document.getElementById("searchbtn");
    var abc = document.getElementById("abc");
    abc.addEventListener("click", ABCView());


    searchButton.addEventListener("click", function() {
        var searchString = document.getElementById("searchbox").value;
        searchString = searchString.toUpperCase();
    refresh(); //Resets the card view
    for(var shopIndex in shops){

        searchName = shops[shopIndex].name;
        searchName = searchName.toUpperCase();

        searchCategory = shops[shopIndex].category;
        searchCategory = searchCategory.toUpperCase();
        
            //In this case, we only search for a single shop thus calling showShopByName
            if(searchString == searchName){
                showShopByName(shops[shopIndex].name);
            //In this case, we search for a shop category thus calling showShops
        } else if (searchString == searchCategory) {
            showShops(shops[shopIndex].category);
        }
        else if(searchString == "NEPHEW") {
            showShopByName("Aktivitet A");
        }else if(searchString == "ABC"){
            ABCView();
        }
    }
});

/*
* Here we add all the shops to our array and our canvas view
*/

function refresh() {
    shops = []; //Resets the shops array in order to not add shops more than once!
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
    /*
    *Draws a red circle to indicate where you are
    */
    map.arc(890, 140, 10, 0, 2 * Math.PI, false);
    map.fillStyle = "red";
    map.fill();

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

function getDirections(shopName) {

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
/*
* Logs the x and y coordinates of the clikc in xClick and yClick. Looks to see if these variables, subtracted with the x and y values where the drawing of the
* individuel shop is started from, is less than the size of the shop in that direction and greater than 0. If that is true, the shop was clicked
* and show shops is called to handle the display of all the shops in the category
*/

function clickOnCanvas() {
    refresh();
    xClick = event.pageX;
    yClick = event.pageY;
    console.log("x coordinate: " + xClick + " y coordinate " + yClick);
    var i = 0;

    for(var shopIndex in shops) {
        xStart = shops[shopIndex].x;
        yStart = shops[shopIndex].y;
        if(xClick - xStart < shops[shopIndex].sizeX && xClick - xStart > 0 && yClick - yStart < shops[shopIndex].sizeY && yClick - yStart > 0){
            showShops(shops[shopIndex].category, shops[shopIndex].name);
        } 
    }
}

/*
*This function highlights all shops in a given category AND calls shopView to update the bottom view accordingly
*/
function showShops(category, name) {
    //If we search for a category name = "" and we want to have a category view
    if (typeof name === 'undefined') {
        shopView(category);
    }
    else {
        shopView(name);
    }
    for (var shopIndex in shops) {
        if(shops[shopIndex].category === category) {
            shops[shopIndex].color = "green";
            makeRectangularShop(shops[shopIndex]);
        }
    }
}
/*
*This function highlights one shop by a given name AND calls shopView to update the bottom view accordingly
*/
function showShopByName(name) {
    shopView(name); //Generates the view in the bottom
    for (var shopIndex in shops) {
        if(shops[shopIndex].name === name) {
            shops[shopIndex].color = "green";
            makeRectangularShop(shops[shopIndex]);
        }
    }
}
    /*
    * This function empties the footer completely and builds a new view in it. It builds the right view according to the switch statement
    */
    function shopView(name){
        name = name.toUpperCase();
        footer.innerHTML = "";
        logo.style.visibility = "hidden";
        footer.style.textAlign = "left";
    //The switch statement which makes the right view according to what is given to the method as a parameter
    switch (name) {
        case "FØTEX": 
        makeFoetexView();
        break;
        case "SKO":
        makeSkoView();
        break;
        case "AKTIVITET A":
        case "NEPHEW":
        makeActivityView();
        break;
    }
}

/*
* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
* NB!! Everything from here and down is just DOM programming making the view in the bottom look correct! It looks like a lot but really isn't
* (most of it is copy/paste)
* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/

function makeFoetexView() {
    //Here the div for the opening hours is created and styled to look right in the view. The headline is created and added as well
    var openingHours = document.createElement("div");
    openingHours.style.float = "left;"
    openingHours.style.width = "32%";
    openingHours.style.display = "inline-block";
    var openingHeadline = document.createElement("h1");
    openingHeadline.textContent = "Åbningstider";
    openingHours.appendChild(openingHeadline);

    //Here the list containing the opening hours is created
    var list = document.createElement("ul");
    var weekdays = document.createElement("li")
    weekdays.textContent = "Mandag-torsdag 07-22";
    list.appendChild(weekdays);
    var friday = document.createElement("li");
    friday.textContent = "Fredag 07-20";
    list.appendChild(friday);
    var weekend = document.createElement("li");
    weekend.textContent = "Lørdag-søndag 08-18";
    list.appendChild(weekend);

    //Here the list is added to the containing div and the containing div is added to the footer
    openingHours.appendChild(list);
    footer.appendChild(openingHours);

    //Here the first special offer is created and styled to look right in the view
    var specialOffer2 = document.createElement("div");
    specialOffer2.style.float = "right";
    specialOffer2.style.width = "32%";
    specialOffer2.style.display = "inline-block";
    var header2 = document.createElement("h1");
    header2.textContent = "Tilbud 2 i Føtex";
    specialOffer2.appendChild(header2);
    var textArea2 = document.createElement("p");
    textArea2.textContent = "bla bla bla blaa lfadsklfas lkfsadj æ";
    specialOffer2.appendChild(textArea2);

    //Here the first special offter is added to the footer
    footer.appendChild(specialOffer2);

    //Here the second special offer is created and styled to look right in the view
    var specialOffer1 = document.createElement("div");
    specialOffer1.style.float = "right";
    specialOffer1.style.width = "32%";
    specialOffer1.style.display = "inline-block";
    var header1 = document.createElement("h1");
    header1.textContent = "Tilbud 1 i Føtex";
    specialOffer1.appendChild(header1);
    var textArea1 = document.createElement("p");
    textArea1.textContent = "bla bla bla blaa lfadsklfas lkfsadj æ";
    specialOffer1.appendChild(textArea1);

    //And added to the footer
    footer.appendChild(specialOffer1);
    logo.style.visibility = "visible";
    logo.setAttribute("src", "http://åbningstider.net/wp-content/uploads/2011/01/føtex-508x250-300x147.jpg"); //Make the logo into a føtex logo to show that we are looking at føtex

}
function makeSkoView() {
    //Here the div for the shops is created and styled to look right in the view. The headline is created and added as well
    var shopsDiv = document.createElement("div");
    shopsDiv.style.float = "left;"
    shopsDiv.style.width = "32%";
    shopsDiv.style.display = "inline-block";
    var shopHeadline = document.createElement("h1");
    shopHeadline.textContent = "Butikker i denne kategori";
    shopsDiv.appendChild(shopHeadline);

    //Here the list containing the shops is created
    var list = document.createElement("ul");
    for(var shopIndex in shops) {
        var shop = document.createElement("li")
        if(shops[shopIndex].category === "Sko"){
            shop.textContent = shops[shopIndex].name;
            list.appendChild(shop);
        }
    }

    //Here the list is added to the containing div and the containing div is added to the footer
    shopsDiv.appendChild(list);
    footer.appendChild(shopsDiv);


    //Here the first special offer is created and styled to look right in the view
    var specialOffer2 = document.createElement("div");
    specialOffer2.style.float = "right";
    specialOffer2.style.width = "32%";
    specialOffer2.style.display = "inline-block";
    var header2 = document.createElement("h1");
    header2.textContent = "Tilbud 2 indenfor sko";
    specialOffer2.appendChild(header2);
    var textArea2 = document.createElement("p");
    textArea2.textContent = "bla bla bla blaa lfadsklfas lkfsadj æ";
    specialOffer2.appendChild(textArea2);

    //Here the first special offter is added to the footer
    footer.appendChild(specialOffer2);

    //Here the second special offer is created and styled to look right in the view
    var specialOffer1 = document.createElement("div");
    specialOffer1.style.float = "right";
    specialOffer1.style.width = "32%";
    specialOffer1.style.display = "inline-block";
    var header1 = document.createElement("h1");
    header1.textContent = "Tilbud 1 indenfor sko";
    specialOffer1.appendChild(header1);
    var textArea1 = document.createElement("p");
    textArea1.textContent = "bla bla bla blaa lfadsklfas lkfsadj æ";
    specialOffer1.appendChild(textArea1);

    //And added to the footer
    footer.appendChild(specialOffer1);  
}

function makeActivityView() {

    //Here the third activity is created and styled to look right in the view
    var activity3 = document.createElement("div");
    activity3.style.float = "right";
    activity3.style.width = "32%";
    activity3.style.display = "inline-block";
    var header3 = document.createElement("h1");
    header3.textContent = "Marathon foredrag med Holger om calculus";
    activity3.appendChild(header3);
    var textArea3 = document.createElement("p");
    textArea3.innerHTML = "Torsdag d. 31/3 fra 12-24. <br /> Super kedeligt, men mega godt hvis du gerne vil sove godt eller er mega matematik freak";
    activity3.appendChild(textArea3);

    //And added to the footer
    footer.appendChild(activity3);

    //Here the second activity is created and styled to look right in the view
    var activity2 = document.createElement("div");
    activity2.style.float = "right";
    activity2.style.width = "32%";
    activity2.style.display = "inline-block";
    var header2 = document.createElement("h1");
    header2.textContent = "Åh abe koncert";
    activity2.appendChild(header2);
    var textArea2 = document.createElement("p");
    textArea2.innerHTML = "Onsdag d. 30/3 fra 16-18 <br /> Godt til børn og barnlige sjæle! Kom og hør med";
    activity2.appendChild(textArea2);

    //And added to the footer
    footer.appendChild(activity2);

    //Here the first activity is created and styled to look right in the view
    var activity1 = document.createElement("div");
    activity1.style.float = "right";
    activity1.style.width = "32%";
    activity1.style.display = "inline-block";
    var header1 = document.createElement("h1");
    header1.textContent = "Nephew koncert";
    activity1.appendChild(header1);
    var textArea1 = document.createElement("p");
    textArea1.innerHTML = "Mandag d. 27/3 fra 20-22 <br /> Super fed koncert med et mega nice band! Kom og lyt!";
    activity1.appendChild(textArea1);

    //And added to the footer
    footer.appendChild(activity1);

}

function ABCView() {
    //Here the div for the shops is created and styled to look right in the view. The headline is created and added as well
    var clear = document.getElementById("menu");
    var clear2 = document.getElementById("logo");

    clear.innerHTML = "";
    clear2.style.visibility = "hidden";

    //Funtionen herunder sorterer butikkerne alfabetisk efter navn
    shops.sort(function(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    var shopsDiv = document.createElement("div");
    shopsDiv.style.float = "left";
    shopsDiv.style.height = "100%";
    shopsDiv.style.display = "inline-block";
    var shopHeadline = document.createElement("h1");
    shopHeadline.textContent = "Butikker i centret";
    shopsDiv.appendChild(shopHeadline);

    //Here the list containing the shops is created
    var list = document.createElement("ul");
    var list2 = document.createElement("ul");
    var list3 = document.createElement("ul");

    for(var shopIndex in shops) {
        var shop = document.createElement("li")
        shop.textContent = shops[shopIndex].name;
        list.appendChild(shop);
    }

    //Here the list is added to the containing div and the containing div is added to the footer
    shopsDiv.appendChild(list);
    footer.appendChild(shopsDiv);
}

};







