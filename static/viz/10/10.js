dayjs.extend(window.dayjs_plugin_customParseFormat)

const body = document.body
const cream = getComputedStyle(body).getPropertyValue('--cream')
const orange = getComputedStyle(body).getPropertyValue('--orange')
const black = getComputedStyle(body).getPropertyValue('--black')

const html = []
const ul = document.querySelector('ul')

fetch('/api/timers/883666/10')
  .then(response => response.json())
  .then((data) => {
    for (i in data) {
      html.push(`
        <li style="width: ${data[i].hours * 300}px">
          <div class="tab">${data[i].started_time}</div>
          <div class="client">${data[i].client.name}</div>
          <div class="project">${data[i].project.name}</div>
          <div class="task">${data[i].task.name}</div>
          <div class="duration"></div>
        </li>
      `)
    }

    ul.innerHTML = html.join('')
  })

// Returns standard time as military time
// Example: 2:00pm -> 1400
const timeAsInt = (time) => {
  return dayjs(time, "h:mma").format('HHmm')
}
