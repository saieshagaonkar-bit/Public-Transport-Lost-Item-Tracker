// ===============================
// LOST ITEM FORM
// ===============================

const lostForm =
    document.getElementById("lostItemForm");

if (lostForm) {

    lostForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const item = {

            name:
                document.getElementById("itemName").value,

            category:
                document.getElementById("category").value,

            color:
                document.getElementById("color").value,

            dateLost:
                document.getElementById("dateLost").value,

            transport:
                document.getElementById("transportType").value,

            vehicle:
                document.getElementById("vehicleNumber").value,

            location:
                document.getElementById("location").value,

            description:
                document.getElementById("description").value

        };


        console.log("Lost Item:", item);


        const alertBox =
            document.getElementById("lostAlert");


        showItemAlert(
            alertBox,
            "Lost item reported successfully!",
            "success"
        );


        lostForm.reset();

    });

}


// ===============================
// FOUND ITEM FORM
// ===============================

const foundForm =
    document.getElementById("foundItemForm");

if (foundForm) {

    foundForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const item = {

            name:
                document.getElementById("foundItemName").value,

            category:
                document.getElementById("foundCategory").value,

            color:
                document.getElementById("foundColor").value,

            dateFound:
                document.getElementById("dateFound").value,

            transport:
                document.getElementById("foundTransport").value,

            vehicle:
                document.getElementById("foundVehicle").value,

            location:
                document.getElementById("foundLocation").value,

            description:
                document.getElementById("foundDescription").value

        };


        console.log("Found Item:", item);


        const alertBox =
            document.getElementById("foundAlert");


        showItemAlert(
            alertBox,
            "Found item reported successfully!",
            "success"
        );


        foundForm.reset();

    });

}


// ===============================
// SEARCH
// ===============================

const searchForm =
    document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const keyword =
            document.getElementById("searchKeyword").value;

        const category =
            document.getElementById("searchCategory").value;

        const transport =
            document.getElementById("searchTransport").value;


        console.log({
            keyword,
            category,
            transport
        });


        // Later:
        // fetch("/api/items?...")

    });

}


// ===============================
// CLAIM
// ===============================

const claimForm =
    document.getElementById("claimForm");

if (claimForm) {

    claimForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const claim = {

            name:
                document.getElementById("claimName").value,

            phone:
                document.getElementById("claimPhone").value,

            reason:
                document.getElementById("claimReason").value,

            proof:
                document.getElementById("claimProof").value

        };


        console.log("Claim:", claim);


        const alertBox =
            document.getElementById("claimAlert");


        showItemAlert(
            alertBox,
            "Your claim has been submitted!",
            "success"
        );


        claimForm.reset();

    });

}


// ===============================
// ALERT
// ===============================

function showItemAlert(element, message, type) {

    if (!element) return;

    element.textContent = message;

    element.className =
        "alert " + type;

    element.style.display = "block";

}