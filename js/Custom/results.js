// Retrieve variables from session storage
var chassis = sessionStorage.getItem("chassisType");
var switches = sessionStorage.getItem("switchType");
var keycaps = sessionStorage.getItem("capType");
var lighting = sessionStorage.getItem("lighting");
var hSwap = sessionStorage.getItem("hSwap");
var price = sessionStorage.getItem("price");
var minPrice, maxPrice;

// Create Filtering Arrays
var priceArr = [];
var switchArr = new Array(80);
var lightArr = new Array(80);
var chassisArr = new Array(80);
var swapArr = new Array(80);
var capArr = new Array(80);

var displayLimit = 0;
var displayArr = [];
var manufacturerArr = [];

// Database Creation Using IndexedDB
var db;

// Open Database
var DBOpenRequest = window.indexedDB.open("KeyboardDB", 1);

DBOpenRequest.onsuccess = e => {
    console.log("Database initialised");
    // store the result of opening the database in db.
    db = DBOpenRequest.result;

    // Dataset
    var data = [
        { kID: 1, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 139 },
        { kID: 2, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", swapType: "No", cost: 139 },
        { kID: 3, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "RGB", swapType: "No", cost: 199 },
        { kID: 4, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "RGB", swapType: "No", cost: 199 },
        { kID: 5, kName: "Prime 13", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "White", swapType: "No", cost: 129 },
        { kID: 6, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", swapType: "No", cost: 169 },
        { kID: 7, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 169 },

        { kID: 8, kName: "VA104C Calculator", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 156 },
        { kID: 9, kName: "VA104S Phoenix", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "None", swapType: "No", cost: 168 },
        { kID: 10, kName: "VA108M Yakumo", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "White", swapType: "No", cost: 152 },
        { kID: 11, kName: "VA108M Summit", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "White", swapType: "No", cost: 163 },
        { kID: 12, kName: "MA108M/VA108M Sea Melody", manufacturer: "Varmilio", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "PBT", lightType: "None", swapType: "No", cost: 147 },

        { kID: 13, kName: "FC660M", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "PBT", lightType: "None", swapType: "No", cost: 109 },
        { kID: 14, kName: "FC900R", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Black", capType: "PBT", lightType: "None", swapType: "No", cost: 124 },
        { kID: 15, kName: "FC980M", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "None", swapType: "No", cost: 119 },

        { kID: 16, kName: "K1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "White", swapType: "No", cost: 74 },
        { kID: 17, kName: "K1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 99 },
        { kID: 18, kName: "C1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 39},
        { kID: 19, kName: "K6", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Brown", capType: "ABS", lightType: "RGB", swapType: "No", cost: 69 },
        { kID: 20, kName: "K2", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "RGB", swapType: "No", cost: 79 },

        { kID: 21, kName: "AW510K", manufacturer: "Alienware", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 120 },

        { kID: 22, kName: "GMMK", manufacturer: "Glorious", chassisType: "Plastic", switchType: "Glorious Panda", capType: "ABS", lightType: "RGB", swapType: "No", cost: 110},

        { kID: 23, kName: "Streak Wired", manufacturer: "Fnatic", chassisType: "Plastic", switchType: "Cherry MX  Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 50 },

        { kID: 24, kName: "K70", manufacturer: "Corsair", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 100 },
        { kID: 25, kName: "Gaming K70", manufacturer: "Corsair", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 170 },

        { kID: 26, kName: "Majestouch Convertible 2", manufacturer: "Filco", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "None", swapType: "No", cost: 170 },
        { kID: 27, kName: "Majestouch Ninja", manufacturer: "Filco", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 159 }
    ];

// open a read/write db transaction, ready for adding the data
    var transaction = db.transaction(["Keyboards"], "readwrite");

// report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function(event) {
        console.log("Transaction Completed");
    };

    transaction.onerror = function(event) {
        console.log("Transaction not opened due to error. Duplicate items not allowed");
    };

// create an object store on the transaction
    var objectStore = transaction.objectStore("Keyboards");


    for(let i = 0; i < 27; i++) {
        // Request to add data object to the object store
        var objectStoreRequest = objectStore.add(data[i]);
        objectStoreRequest.onsuccess = function(event) {
            console.log("Request Successful");
        }
    }

    // Get min and max price ranges for price filtering
    switch(price) {
        case "$50-$100":
            minPrice = 50;
            maxPrice = 100;
            break;
        case "$100-$150":
            minPrice = 100;
            maxPrice = 150;
            break;
        case "$150-$200":
            minPrice = 150;
            maxPrice = 200;
            break;
        case "$200+":
            minPrice = 200;
            maxPrice = 1000;
            break;
        default:
            minPrice = 100;
            maxPrice = 150;
            break;
    }




    transaction = db.transaction(["Keyboards"], "readonly");
    objectStore = transaction.objectStore("Keyboards");
    objectStoreRequest = objectStore.openCursor();

    function readData(callback) {
        // On successful request...
        objectStoreRequest.onsuccess = e => {
            var cursor = e.target.result;
            // If valid target...
            if(cursor) {
                // Assign cursor values to arrBoard object
                if(cursor.value.cost > minPrice && cursor.value.cost < maxPrice) {
                    // Assign cursor values to arrBoard object
                    var arrBoard = {
                        "kName": cursor.value.kName,
                        "manufacturer": cursor.value.manufacturer,
                        "chassisType": cursor.value.chassisType,
                        "switchType": cursor.value.switchType,
                        "capType": cursor.value.capType,
                        "lightType": cursor.value.lightType,
                        "swapType": cursor.value.swapType,
                        "cost": cursor.value.cost
                    }

                    // Push arrBoard object to price array
                    priceArr.push(arrBoard);

                }
                // Increment cursor
                cursor.continue();
            } else {
                // Callback
                callback(priceArr);
            }
        }
    }

    readData(function (priceArr) {

        priceArr.forEach(switchFilter);

        function switchFilter(item) {
            if(item.switchType === switches) {
                switchArr.push(item);
            }
        }

        switchArr.forEach(lightFilter);

        function lightFilter(item) {
            if(item.lightType === lighting) {
                lightArr.push(item);
            }
        }

        lightArr.forEach(chassisFilter);

        function chassisFilter(item) {
            if(item.chassisType === chassis) {
                chassisArr.push(item);
            }
        }

        chassisArr.forEach(capFilter);

        function capFilter(item) {
            if(item.capType === keycaps) {
                capArr.push(item);
            }
        }

        capArr.forEach(swapFilter);

        function swapFilter(item) {
            if(item.swapType === hSwap) {
                swapArr.push(item);
            }
        }

        // Add items from each array to display array
        swapArr.forEach(addToDisplay);
        capArr.forEach(addToDisplay);
        chassisArr.forEach(addToDisplay);
        lightArr.forEach(addToDisplay);
        switchArr.forEach(addToDisplay);

        // For-each loop to add items from filtered arrays to display arrays
        function addToDisplay(item) {
            displayArr.push(item);
        }

        // Remove duplicates from display array
        displayArr = displayArr.filter((board, index, self) =>
            index === self.findIndex((k) => (
                k.kName === board.kName
            ))
        );


        var elementToAppend = "activeStart";

        displayArr.forEach(displayBoards);

        // Remove duplicates from manufacturer array
        manufacturerArr = manufacturerArr.filter((man, index, self) =>
            index === self.findIndex((m) => (
                m === man
            ))
        );

        displayLimit = 0;
        elementToAppend = "manufacturerStart";
        manufacturerArr.forEach(displayManufacturer);

        function displayBoards(item) {
            // If max item display limit reached, end loop
            if(displayLimit === 5) {
                return false;
            }
            // If display limit is 3, create new carousel slide
            if(displayLimit === 3) {
                var slide = document.createElement("div"),
                    row = document.createElement("div");

                slide.className = "carousel-item";
                row.className = "row";
                row.id = "secondStart";

                elementToAppend = row.id;
                slide.appendChild(row);
                document.getElementById("carousel1").appendChild(slide);
            }

            var wrapper = document.createElement("div"),
                cardTop = document.createElement("div"),
                image = document.createElement("img"),
                cardBody = document.createElement("div"),
                cardTitle = document.createElement("h4"),
                cardText = document.createElement("p");

            wrapper.className = "col-md-4 mb-3";

            cardTop.className = "card";

            image.className = "img-fluid";
            image.src = "./img/MechKeys.jpg";
            image.style.height = "225px";

            cardTitle.className = "card-title";
            cardTitle.textContent = item.manufacturer + " " + item.kName;
            cardTitle.style.textAlign = "center";
            cardTitle.style.margin = "15px";

            cardBody.appendChild(cardTitle);
            cardTop.appendChild(image);
            cardTop.appendChild(cardBody);
            wrapper.appendChild(cardTop);
            document.getElementById(elementToAppend).appendChild(wrapper);

            manufacturerArr.push(item.manufacturer);
            displayLimit++;
        }

        function displayManufacturer(item) {
            // If max item display limit reached, end loop
            if(displayLimit === 5) {
                return false;
            }
            // If display limit is 3, create new carousel slide
            if(displayLimit === 3) {
                var slide = document.createElement("div"),
                    row = document.createElement("div");

                slide.className = "carousel-item";
                row.className = "row";
                row.id = "manStart2";

                elementToAppend = row.id;
                slide.appendChild(row);
                document.getElementById("carousel2").appendChild(slide);
            }

            var wrapper = document.createElement("div"),
                cardTop = document.createElement("div"),
                image = document.createElement("img"),
                cardBody = document.createElement("div"),
                cardTitle = document.createElement("h4");

            wrapper.className = "col-md-4 mb-3";

            cardTop.className = "card";

            image.className = "img-fluid";
            image.src = "./img/MechKeys.jpg";
            image.style.height = "225px";

            cardTitle.className = "card-title";
            cardTitle.textContent = item;
            cardTitle.style.textAlign = "center";
            cardTitle.style.margin = "15px";

            cardBody.appendChild(cardTitle);
            cardTop.appendChild(image);
            cardTop.appendChild(cardBody);
            wrapper.appendChild(cardTop);
            document.getElementById(elementToAppend).appendChild(wrapper);

            manufacturerArr.push(item.manufacturer);
            displayLimit++;
        }

    })
};

// On upgrade needed (acts like a first time setup in our case)
DBOpenRequest.onupgradeneeded = e => {
    var db = e.target.result;

    db.onerror = function(e) {
        console.log("Request Successful");
    };

    // Create an objectStore for this database

    var objectStore = db.createObjectStore("Keyboards", { keyPath: 'kID'});

    // define what data items the objectStore will contain
    objectStore.createIndex("kName", "kName", { unique: false });
    objectStore.createIndex("manufacturer", "manufacturer", { unique: false });
    objectStore.createIndex("chassisType", "chassisType", { unique: false });
    objectStore.createIndex("switchType", "switchType", { unique: false });
    objectStore.createIndex("capType", "capType", { unique: false });
    objectStore.createIndex("lightType", "lightType", { unique: false });
    objectStore.createIndex("swapType", "swapType", { unique: false });
    objectStore.createIndex("cost", "cost", { unique: false });

    console.log("Object Store Created");
};