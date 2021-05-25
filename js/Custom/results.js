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
        { kID: 1, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", colorType: "Black", cost: 139 },
        { kID: 2, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", colorType: "Black", cost: 139 },
        { kID: 3, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "RGB", colorType: "Black", cost: 199 },
        { kID: 4, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "RGB", colorType: "Black", cost: 199 },
        { kID: 5, kName: "Prime 13", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "White", colorType: "Black", cost: 129 },
        { kID: 6, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", colorType: "Black", cost: 169 },
        { kID: 7, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", colorType: "Black", cost: 169 },
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
// make a request to add our newItem object to the object store


    for(let i = 0; i < 7; i++) {
        var objectStoreRequest = objectStore.add(data[i]);
        objectStoreRequest.onsuccess = function(event) {
            console.log("Request Successful");
        }
    }

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
    objectStore.createIndex("colorType", "colorType", { unique: false });
    objectStore.createIndex("cost", "cost", { unique: false });

    console.log("Object Store Created");
};
// End of Database Section
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Comparison Section

// Retrieve variables from session storage
var chassis = sessionStorage.getItem("chassisType");
var switches = sessionStorage.getItem("switchType");
var keycaps = sessionStorage.getItem("capType");
var lighting = sessionStorage.getItem("lighting");
var color = sessionStorage.getItem("color");
var price = sessionStorage.getItem("price");








