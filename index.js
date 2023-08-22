const express = require('express')
var cors = require('cors-express');

const app = express()


const options = {
allow : {
    origin: 'https://lazy-erin-turkey-sari.cyclic.cloud/',
    methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
}
//     ,
// expose :{
//     headers : null
// },
// max : {
//     age : null
// }
//     ,
// options : function(req, res, next){
//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// }
}

app.use(cors(options));



app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send({status: 'Yo!'})
})
app.listen(process.env.PORT || 3000)
