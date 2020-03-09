const express = require('express');
const session = require('express-session')
const body_parser=require('body-parser')
const data_result=require('./lib/data_result')
const flight_api=require('./datalib/flight_api');
// const user_api=require('./lib/user_api')
// const scheme_api=require('./lib/scheme_api')
// const project_api=require('./lib/project_api')
const app = express();
// const upload=multer({dest:'./upload_tmp'});
// const PUBLIC_API_PATH='/api/public/';
// const PRIVATE_API_PATH='/api/private/'
// app.use(session({
//     secret: 'city360',
//     cookie: {
//         maxAge: 60 * 1000 * 120
//     },
//     saveUninitialized: false,
//     resave: false
// }))

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    //res.redirect('/public/index.html')

    //注意redirect本身只是重新设置http响应头
    //此处由于已经将static目录添加至静态文件（app.use(express.static('static'));），相当于重定向之后直接访问index.html
    res.json('Superise MotherFucker!');
})

app.get('/getFlightInfo', flight_api.getInfo)

app.use((req,res,next)=>{
    data_result.badPromise('Page not found').then(result=>{
        res.json(result)
    })
})
app.listen(12450,()=>{
    console.log('listen port 12450')
})