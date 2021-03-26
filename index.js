const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.use(express.static('./page'))

app.listen(8888, function () {
    console.log('服务启动成功')
})
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('*', (req, res, next) => {
    // var params = req.query //前端传过来的参数
    let option = {
        url: `xxxxxx`,
        // qs: params,
        headers: {
            'Cookie': req.headers.cookie,
        },
        timeout: 15000,
        json: true
    };
    request(option, (error, response, body) => {
        if (error) {
            return res.send({
                error: 1,
                msg: '数据获取失败'
            });
        }

        let cookieList = response.headers['set-cookie'];
        if (cookieList) {
            res.header('set-cookie', cookieList);
        }
        res.send(body) //获取后台的数据发送给前端
    });
})

app.post('*', (req, res, next) => {
    // var params = req.body //前端传过来的参数
    let option = {
        url: `xxxxxx`,
        headers: {
            'Cookie': req.headers.cookie,
        },
        // body: params,
        timeout: 15000,
        json: true
    };
    request(option, (error, response, body) => {
        if (error) {
            return res.send({
                error: 1,
                msg: '数据获取失败'
            });
        }

        let cookieList = response.headers['set-cookie'];
        if (cookieList) {
            res.header('set-cookie', cookieList);
        }
        res.send(body) //获取后台的数据发送给前端
    });
})