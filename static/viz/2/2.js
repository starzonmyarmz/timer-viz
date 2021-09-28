async function getTimers() {
  const response = await fetch('/api/timers')
  const me = await response.json()
  return me
}

getTimers().then((timers) => {
  const divs = []

  timers.forEach((item) => {
    divs.push(`
      <div style="opacity: ${item.hours} "></div>
    `)
  })

  document.getElementById('blocks').insertAdjacentHTML('afterbegin', divs.join(''))
})
