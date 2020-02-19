/* global document */
const lineHeight = 15;
let area = document.querySelector('textarea[name="content"]');

function resizeArea(event) {
    const minRows = 4;
    const maxRows = 12;

    let obj = event.target;
    let key = event.keyCode || event.charCode;
    let currentScrollHeight = parseInt(obj.scrollHeight, 10);
    let lines = Math.floor(currentScrollHeight / lineHeight);

    const expandTextArea =
        lines <= maxRows && lines > minRows && (key == 8 || key == 46);
    const maxLitteralHeight = (maxRows - 1) * lineHeight + 'px';
    if (expandTextArea) {
        obj.style.height = (lines - 1) * lineHeight + 'px';
    } else if (lines < maxRows) {
        obj.style.height = 'auto';
        obj.style.height = obj.scrollHeight + 5 + 'px';
    } else if (obj.style.height !== maxLitteralHeight) {
        obj.style.height = maxLitteralHeight;
    }
}

function loadArea(area) {
    const minRows = 4;
    area.rows = minRows;
    area.style.height = area.scrollHeight + 5 + 'px';
    area.style.lineHeight = lineHeight + 'px';
}
area.oninput = resizeArea;
document.onload = loadArea(area);