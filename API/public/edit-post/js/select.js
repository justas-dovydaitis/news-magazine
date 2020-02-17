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
        event.target.parentNode.removeChild(event.target);
    };
    return selectedItem;
}

function selectOptions(event) {
    selectedContainer.innerHTML = '';
    selectedItemsValues = [];
    for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].selected) {
            selectedItemsValues.push(event.target[i]);
        }
    }
    selectedItemsValues.map(
        function(option) {
            selectedContainer.appendChild(createSelected(option));
            return option.value;
        }
    );
}
select.onload = selectOptions;
select.onchange = selectOptions;