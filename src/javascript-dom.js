document
  .getElementById('change-btn-txt')
  .addEventListener('click', changeButtonTxt)

function changeButtonTxt() {
  document.getElementById('change-btn-txt').innerHTML = 'You Clicked Me!'
}
