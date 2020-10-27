// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
import axios from 'axios'
import cheerio from 'cheerio'
import googleTTS from 'google-tts-api'


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
    const text = event.message.text
    const url = `https://dict.longdo.com/mobile.php?search=${text}`
    const encode = encodeURI(url)
    let $ = ''
    // const news = ''
    const updateData = async () => {
      let soundurl = ''
      await googleTTS(`${text}`, 'th', 1).then(function (url) {
        soundurl = url
        console.log(soundurl)
      }).catch(function (err) {
        console.log(err)
      })
      const response = await axios.get(encode)
      $ = cheerio.load(response.data)
      let reply
      const result = []
      for (let i = 1; i <= 5; i += 2) {
        const word = $('b').filter(function (i, el) {
          return $(el).text() === 'NECTEC Lexitron-2 Dictionary (TH-EN)'
        }).next().find('tbody tr td').eq(i).children().remove('a').end().text().split('')
        const translate = word.slice(0, word.indexOf(',')).join('')
        let example = ''
        if (word.lastIndexOf('T') === -1) {
          example = word.slice(word.lastIndexOf('E') + 9).join('')
        } else {
          example = word.slice(word.lastIndexOf('E') + 9, word.lastIndexOf('T')).join('')
        }
        if (!(word.length === 0)) {
          result.push({ translate: translate, example: example })
        }
      }
      result.length === 0 ? reply = '沒有這個單字的資料，請搜尋其他單詞~'
        : reply = [{
          type: 'flex',
          altText: 'Flex',
          contents: {
            type: 'carousel',
            contents: [
              {
                type: 'bubble',
                header: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[0].translate
                  }]
                },
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[0].example
                  }]
                },
                styles: {
                  header: {
                    backgroundColor: '#83c5be'
                  }
                }
              },
              {
                type: 'bubble',
                header: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[1].translate
                  }]
                },
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[1].example
                  }]
                },
                styles: {
                  header: {
                    backgroundColor: '#83c5be'
                  }
                }
              }, {
                type: 'bubble',
                header: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[2].translate
                  }]
                },
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [{
                    type: 'text',
                    wrap: true,
                    text: result[2].example
                  }]
                },
                styles: {
                  header: {
                    backgroundColor: '#83c5be'
                  }
                }
              }, {
                type: 'carousel',
                contents: [
                  {
                    type: 'bubble',
                    body: {
                      type: 'box',
                      layout: 'vertical',
                      contents: [{
                        type: 'audio',
                        originalContentUrl: soundurl,
                        duration: 1000
                      }]
                    }
                  }
                ]
              }
            ]
          }
        }, {
          type: 'audio',
          originalContentUrl: `https://translate.google.com/translate_tts?ie=UTF-8&tl=th&client=tw-ob&q=${text}`,
          duration: 500
        }]
      // reply = (result.length === 0) ? '嗨嗨' : reply
      event.reply(reply)
    }
    updateData()
  } catch (error) {
    event.reply('發生錯誤')
    console.log(error)
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
