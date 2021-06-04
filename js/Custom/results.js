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
        { kID: 1, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 139, img: "https://www.daskeyboard.com/images/model-s-professional/model-s-professional-front-view-1500x937.png" },
        { kID: 2, kName: "Model S", manufacturer: "Das Keyboard", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", swapType: "No", cost: 139, img: "https://www.daskeyboard.com/images/model-s-professional/model-s-professional-front-view-1500x937.png" },
        { kID: 3, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "RGB", swapType: "No", cost: 199, img: "https://i.pcmag.com/imagery/reviews/053TueAzFTwo42WciHLhcYe-21.1569472666.fit_scale.size_760x427.jpg" },
        { kID: 4, kName: "4Q", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "RGB", swapType: "No", cost: 199, img: "https://i.pcmag.com/imagery/reviews/053TueAzFTwo42WciHLhcYe-21.1569472666.fit_scale.size_760x427.jpg" },
        { kID: 5, kName: "Prime 13", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "White", swapType: "No", cost: 129, img: "https://cc.cnetcontent.com/inlinecontent/mediaserver/das/5fb/d39/5fbd398cc3f74a148fd973cceeb24e77/maxsize(800x800).jpg" },
        { kID: 6, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", swapType: "No", cost: 169, img: "https://www.daskeyboard.com/images/das-keyboard-4-professional/daskeyboard-4-professional-front-view.jpg" },
        { kID: 7, kName: "4 Professional", manufacturer: "Das Keyboard", chassisType: "Metal", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 169, img: "https://www.daskeyboard.com/images/das-keyboard-4-professional/daskeyboard-4-professional-front-view.jpg" },

        { kID: 8, kName: "VA104C Calculator", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 156, img: "https://media.karousell.com/media/photos/products/2020/01/21/varmilo_va108m_calculator_mechanical_keyboard_white_led_1579595672_afdf30fbb_progressive" },
        { kID: 9, kName: "VA104S Phoenix", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "None", swapType: "No", cost: 168, img: "https://en.varmilo.com/keyboardproscenium/img/languages/20210122105214.png" },
        { kID: 10, kName: "VA108M Yakumo", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "White", swapType: "No", cost: 152, img: "https://en.varmilo.com/keyboardproscenium/img/languages/20200915050004.png" },
        { kID: 11, kName: "VA108M Summit", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "White", swapType: "No", cost: 163, img: "https://en.varmilo.com/keyboardproscenium/img/languages/20200612032503.png" },
        { kID: 12, kName: "MA108M/VA108M Sea Melody", manufacturer: "Varmilo", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "PBT", lightType: "None", swapType: "No", cost: 147, img: "https://en.varmilo.com/keyboardproscenium/img/languages/20200326043426.png" },

        { kID: 13, kName: "FC660M", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "PBT", lightType: "None", swapType: "No", cost: 109, img: "https://theaxo.com/wp-content/uploads/2020/02/Leopold-FC660M-PD-MechKB-001.jpg.webp" },
        { kID: 14, kName: "FC900R", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Black", capType: "PBT", lightType: "None", swapType: "No", cost: 124, img: "https://mechanicalkeyboards.com/shop/images/products/large_FC900REDBPD_main.png" },
        { kID: 15, kName: "FC980M", manufacturer: "Leopold", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "PBT", lightType: "None", swapType: "No", cost: 119, img: "https://mykeyboard.eu/media/cache/9b/47/9b479baddf364fe2aa6c38a37ddd02eb.jpg" },

        { kID: 16, kName: "K1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "White", swapType: "No", cost: 74, img: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/pf-209a2b8a--Keychron-K1-version-4-Ultra-slim-wireless-mechanical-keyboard-Mac-Windows-Android-with-Gateron-Low-profile-switch-red-blue-brown.jpg?v=1592214156" },
        { kID: 17, kName: "K1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 99, img: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/pf-209a2b8a--Keychron-K1-version-4-Ultra-slim-wireless-mechanical-keyboard-Mac-Windows-Android-with-Gateron-Low-profile-switch-red-blue-brown.jpg?v=1592214156" },
        { kID: 18, kName: "C1", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 64, img: "https://static.wixstatic.com/media/867975_a5b1d7d0a73f409f9f67798a430ba836~mv2.jpg/v1/fill/w_1000,h_593,al_c,q_90,usm_0.66_1.00_0.01/867975_a5b1d7d0a73f409f9f67798a430ba836~mv2.jpg" },
        { kID: 19, kName: "K6", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Brown", capType: "ABS", lightType: "RGB", swapType: "No", cost: 69, img: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/pf-6fee5ffe--20213516269.jpg?v=1614933099" },
        { kID: 20, kName: "K2", manufacturer: "Keychron", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "RGB", swapType: "No", cost: 79, img: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/pf-0851f229--KeychronK2tactilewirelessmechanicalkeyboardforMacWindowsiOSRGBwhitebacklightGateronswitchwiredUSBCtypeCcable.jpg?v=1594123032" },

        { kID: 21, kName: "Streak", manufacturer: "Fnatic", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 129, img: "https://cdn.shopify.com/s/files/1/0278/3097/6596/products/1b41649f-889c-4f61-a1e2-5fc82a3ff079_1200x900_cropped.png" },
        { kID: 22, kName: "miniSTREAK", manufacturer: "Fnatic", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 109, img: "https://cdn.shopify.com/s/files/1/0278/3097/6596/products/7bbdd8cd-95eb-40ab-a84f-950a86cf0a9c_1200x900_cropped.jpg" },

        { kID: 23, kName: "AW510K", manufacturer: "Alienware", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 120, img: "https://thegoodguys.sirv.com/products/50070665/50070665_699825.PNG?scale.height=505&scale.width=773&canvas.height=505&canvas.width=773&canvas.opacity=0&q=90" },

        { kID: 24, kName: "GMMK", manufacturer: "Glorious", chassisType: "Plastic", switchType: "Glorious Panda", capType: "ABS", lightType: "RGB", swapType: "No", cost: 110, img: "https://ph-test-11.slatic.net/p/bc44a9851e03da8477371209e7de88b0.jpg_720x720q80.jpg_.webp" },

        { kID: 25, kName: "K68", manufacturer: "Corsair", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 119, img: "https://i.pcmag.com/imagery/reviews/002uKjUkD6w92nhgfLgD9qy-9..1569469945.jpg" },
        { kID: 26, kName: "K70", manufacturer: "Corsair", chassisType: "Metal", switchType: "Cherry MX Red", capType: "ABS", lightType: "RGB", swapType: "No", cost: 169, img: "https://c1.neweggimages.com/ProductImage/23-816-130-Z01.jpg" },

        { kID: 27, kName: "Majestouch Convertible 2", manufacturer: "Filco", chassisType: "Plastic", switchType: "Cherry MX Red", capType: "ABS", lightType: "None", swapType: "No", cost: 170, img: "https://www.keyboardco.com/blog/wp-content/uploads/2015/04/IMG_3868.jpg" },
        { kID: 28, kName: "Majestouch Ninja", manufacturer: "Filco", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 159, img: "https://mechanicalkeyboards.com/shop/images/products/large_1829_NinjaTKL1.jpg" },
        { kID: 29, kName: "Majestouch 2", manufacturer: "Filco", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "ABS", lightType: "None", swapType: "No", cost: 204, img: "https://mechanicalkeyboards.com/shop/images/products/large_1821_MajestouchTKL1.jpg" },

        { kID: 30, kName: "Anne Pro 2", manufacturer: "Obinslab", chassisType: "Plastic", switchType: "Gateron Blue", capType: "ABS", lightType: "RGB", swapType: "No", cost: 97, img: "https://cdn.shopify.com/s/files/1/2301/4381/products/obins-lab-anne-pro-2-white-keyboard-gateron-white-switch-964329_2048x2048.jpg?v=1589406041" },

        { kID: 31, kName: "Freestyle Edge MX", manufacturer: "Kinesis Gaming", chassisType: "Plastic", switchType: "Cherry MX Brown", capType: "ABS", lightType: "RGB", swapType: "No", cost: 214, img: "https://images-na.ssl-images-amazon.com/images/I/81JMro63zNL._AC_SL1500_.jpg" },

        { kID: 32, kName: "MX6.0", manufacturer: "Cherry", chassisType: "Plastic", switchType: "Cherry MX Blue", capType: "ABS", lightType: "None", swapType: "No", cost: 216, img: "https://www.keyboardco.com/product-images/cherry_mx_board_6_keyboard_large.jpg" }

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


    for(let i = 0; i < 32; i++) {
        // Request to add data object to the object store
        var objectStoreRequest = objectStore.add(data[i]);
        objectStoreRequest.onsuccess = function(event) {
            console.log("Request Successful");
        }
    }

    // Get min and max price ranges for price filtering
    switch(price) {
        case "$0-$100":
            minPrice = 0;
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
                        "cost": cursor.value.cost,
                        "img": cursor.value.img
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
            image.src = item.img;
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

            switch (item) {
                case "Alienware":
                    image.src = "https://i0.wp.com/powerup-gaming.com/wp-content/uploads/2018/06/alienware-13-laptop-powerup-9.png?fit=768%2C432&ssl=1";
                    break;
                case "Cherry":
                    image.src = "https://www.legitreviews.com/wp-content/uploads/2016/03/cherry-logo.jpg";
                    break;
                case "Corsair":
                    image.src = "https://www.steritype.com/wp-content/uploads/Corsair-1.jpg";
                    break;
                case "Das Keyboard":
                    image.src = "https://mms.businesswire.com/media/20190305005157/en/708784/23/Das_Keyboard_logo_black.jpg";
                    break;
                case "Filco":
                    image.src = "https://www.keyboardco.com/product-images/black_filco_filco_key_large.jpg";
                    break;
                case "Fnatic":
                    image.src = "https://resources.esportsinsider.com/esportsinsider/2020/01/Fnatic-new-logo-2020.jpg";
                    break;
                case "Glorious":
                    image.src = "https://images.mmorpg.com/images/heroes/features/14149.jpg?cb=074E674D48ED84DAF0F33F00F032894F";
                    break;
                case "Keychron":
                    image.src = "https://img2.quasarzone.co.kr/web/editor/2003/2003obj___1825160641.png";
                    break;
                case "Kinesis Gaming":
                    image.src = "https://gaming.kinesis-ergo.com/wp-content/uploads/2016/11/Kinesis-Gaming-Logo-Black-Vertical.png";
                    break;
                case "Leopold":
                    image.src = "https://chemicygaming.com/image/cache/Kompres/leopold_20_1_-250x250_9299e1fa9727c0ea9936fa9dedcabc17-600x315.png";
                    break;
                case "Obinslab":
                    image.src = "https://pbs.twimg.com/profile_images/1106762946087018496/I6i1U0s9.jpg";
                    break;
                case "Varmilo":
                    image.src = "https://www.ark-pc.co.jp/image/logos/maker/large/Varmilo_logo_large.png";
                    break;
                default:
                    image.src = "./img/MechKeys.jpg";
                    break;
            }

            image.style.objectFit = "contain";
            image.style.height = "225px";

            cardTitle.className = "card-title";
            cardTitle.textContent = item;
            cardTitle.style.textAlign = "center";
            cardTitle.style.margin = "15px";

            cardBody.appendChild(cardTitle);
            cardTop.appendChild(image);
            wrapper.appendChild(cardTop);
            document.getElementById(elementToAppend).appendChild(wrapper);

           // manufacturerArr.push(item.manufacturer);
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