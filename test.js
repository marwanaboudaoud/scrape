const request = require('request')
const cheerio = require('cheerio')
const metaScraper = require('meta-scraper').default
const fs = require('fs')
let house = {
  link: '',
  location: {
    country: 'Turkey',
    city: 'Antalya',
    address: '',
    coordinates: {
      lat: '',
      lng: ''
    }
  },
  size: {
    parcel_m2: '',
    gross_m2: '',
    net_m2: '',
    rooms: ''
  },
  price: {
    value: '',
    currency: 'TL'
  },
  description: '',
  title: '',
  images: ['']
}

request(
  ' https://www.sahibinden.com/ilan/emlak-konut-satilik-antalya-belek-de-mustakil-ozel-havuzlu-bahceli-4-plus1-lux-villa-506237010/detay',
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      let address = $('.classifiedInfo h2')
        .text()
        .replace(/\s\s+/g, '')

      address = address.slice(0, -4)
      address = address.replace(/\//g, '-')
      address = address.split('Antalya-')[1]

      house.location.address = address

      let price = $('.classifiedInfo h3')
        .text()
        .replace(/\s\s+/g, '')

      price = price.split(' ')[0]
      price = price.replace(/\./g, '')
      price = Number(price)
      house.price.value = price

      let sizeGross = $('ul.classifiedInfoList li')
        .eq(3)
        .text()
        .replace(/\s\s+/g, '')

      sizeGross = sizeGross.split('(Brüt)')[1]
      sizeGross = Number(sizeGross)
      house.size.gross_m2 = sizeGross

      let description = $('div.uiBox ')
        .text()
        .replace(/\s\s+/g, '')

      description = description.split('Açıklama')[1]
      description = description.split('Özellikler')[0]

      house.description = description
      let sizeNet = $('ul.classifiedInfoList li')
        .eq(4)
        .text()
        .replace(/\s\s+/g, '')
      sizeNet = sizeNet.split('(Net)')[1]
      sizeNet = Number(sizeNet)
      house.size.net_m2 = sizeNet

      let rooms = $('ul.classifiedInfoList li')
        .eq(5)
        .text()
        .replace(/\s\s+/g, '')
      rooms = rooms.split('Sayısı')[1]
      let num1 = rooms.split('+')[0]
      let num2 = rooms.split('+')[1]
      num1 = Number(num1)
      num2 = Number(num2)
      rooms = num1 + num2
      house.size.rooms = rooms

      let title = $('div.classifiedDetailTitle h1').text()
      house.title = title

      let coordinatesLat = $('#gmap').attr('data-lat')
      coordinatesLat = Number(coordinatesLat)
      house.location.coordinates.lat = coordinatesLat

      let coordinatesLng = $('#gmap').attr('data-lon')
      coordinatesLng = Number(coordinatesLng)
      house.location.coordinates.lng = coordinatesLng

      let link = $('a.classifiedShareGoogle').attr('href')
      link = link.split('url=')[1]
      house.link = link

      fs.writeFile('test.json', JSON.stringify(house, null, 4), function (err) {
        console.log(
          'File successfully written! - Check your project directory for the output.json file'
        )
      })
    }
  }
)
// metaScraper(
//   'https://www.sahibinden.com/ilan/emlak-konut-satilik-antalya-belek-de-mustakil-ozel-havuzlu-bahceli-4-plus1-lux-villa-506237010/detay'
// ).then(function (data) {
//   let themeColor = data.allTags.filter(
//     item => item.name && item.name === 'og:url'
//   )[0].content

//   house.link = themeColor
// })
