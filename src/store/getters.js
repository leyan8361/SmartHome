export default {
  token: state => state.user.token,
  name: state => state.user.name,
  account: state => state.user.account,
  password: state => state.user.password,
  address: state => state.user.address,
  status: state => state.user.status,
  cityID: state => state.weather.cityID,
  weatherInfo: state => state.weather.weatherInfo,
  enable: state => state.weather.enable,
  now: state => state.weather.now
}
