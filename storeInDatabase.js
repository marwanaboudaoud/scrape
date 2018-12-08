const db = require('./DB-config.js')
const houses = require('./main2.json')

houses.forEach(house => {
  const { link, location, size, price, description, title } = house
  let storeHousesQuery =
    'INSERT INTO houses (link, location_country, location_city,location_address, location_coordinates_lat,location_coordinates_lng, size_grossm2,size_netm2, size_rooms, price_value, price_currency, description,title) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'

  let qurArr = []
  qurArr.push(link)
  qurArr.push(location.country)
  qurArr.push(location.city)
  qurArr.push(location.address)
  qurArr.push(location.coordinates.lat)
  qurArr.push(location.coordinates.lon)
  qurArr.push(size.gross_m2)
  qurArr.push(size.net_m2)
  qurArr.push(size.rooms)
  qurArr.push(price.value)
  qurArr.push(price.currency)
  qurArr.push(description)
  qurArr.push(title)

  db.query(storeHousesQuery, [...qurArr], (err, results, fields) => {
    if (err) console.log('error with inserting data!', err)
    else console.log('Data inserted!')
  })
})
