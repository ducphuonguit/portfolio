function myFunction() {
    var x = document.getElementById("snackbar");

    x.className = "show";

    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    myFunction();
});