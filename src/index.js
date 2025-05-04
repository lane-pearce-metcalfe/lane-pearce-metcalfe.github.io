document.getElementById('monitor-btn').addEventListener('click', startScreen)

function startScreen() {
  document.getElementById('monitor-screen').classList.add('screen-animation');
  document.getElementById('monitor-screen').style.display = 'flex';

  setTimeout(() => {
    document.getElementById('monitor-screen').style.backgroundColor = 'rgb(84, 84, 255)';
    document.getElementById('loading-text').style.color = 'white'
  }, 1000)
  setTimeout(() => {
    document.getElementById('loading-text').innerHTML = 'Done!'
  }, 9000)
  setTimeout(() => {
     window.location.href = "main-screen.html";
  }, 10000)
}