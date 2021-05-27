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


    for(let i = 0; i < 7; i++) {
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

        chassisArr.forEach(swapFilter);

        function swapFilter(item) {
            if(item.swapType === hSwap) {
                swapArr.push(item);
            }
        }

        swapArr.forEach(capFilter);

        function capFilter(item) {
            if(item.capType === keycaps) {
                capArr.push(item);
            }
        }

        // Build Carousel


        // Add elements to carousel
        capArr.every(v => {
            if(displayLimit === 5) {
                return false;
            }
            displayArr.push(v);
            displayLimit++;
        });

        swapArr.every(v => {
            if (displayLimit === 5) {
                return false;
            }
            displayArr.push(v);
            displayLimit++;
        });

        chassisArr.every(v => {
            if(displayLimit === 5) {
                return false;
            }
            displayArr.push(v);
            displayLimit++;
        });

        lightArr.every(v => {
            if(displayLimit === 5) {
                return false;
            }
            displayArr.push(v);
            displayLimit++;
        });

        switchArr.every(v => {
            if(displayLimit === 5) {
                return false;
            }
            displayArr.push(v);
            displayLimit++;
        });

        displayArr = displayArr.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.place === thing.place && t.name === thing.name
            ))
        )

        displayArr.forEach(showKeyboards);

        function showKeyboards(item) {
            alert(item.kName);
        }


        // Start generating boostrap elements

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
// End of Database Section
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Comparison Section












