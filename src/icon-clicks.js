export function iconClicks() {
  document.getElementById('internet').addEventListener('click', () => {
    window.location.href = `https://www.google.com/`
  });

  document.getElementById('blog-folder').addEventListener('click', () => {
    document.getElementById('main-folder').style.display = 'flex';
  })
}