function initialize() {
    var status = "* Offline *";
    if (navigator.onLine) {
        status = "* Online *";
        retrieveContacts();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const SCH_LOC_EDB = localStorage.getItem("SCH_LOC_EDB");
            if (SCH_LOC_EDB) {
                displayContacts(JSON.parse(SCH_LOC_EDB));
            }
        }
    }

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
        "online",
        function () {
            document.getElementById("status").innerHTML = "Online";
        },
        false
    );
    document.body.addEventListener(
        "offline",
        function () {
            document.getElementById("status").innerHTML = "Offline";
        },
        false
    );
}

function retrieveContacts() {
    const xhr = new XMLHttpRequest();
    const url = "SCH_LOC_EDB.json";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var SCH_LOC_EDB = JSON.parse(xhr.response).SCH_LOC_EDB;
            displayContacts(SCH_LOC_EDB);

            // Store contact data to localstorage
            const localStorage = window.localStorage;
            if (localStorage) {
                localStorage.setItem("SCH_LOC_EDB", JSON.stringify(SCH_LOC_EDB));
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}

function displayContacts(SCH_LOC_EDB) {
    SCH_LOC_EDB.forEach(addRow);
}

function addRow(contact) {
    var tcontent = document.getElementById("SCH_LOC_EDB");
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "D");
    nameCell.innerHTML = contact.D;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "School Address");
    addressCell.innerHTML = contact.F;

    var emailCell = row.insertCell();
    emailCell.setAttribute('data-label', "Gender");
    emailCell.innerHTML = contact.Z;
}