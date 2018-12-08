const cheerio = require('cheerio')
const rp = require('request-promise')
const fs = require('fs')

const pages = [
  'https://www.sahibinden.com/satilik/antalya',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=20',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=40',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=60',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=80',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=100',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=120',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=140',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=160',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=180',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=200',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=220',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=240',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=260',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=280',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=300',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=320',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=340',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=360',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=380',
  'https://www.sahibinden.com/satilik/antalya?pagingOffset=400'
]

if (!fs.existsSync('housesUrls.json')) {
  fs.appendFile('housesUrls.json', '[]', error => console.log(error))

  let housesURLsArr = []
  const initURL = 'https://www.sahibinden.com'

  pages.forEach(url => {
    rp(url)
      .then(html => {
        const $ = cheerio.load(html, {
          xmlMode: true
        })
        $('.searchResultsTitleValue a.classifiedTitle').each(function (
          index,
          element
        ) {
          let item = initURL + $(element).attr('href')
          housesURLsArr.push(item)
        })
        fs.writeFile(
          './housesUrls.json',
          JSON.stringify(housesURLsArr),
          error => {
            if (error) console.log(error)
            else console.log('Success')
          }
        )
      })
      .catch(err => console.log('error', err))
  })
} else console.log(error)

// function scrap() {
//   request(
//     "https://www.sahibinden.com/satilik/antalya",
//     (error, response, html) => {
//       if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//       }
//     }
//   );
// }
// request(
//   "https://www.sahibinden.com/satilik/antalya",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       $(".searchResultsTitleValue a.classifiedTitle").each((i, el) => {
//         const link = $(el).attr("href");
//         console.log(link);
//       });
//     }
//     request(
//       "https://www.sahibinden.com/satilik/antalya?pagingOffset=20",
//       (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//           const $ = cheerio.load(html);
//           $(".searchResultsTitleValue a.classifiedTitle").each((i, el) => {
//             const link = $(el).attr("href");
//             console.log(link);
//           });
//         }
//         request(
//           "https://www.sahibinden.com/satilik/antalya?pagingOffset=40",
//           (error, response, html) => {
//             if (!error && response.statusCode == 200) {
//               const $ = cheerio.load(html);
//               $(".searchResultsTitleValue a.classifiedTitle").each((i, el) => {
//                 const link = $(el).attr("href");
//                 console.log(link);
//               });
//             }
//             request(
//               "https://www.sahibinden.com/satilik/antalya?pagingOffset=60",
//               (error, response, html) => {
//                 if (!error && response.statusCode == 200) {
//                   const $ = cheerio.load(html);
//                   $(".searchResultsTitleValue a.classifiedTitle").each(
//                     (i, el) => {
//                       const link = $(el).attr("href");
//                       console.log(link);
//                     }
//                   );
//                 }
//                 request(
//                   "https://www.sahibinden.com/satilik/antalya?pagingOffset=80",
//                   (error, response, html) => {
//                     if (!error && response.statusCode == 200) {
//                       const $ = cheerio.load(html);
//                       $(".searchResultsTitleValue a.classifiedTitle").each(
//                         (i, el) => {
//                           const link = $(el).attr("href");
//                           console.log(link);
//                         }
//                       );
//                     }
//                   }
//                 );
//               }
//             );
//           }
//         );
//       }
//     );
//   }
// );

// request(
//   " https://www.sahibinden.com/ilan/emlak-konut-satilik-beyazdan-ahatlida-katta-tek-yol-cephe-2-plus1-daire-175.000-tl-paz-615640219/detay",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);

//       const addres = $(".classifiedInfo h2");

//       console.log(addres.text().replace(/\s\s+/g, ""));

//       const price = $(".classifiedInfo h3");
//       console.log(price.text().replace(/\s\s+/g, ""));

//       const size = $("ul.classifiedInfoList li");
//       console.log(
//         size
//           .eq(3)
//           .text()
//           .replace(/\s\s+/g, "")
//       );
//     }
//   }
// );

// const rs = require("request-promise");
// const cheerio = require("cheerio");

// function scrapeItem(url) {
//   return rs(url)
//     .then(function(html) {
//       const $ = cheerio.load(html);

//       const addres = $(".classifiedInfo h2")
//         .text()
//         .replace(/\s\s+/g, "");

//       const housePriceIndex = $(".classifiedInfo h3")
//         .text()
//         .indexOf("€");

//       const price = $(".classifiedInfo h3")
//         .text()
//         .slice(housePriceIndex + 1)
//         .replace(/\s\s+/g, "");

//       const indexHouseSize = $("ul.classifiedInfoList li")
//         .eq(3)
//         .text()
//         .indexOf("Area");
//       const size =
//         indexHouseSize !== -1
//           ? $("ul.classifiedInfoList li")
//               .eq(3)
//               .text()
//               .replace(/\s\s+/g, "")
//               .substr(indexHouseSize)
//               .split(":")[1]
//               .trim()
//               .split(" ")[0]
//           : null;

//       let type;
//       if (uri.indexOf("house") === -1) {
//         type = true;
//       } else {
//         type = false;
//       }
//       return {
//         address,
//         price,
//         size,
//         isApartment: type
//       };
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }
