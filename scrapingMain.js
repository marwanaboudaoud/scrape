const cheerio = require("cheerio");
const rp = require("request-promise");
const fs = require("fs");

const housesArr = require("./housesUrls.json");
let houseInfo = [];

if (!fs.existsSync("main.json")) {
  fs.appendFile("main.json", houseInfo, error => console.log(error));
}

// console.log(Object.prototype.toString.call(/** the specified type */));

for (let i = 0; i < housesArr.length; i++) {
  let house = {};
  rp(housesArr[i])
    .then(body => {
      const $ = cheerio.load(body, {
        xmlMode: true
      });
      let address = $(".classifiedInfo h2")
        .text()
        .replace(/\s\s+/g, "");
      address = address.slice(0, -4);
      address = address.replace(/\//g, "-");
      house.address = address;

      let price = $(".classifiedInfo h3")
        .text()
        .replace(/\s\s+/g, "");
      price = price.split(" ")[0];
      price = price.replace(/\./g, "");
      price = Number(price);
      price = price / 5.87992;
      price = Math.round(price);
      house.price = price;

      let size = $("ul.classifiedInfoList li")
        .eq(3)
        .text()
        .replace(/\s\s+/g, "");
      size = size.split("&nbsp;")[1];
      house.size = size;

      houseInfo.push(house);
      fs.writeFile("./main.json", JSON.stringify(houseInfo), error => {
        if (error) console.log(error);
        else console.log("Success");
      });
    })
    .catch(err => console.log("error", err));
}
