// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
import axios from 'axios'

// 讀取 .env
dotenv.config()

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  try {
    const response = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
    const text = event.message.text
    let reply = ''// 引用line機器人套件
    import linebot from 'linebot'
    // 引用dotenv套件
    import dotenv from 'dotenv'
    import axios from 'axios'
    import cheerio from 'cheerio'

    // import schedule from 'node-schedule'

    // const url = `https://dict.longdo.com/mobile.php?search=${text}`
    // const encode = encodeURI(url)
    // const updateData = async () => {
    //   const response = await axios.get(encode)
    //   const $ = cheerio.load(response.data)
    // }

    // schedule.scheduleJob('* * 0 * * * ', () => {
    //   updateData()
    // })

    // updateData()
    // 讀取 .env
    dotenv.config()

    // 設定機器人
    const bot = linebot({
      channelId: process.env.CHANNEL_ID,
      channelSecret: process.env.CHANNEL_SECRET,
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    })

    // bot.on('message', async event => {
    //   try {
    //     const text = event.message.text
    //     let reply = ''
    //     for (const data of exhibitions) {
    //       if (data.title === text) {
    //         reply = data.showInfo[0].locationName
    //         break
    //       }
    //     }
    //     reply = (reply.length === 0) ? '沒有此筆資料' : reply
    //     event.reply(reply)
    //   } catch (error) {
    //     event.reply('發生錯誤')
    //   }
    // })

    // bot.listen('/', process.env.PORT, () => {
    //   console.log('機器人已啟動')
    // })

    bot.on('message', async event => {
      try {
        const text = event.message.text
        const url = `https://dict.longdo.com/mobile.php?search=${text}`
        const encode = encodeURI(url)
        const updateData = async () => {
          const response = await axios.get(encode)
          const $ = cheerio.load(response.data)
          let reply = ''
          const result = $('b').filter(function (i, el) {
            return $(el).text() === 'NECTEC Lexitron-2 Dictionary (TH-EN)'
          }).next().find('tbody tr td').eq(1).children().remove('a').end().text().split('')
          const translate = result.slice(0, result.indexOf(',')).join('')
          const example = result.slice(result.lastIndexOf(':') + 2).join('')
          reply = translate + example
          reply = (reply.length === 0) ? '沒有此筆資料' : reply
          event.reply(reply)
        }
        updateData()
      } catch (error) {
        event.reply('發生錯誤')
      }
    })

    bot.listen('/', process.env.PORT, () => {
      console.log('機器人已啟動')
    })

    for (const data of response.data) {
      if (data.title === text) {
        reply = data.showInfo[0].locationName
        break
      }
    }
    reply = (reply.length === 0) ? '沒有此筆資料' : reply
    event.reply(reply)
  } catch (error) {
    event.reply('發生錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
