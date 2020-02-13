/* global document XMLHttpRequest */
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);

    }
};
xhttp.open('GET', '/api/posts', true);
xhttp.send();

function postPost(e) {
    const postaddForm = document.querySelector('#addPostForm');
    // 
    e.preventDefault();
}