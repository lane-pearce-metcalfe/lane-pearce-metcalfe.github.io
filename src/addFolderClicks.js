export function folderClicks() {
    
    for (let i = 1; i < 6; i++) {
      document.getElementById(`week-${i}-blog-folder`).addEventListener('click', () => {
      document.getElementById(`week-${i}-blog`).style.display = 'flex';
      document.querySelector(`#week-${i}-blog .header-btn-icon`).addEventListener('click', () => {
        document.getElementById(`week-${i}-blog`).style.display = 'none';
      })
    })
  }

  document.querySelector('#main-folder .header-btn-icon').addEventListener('click', () => {
    document.getElementById('main-folder').style.display = 'none'
  })

  const blogFiles = document.querySelectorAll('.blog-folder .folder-content-div')

  blogFiles.forEach((e) => {
    const id = e.id
    e.addEventListener('click', () => {
      window.location.href = `../blog/${id}.html`
    })
  })
}