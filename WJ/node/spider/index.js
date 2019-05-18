const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const url = 'https://movie.douban.com/top250';
const imageDir = './math/';
const moviesDir = './doubanMoviesData/';

function doSpider(start) {
  https.get(url + `?start=${start}`, (res) => {
    //  
    let html = '';
    res.on('data', (chunk) => {
      html += chunk;
    });
    // 完毕
    res.on('end', () => {
      // console.log(html);
      const $ = cheerio.load(html);
      // li .item 25 li
      let movies = [];
      $('.item').each(function () {
        // this 限制 第一个参数的选择区域  li
        // 默认全局 第一个
        const picUrl = $('.pic img', this).attr('src');
        // console.log(picUrl);
        const title = $('.info .title', this).text();
        const star = $('.start .rating_num', this).text();
        const link = $('.hd a', this).attr('href');
        //   
        const movie = {
          title,
          star,
          link,
          picUrl
        }
        movies.push(movie);
        // downloadImage(picUrl);
      })
      savelocalData(start / 25, movies);
    })
  })
}

function savelocalData(pageNum, movies) {

  // data.json
  fs.writeFile(moviesDir + `data${pageNum}.json`,
    JSON.stringify(movies),
    (err) => {
      if (!err) {
        console.log(err, '保存完了')
      }
    }
  )
}

function downloadImage(picUrl) {
  https.get(picUrl, (res) => {
    res.setEncoding('binary');
    let data = ''
    res.on('data', (chunk) => {
      data += chunk;
    })
    res.on('end', () => {
      //s_ratio_poster/public/p480747492.jpg
      const fileName = path.basename(picUrl);
      fs.writeFile(imageDir + fileName,
        data,
        'binary',
        (err) => {
          console.log(err);
          if (!err) {
            console.log(fileName, '保存成功');
          }
        }
      )
    })
  })
}
const total = 250;
let start = 0;
while (start < total) {
  doSpider(start);
  start += 25;
}