async function getMe() {
  const response = await fetch('/me')
  const me = await response.json()
  return me
}

getMe().then((me) => {
  const trs = []

  Object.keys(me).forEach((item) => {
    trs.push(`
      <tr>
        <th>${item}</th>
        <td>${me[item]}</td>
      </tr>
    `)
  })

  document.getElementById('me').innerHTML = trs.join('')
})
