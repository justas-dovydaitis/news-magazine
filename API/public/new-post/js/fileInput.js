/* global FileReader document */
let input = document.querySelector('#image');
let figure = document.querySelector('.preview-image');
let preview = document.createElement('img');
preview.setAttribute('accept', 'image/x-png,image/gif,image/jpeg')
input.oninput = function(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            figure.appendChild(preview);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        figure.removeChild(preview);
    }
};