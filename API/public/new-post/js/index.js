/* global document XMLHttpRequest select */
let xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', function() {
    if (xhttp.status === 200) {
        let response = JSON.parse(xhttp.responseText);
        for (let i = 0; i < response.length; i++) {
            let option = document.createElement('option');
            option.innerText = response[i].name;
            option.value = response[i]._id;
            select.appendChild(option);
        }
        console.log(response)
    }
});

xhttp.open('GET', '/api/categories', true);
xhttp.send();

function postPost(e) {
    const postaddForm = document.querySelector('#addPostForm');
    // 
    e.preventDefault();
}