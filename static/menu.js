document.body.insertAdjacentHTML('beforeend', await fetch('menu.html').then((response) => { return response.text() }))

document.addEventListener('click', ({target}) => {
  if (!target.closest('.menu-button')) return
  document.querySelectorAll('.menu-button').forEach((el) => {
    el.hidden = !el.hidden
  })
  document.getElementById('menu-options').hidden = !document.getElementById('menu-options').hidden
})
