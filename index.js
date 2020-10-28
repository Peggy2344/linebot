// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
import axios from 'axios'
import cheerio from 'cheerio'
// import googleTTS from 'google-tts-api'
// import Gtts from 'gtts'
// import express from 'express'
// import ffmpeg from 'fluent-ffmpeg'

// 讀取 .env
dotenv.config()
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const updateNews = async (catagory, event) => {
  try {
    const apiKey = process.env.NEWSAPI
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=th&category=${catagory}&apiKey=${apiKey}`)
    const articles = response.data.articles
    let reply = ''
    const imgUrl = 'https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    const img1 = articles[0].urlToImage === null ? imgUrl : encodeURI(articles[0].urlToImage)
    const img2 = articles[1].urlToImage === null ? imgUrl : encodeURI(articles[1].urlToImage)
    const img3 = articles[2].urlToImage === null ? imgUrl : encodeURI(articles[2].urlToImage)
    reply = {
      type: 'flex',
      altText: 'Flex',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: img1,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: articles[0].title,
                          wrap: true,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'filler'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'filler'
                            },
                            {
                              type: 'text',
                              text: '查看新聞',
                              color: '#ffffff',
                              flex: 0,
                              offsetTop: '-2px',
                              contents: [
                                {
                                  type: 'span',
                                  text: '查看新聞'
                                }
                              ]
                            },
                            {
                              type: 'filler'
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'filler'
                        }
                      ],
                      borderWidth: '1px',
                      cornerRadius: '4px',
                      spacing: 'sm',
                      borderColor: '#ffffff',
                      margin: 'xxl',
                      height: '40px',
                      offsetTop: '20px',
                      action: {
                        type: 'uri',
                        label: 'action',
                        uri: encodeURI(articles[0].url)
                      }
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#03303Acc',
                  paddingAll: '40px',
                  paddingTop: '40px'
                }
              ],
              paddingAll: '0px'
            }
          },
          {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: img2,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: articles[1].title,
                          wrap: true,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'filler'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'filler'
                            },
                            {
                              type: 'text',
                              text: '查看新聞',
                              color: '#ffffff',
                              flex: 0,
                              offsetTop: '-2px'
                            },
                            {
                              type: 'filler'
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'filler'
                        }
                      ],
                      borderWidth: '1px',
                      cornerRadius: '4px',
                      spacing: 'sm',
                      borderColor: '#ffffff',
                      margin: 'xxl',
                      height: '40px',
                      offsetTop: '20px',
                      action: {
                        type: 'uri',
                        label: 'action',
                        uri: encodeURI(articles[1].url)
                      }
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#9C8E7Ecc',
                  paddingAll: '40px',
                  paddingTop: '40px'
                }
              ],
              paddingAll: '0px'
            }
          }, {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: img3,
                  size: 'full',
                  aspectMode: 'cover',
                  aspectRatio: '2:3',
                  gravity: 'top'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          text: articles[2].title,
                          wrap: true,
                          size: 'xl',
                          color: '#ffffff',
                          weight: 'bold'
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'filler'
                        },
                        {
                          type: 'box',
                          layout: 'baseline',
                          contents: [
                            {
                              type: 'filler'
                            },
                            {
                              type: 'text',
                              text: '查看新聞',
                              color: '#ffffff',
                              flex: 0,
                              offsetTop: '-2px',
                              contents: [
                                {
                                  type: 'span',
                                  text: '查看新聞'
                                }
                              ]
                            },
                            {
                              type: 'filler'
                            }
                          ],
                          spacing: 'sm'
                        },
                        {
                          type: 'filler'
                        }
                      ],
                      borderWidth: '1px',
                      cornerRadius: '4px',
                      spacing: 'sm',
                      borderColor: '#ffffff',
                      margin: 'xxl',
                      height: '40px',
                      offsetTop: '20px',
                      action: {
                        type: 'uri',
                        label: 'action',
                        uri: encodeURI(articles[2].url)
                      }
                    }
                  ],
                  position: 'absolute',
                  offsetBottom: '0px',
                  offsetStart: '0px',
                  offsetEnd: '0px',
                  backgroundColor: '#03303Acc',
                  paddingAll: '40px',
                  paddingTop: '40px'
                }
              ],
              paddingAll: '0px'
            }
          }
        ]
      }
    }
    event.reply(reply)
  } catch (error) {
    console.log(error)
  }
}

const updateData = async (dataUrl, event) => {
  // const tts = new Gtts(`${text}`, 'th')
  // tts.save('./sound/text.m4a', function (err, result) {
  //   if (err) { throw new Error(err) }
  //   console.log('Success! Open file to hear result.')
  // })
  // const app = express()
  // app.get('./', function (req, res) {
  //   const gtts = new Gtts(`${text}`, 'th')
  //   gtts.stream().pipe(res)
  //   console.log(res)
  // })
  const encode = encodeURI(dataUrl)
  const response = await axios.get(encode)
  const $ = cheerio.load(response.data)
  let reply
  const result = []
  for (let i = 1; i <= 5; i += 2) {
    const word = $('b').filter(function (i, el) {
      return $(el).text() === 'NECTEC Lexitron-2 Dictionary (TH-EN)'
    }).next().find('tbody tr td').eq(i).children().remove('a').end().text().split('')
    const translate = word.length > 0 ? word.slice(0, word.indexOf(',')).join('') : 'no results'
    let example = ''
    if (word.lastIndexOf('T') === -1) {
      example = word.length > 0 ? word.slice(word.lastIndexOf('E') + 9).join('') : 'no results'
    } else {
      example = word.slice(word.lastIndexOf('E') + 9, word.lastIndexOf('T')).join('')
    }
    result.push({ translate: translate, example: example })
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
          }
        ]
      }
    }]
  event.reply(reply)
}
bot.on('message', async event => {
  try {
    const text = event.message.text
    const url = `https://dict.longdo.com/mobile.php?search=${text}`
    let reply = ''
    switch (text) {
      case '查新聞':
        reply = '請輸入查詢新聞種類(商業、娛樂、健康、頭條、運動、科技)'
        event.reply(reply)
        break
      case '運動': updateNews('sports', event)
        break
      case '商業': updateNews('business', event)
        break
      case '健康': updateNews('health', event)
        break
      case '頭條': updateNews('general', event)
        break
      case '娛樂': updateNews('entertainment', event)
        break
      case '科技': updateNews('technology', event)
        break
      default: updateData(url, event)
        break
    }
  } catch (error) {
    event.reply('發生錯誤')
    console.log(error)
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
