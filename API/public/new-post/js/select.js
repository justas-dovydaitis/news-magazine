/* global document */
const select = document.querySelector('select#select');
const selectedContainer = document.querySelector('.select-container #select~.selected');
// eslint-disable-next-line no-unused-vars
let selectedItemsValues = [];

function createSelected(option) {
    let selectedItem = document.createElement('span');
    selectedItem.classList.add('selected-item');
    selectedItem.innerText = option.innerText;
    selectedItem.onclick = function(event) {
        option.selected = false;
        console.log(event);
        event.target.parentNode.removeChild(event.target);
    };
    return selectedItem;
}

select.onchange = function(event) {
    selectedContainer.innerHTML = '';
    selectedItemsValues = Array.prototype.slice.call(event.target.selectedOptions).map(
        function(option) {
            selectedContainer.appendChild(createSelected(option));
            return option.value;
        }
    );
};