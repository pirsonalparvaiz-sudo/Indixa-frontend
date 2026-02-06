// core/utils.js
export function $(id) {
  return document.getElementById(id);
}

export function showMessage(box, msg) {
  box.innerHTML = `<div class="card">${msg}</div>`;
}