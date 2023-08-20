const cityNameForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherDetailContainer = document.querySelector('[data-js="weather"]')
const temperatureContainer = document.querySelector('[data-js="temperature"]')
const timeImageContainer = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCardContainer = document.querySelector('[data-js="city-card"]')

const showCityWeather = async city => {
  const cityWeather = await getCityWeather(city)

  if (!cityWeather) {
    return
  }

  cityNameContainer.textContent = cityWeather.localizedName
  weatherDetailContainer.textContent = cityWeather.weatherText
  temperatureContainer.textContent = cityWeather.temperature
  timeImageContainer.setAttribute('src', `./src/${cityWeather.isDayTime ? 'day' : 'night'}.svg`)
  timeIconContainer.innerHTML = `<img src='./src/icons/${cityWeather.weatherIcon}.svg'></img>`
  cityCardContainer.classList.remove('d-none')
  cityNameForm.reset()
}

cityNameForm.addEventListener('submit', event => {
  event.preventDefault()

  const city = event.target.city.value
  showCityWeather(city)
})
