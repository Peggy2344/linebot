import axios from 'axios'
import cheerio from 'cheerio'

const updateData = async () => {
  try {
    let ary = []
    const text = '高雄市 三民區'
    const city = text.split('').slice(0, 3).join('')
    console.log(city)
    const url = encodeURI(`https://www.lev.org.tw/subsidy/station2.aspx?city=${city}`)
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    // $('table tbody tr td div').filter(function (i, el) {
    //   return $(el).text().includes('高雄市 三民區')
    // }).text()
    // ary.push({ location: $('table tbody tr td div').filter(function (i, el) {
    //   return $(el).text().includes('高雄市 三民區')
    // }).text() })
    for (let i = 0; i < $('table tbody tr td').length; i++) {
      if ($('table tbody tr td div').eq(i).text().includes(`${text}`)) {
        console.log($('table tbody tr td div').eq(i).text())
        console.log($('table tbody tr td div').eq(i - 1).text())
        console.log($('table tbody tr td div').eq(i - 2).children().attr('href'))
        ary.push({ location: $('table tbody tr td div').eq(i).text(), Map: $('table tbody tr td div').eq(i - 2).children().attr('href'), name: $('table tbody tr td div').eq(i - 1).text() })
      }
    }
    console.log(ary)
  } catch (error) {
    console.log(error)
  }
}
updateData()
