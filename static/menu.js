document.getElementById('menu').innerHTML = await fetch('menu.html').then((response) => { return response.text() })
