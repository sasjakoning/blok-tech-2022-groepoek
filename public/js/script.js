let httpRequest;
const btn = document.querySelector("#ajaxBtn")

btn.addEventListener("click", () => {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        console.log("unsuccesful")
        return false;
    }

    httpRequest.onreadystatechange = alertContents;

    httpRequest.open("GET", "test.html");
    httpRequest.send();
})

function alertContents() {
    console.log("statereadychange")
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
        } else {
            console.log("there was a problem with the request");
        }
    }
}
