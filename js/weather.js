const apiKey = 'MTOzy4gKgQhvf1g5gXStlAdVggKGjbev'
const basedUrl = 'http://dataservice.accuweather.com/'

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
    alert(`${name}: ${message}`)
  }
}

const getCityWeather = async cityName => {
  const cityDataUrl = getCityDataUrl(cityName)
  const [{ Key, LocalizedName }] = await fetchData(cityDataUrl)
  const weatherUrl = getWeatherUrl(Key)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await fetchData(weatherUrl)

  return { Key, LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}


