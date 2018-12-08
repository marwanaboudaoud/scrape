const cheerio = require('cheerio')
const rp = require('request-promise')
const fs = require('fs')
const metaScraper = require('meta-scraper').default

const housesArr = require('./housesUrls.json')
let houseInfo = []

if (!fs.existsSync('main2.json')) {
  fs.appendFile('main2.json', houseInfo, error => console.log(error))
}

// console.log(Object.prototype.toString.call(/** the specified type */));

for (let i = 0; i < housesArr.length; i++) {
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
      gross_m2: '',
      net_m2: '',
      rooms: ''
    },
    price: {
      value: '',
      currency: 'TL'
    },
    description: '',
    title: ''
  }
  rp(housesArr[i])
    .then(body => {
      const $ = cheerio.load(body, {
        xmlMode: true
      })

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
      sizeGross = sizeGross.split('&nbsp;')[1]
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
      sizeNet = sizeNet.split('&nbsp;')[1]
      sizeNet = Number(sizeNet)
      house.size.net_m2 = sizeNet

      let rooms = $('ul.classifiedInfoList li')
        .eq(5)
        .text()
        .replace(/\s\s+/g, '')
      rooms = rooms.split('&nbsp;')[1]
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

      houseInfo.push(house)
      fs.writeFile('./main2.json', JSON.stringify(houseInfo), error => {
        if (error) console.log(error)
        else console.log('Success')
      })
    })
    .catch(err => console.log('error', err))
}
