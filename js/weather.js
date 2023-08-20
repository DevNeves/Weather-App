const apiKey = '8pgBOiA4CR8wycpDG5LFu5MaRXSKgw0i'
const basedUrl = 'https://dataservice.accuweather.com/'

const getCityDataUrl = cityName =>
  `${basedUrl}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`

const getWeatherUrl = cityKey =>
  `${basedUrl}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br`

const fetchData = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possivel obter os dados')
    }

    return response.json()
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`)
  }
}

const getCityWeather = async cityName => {
  const cityDataUrl = getCityDataUrl(cityName)
  const cityData = await fetchData(cityDataUrl)

  if (!cityData.length) {
    return
  }

  const weatherUrl = getWeatherUrl(cityData.Key)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await fetchData(weatherUrl)
  
  return { LocalizedName: cityData.LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}
