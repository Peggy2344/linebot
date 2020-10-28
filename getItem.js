import axios from 'axios'

const updateNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=th&category=business&apiKey=3e750ac7043b4a359c9cab5ad99e81c3')
    console.log(response.data.articles)
  } catch (error) {
    console.log(error)
  }
}
updateNews()
