const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')

const app = express();

//json  형태로 오는 요청의 본문을 해석해줄수 있게 등록
app.use(bodyParser.json())


// //테이블 생성하기 
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err,results,fileds) => {
//     console.log('results',results)
// })

//DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기 
app.get('/api/values',function (req,res)  {
    // db 데이터 불러오기
    db.pool.query('SELECT * FROM lists;',
    (err,results,fileds) => {
        if(err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

// client에서 입력한 값을 데이터베이스 list에 넣어주기 
app.post('/api/value' ,function (req,res,next) {
    // db에 값 넣어주기
    db.pool.query(`INSERT INTO lists(value) VALUES("${req.body.value}")`),
        (err,results,fileds) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json({success:true, value:req.body.value})
        }
})

app.listen(5000, () => {
    console.log('application start in port 5000')
})