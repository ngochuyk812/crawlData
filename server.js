//Import các thư viện cần dùng
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, printType } = require('graphql');
const { cookie } = require('request');
const request = require('request');
const bodyParser = require('body-parser')
const fetch = require('node-fetch') 
var fs = require("fs");
const run = require('nodemon/lib/monitor/run');
var crypto = require('crypto-js');
const { log } = require('console');
// const databases = require('./prodcuts.json');
const axios = require('axios');
const { isStringObject } = require('util/types');

var app = express();
var DATAIDVIDEO = ''
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const search = async (res)=>{
//   var headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
// };

// var dataString = '{\n    "source": "amazon_search", \n    "domain": "com", \n "limit": 30, \n   "query": "watch", \n    "start_page": 1, \n    "pages": 20,\n    "parse": true\n}';

// var options = {
//     url: 'https://data.oxylabs.io/v1/queries',
//     method: 'POST',
//     headers: headers,
//     body: dataString
// };

// function callback(error, response, body) {
//   getRS(JSON.parse(body)._links[1].href)
      
  
// }

// request(options, callback);
// }
// const getRS = (link)=>{
//   var request = require('request');

// var headers = {
//     'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
// };

// var options = {
//     url: 'http://data.oxylabs.io/v1/queries/7064959559701399553/results',
//     headers: headers
// };

// function callback(error, response, body) {
//     let pages = JSON.parse(body).results
//     let count = 0
//     let products = []
//     // pages.map(tmp=>{
//     //   products = [...products,tmp]
//     // })
//     pages.map(tmp=>{
//       let list = tmp.content.results.organic
//       count += list.length
//       products = [...products, ...list]
//     })
//     const data = JSON.stringify(products);

// // write file to disk
// fs.writeFile('./prooducts.json', data, 'utf8', (err) => {

//     if (err) {
//         console.log(`Error writing file: ${err}`);
//     } else {
//         console.log(`File is written successfully!`);
//     }

// });
//     getProduct(products[0].asin)
//     console.log();
// }

// request(options, callback);
// }
// const getProduct = (asin)=>{
//   var headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
// };
// console.log("dsd");

// var dataString = `{\n    "source": "amazon_product", \n    "domain": "nl", \n    "query": "${asin}",\n    "parse": true, \n    "context": [\n        {\n            "key": "autoselect_variant", \n            "value": true\n        }]\n}`;

// var options = {
//     url: 'https://data.oxylabs.io/v1/queries',
//     method: 'POST',
//     headers: headers,
//     body: dataString
// };

// function callback(error, response, body) {
//   getProdcutRS(JSON.parse(body)._links[1].href)
// }

// request(options, callback);
// }
// const getProdcutRS = (rs)=>{
//   console.log(rs , "sdsd");
//   var headers = {
//     'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
// };

// var options = {
//     url: rs,
//     headers: headers
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }

// request(options, callback);

// }
var dataRS =[]
var databases = []
const getAll = ()=>{
  try {

    const data = fs.readFileSync('./productsRS.json', 'utf8');

    // parse JSON string to JSON object
    databases = JSON.parse(data) ;
    // databases.map((tmp,index)=>{
    //     let lengthColor = Math.floor(Math.random() * 4) + 1;
    //     let color = ['red', 'pink','gold','white', 'black', 'orange','blue','green']
    //     const shuffled = [...color].sort(() => 0.5 - Math.random());
    //     color = shuffled.slice(0, lengthColor)
    //     let quantity_by_featured = []

    //     color.map(tmp=>{
    //       quantity_by_featured.push({color:tmp, quantity: Math.floor(Math.random() * 200)})
    //     })
    //     databases[index] = {...databases[index], quantity_by_featured}
    // })
  //   databases = databases.filter(tmp=>{
  //     return tmp.product_details
  //   })
  //   fs.writeFile('./productsRS.json', JSON.stringify(databases), 'utf8', (err) => {

  //     if (err) {
  //         console.log(`Error writing file: ${err}`);
  //     } else {
  //         console.log(`File is written successfully!`);
  //     }
  
  // });
  const foundBrands = [];
let brandCount = 0;
  databases.forEach(product => {
    if (!foundBrands.includes(product.product_details.land_van_herkomst)) {
      foundBrands.push(product.product_details.land_van_herkomst);
      brandCount++;
    }
  });
    console.log(foundBrands.length);
    // print all databases
    // databases.map(tmp=>{
    //   getB1(tmp.asin);

    // })

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}
}
const getB1 = (asin)=>{
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
};

var dataString = `{\n    "source": "amazon_product", \n    "domain": "nl", \n    "query": "${asin}",\n    "parse": true, \n    "context": [\n        {\n            "key": "autoselect_variant", \n            "value": true\n        }]\n}`;

var options = {
    url: 'https://data.oxylabs.io/v1/queries',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
  try{
    let rss = JSON.parse(body)._links[1].href + ''
  getRS(rss)
  }catch{
    fs.writeFile('./productsRS.json', JSON.stringify(dataRS), 'utf8', (err) => {

      if (err) {
          console.log(`Error writing file: ${err}`);
      } else {
          console.log(`File is written successfully!`);
      }
  
  });
  }
// _header: 'GET /v1/queries/7064993336741869569/results HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'Authorization: Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx\r\n' +
//       'User-Agent: axios/1.4.0\r\n' +
//       'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//       'Host: data.oxylabs.io\r\n' +
//       'Connection: close\r\n' +
//       '\r\n',

}
request(options, callback);

}

const getRS = async (zxc)=>{
  let ra = 'http://data.oxylabs.io/v1/queries/7064992758229942273/results'
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: zxc,
    headers: { 
      'Authorization': 'Basic bmdvY2h1eWs4OlNhaW1hdGtoYXUx'
    }
  };
  
  axios.request(config)
  .then((response) => {
    if(response.data == undefined || response.data == '')
    getRS(zxc)
    else{

      let product = response.data.results[0].content
      let id = new Date().getTime()
      let title = product.title
      let images = product.images
      let product_details = product.product_details
      let price = product.price
      let currency = product.currency
      let obj = {id, title, images,product_details,price, currency}
      
      dataRS.push(obj)
      if(dataRS.length === 190){
        fs.writeFile('./productsRS.json', JSON.stringify(dataRS), 'utf8', (err) => {

          if (err) {
              console.log(`Error writing file: ${err}`);
          } else {
              console.log(`File is written successfully!`);
          }
      
      });
      }
      console.log(dataRS.length);
    }
  })
  .catch((error) => {
    console.log(error);
  });
  
}
app.get('/', function (req, res) {
  getAll()
  res.send("ccc");
});



app.listen(2011);

getAll()