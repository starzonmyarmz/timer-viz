document.getElementById('menu').innerHTML = await fetch('menu.html').then((response) => { return response.text() })

document.addEventListener('click', ({target}) => {
  if (!target.closest('#menu-button')) return
  document.getElementById('menu-options').hidden = !document.getElementById('menu-options').hidden
})
