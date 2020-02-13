/* global document */
const lineHeight = 15;
let area = document.querySelector('textarea[name="content"]');
area.addEventListener('input', resize);

function resize(event) {
    const minRows = 4;
    const maxRows = 12;

    let obj = this;
    let key = event.keyCode || event.charCode;
    let currentScrollHeight = parseInt(obj.scrollHeight, 10);
    let lines = Math.floor(currentScrollHeight / lineHeight);

    const expandTextArea =
        lines <= maxRows && lines > minRows && (key == 8 || key == 46);
    if (expandTextArea) {
        obj.style.height = (lines - 1) * lineHeight + 'px';
    } else if (lines < maxRows) {
        obj.style.height = 'auto';
        obj.style.height = obj.scrollHeight + 5 + 'px';
    }
}

function load(area) {
    const minRows = 4;
    area.rows = minRows;
    area.style.height = area.scrollHeight + 5 + 'px';
    area.cols = 50;
    area.style.lineHeight = lineHeight + 'px';
}
document.onload = load(area);