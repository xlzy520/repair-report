import fetch from '../utils/api'

export default {
  getData(){
    return fetch.get('/test', { id: 2 })
  }
}
