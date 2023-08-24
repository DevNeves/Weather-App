const cityNameForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const weatherDetailContainer = document.querySelector('[data-js="weather"]')
const temperatureContainer = document.querySelector('[data-js="temperature"]')
const timeImageContainer = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCardContainer = document.querySelector('[data-js="city-card"]')

const showCityWeather = async inputValue => {
  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } =
    await getCityWeather(inputValue)

  cityCardContainer.classList.remove('d-none')

  cityNameContainer.textContent = LocalizedName
  weatherDetailContainer.textContent = WeatherText
  temperatureContainer.textContent = Temperature.Metric.Value
  timeImageContainer.setAttribute('src', `./src/${IsDayTime ? 'day' : 'night'}.svg`)
  timeIconContainer.innerHTML = `<img src='./src/icons/${WeatherIcon}.svg'></img>`
}

const showLocalCityWeather = () => {
  const city = localStorage.getItem('city')

  if (city) {
    showCityWeather(city)
  }
}

cityNameForm.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  showCityWeather(inputValue)

  localStorage.setItem('city', inputValue)

  cityNameForm.reset()
})

showLocalCityWeather()
